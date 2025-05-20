import { Request, Response, RequestHandler } from "express";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { Order } from "../models/order";
import dotenv from "dotenv";

dotenv.config();

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const webhookHandler: RequestHandler = async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"];
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig as string,
            endpointSecret
        );
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        res.status(400).send("Webhook Error");
        return;
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            const lineItems = await stripe.checkout.sessions.listLineItems(
                session.id,
                {
                    expand: ["data.price.product"],
                }
            );

            const orderItems = lineItems.data.map((item) => {
                const metadata = (item.price?.metadata || {}) as {
                    variantId?: string;
                    productId?: string;
                };

                return {
                    variantId: parseInt(metadata.variantId || "0"),
                    productId: metadata.productId,
                    quantity: item.quantity,
                    priceInCents: item.amount_total,
                    title: item.description,
                };
            });

            const orderId = session.metadata?.orderId;
            if (!orderId) throw new Error("Missing orderId from metadata");

            await Order.findByIdAndUpdate(orderId, {
                stripeSessionId: session.id,
                stripeCustomerId: session.customer as string,
                stripePaymentIntentId: session.payment_intent as string,
                email: session.customer_details?.email || "",
                status: "paid",
                lineItems: orderItems,
            });

            console.log("Order saved:", session.id);
            res.status(200).send("Order received");
            return;
        } catch (err) {
            console.error("Failed to process session:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
    }

    res.status(200).send("Event ignored");
};

export default webhookHandler;
