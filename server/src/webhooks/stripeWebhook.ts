import { Request, Response, RequestHandler } from "express";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { Order } from "../models/order";
import { Cart } from "../models/cart";
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

            const addressTo = {
                first_name: session.metadata?.first_name,
                last_name: session.metadata?.last_name,
                email: session.metadata?.email,
                phone: session.metadata?.phone,
                country: session.metadata?.country,
                region: session.metadata?.region,
                address1: session.metadata?.address1,
                address2: session.metadata?.address2,
                city: session.metadata?.city,
                zip: session.metadata?.zip,
            };

            // Assumes standard shipping is always the first option when creating the session
            // const rate = session.shipping_cost?.shipping_rate;
            // const standardShipping = session.shipping_options[0].shipping_rate;

            // const shippingMethod = rate === standardShipping ? 1 : 3; // 1 = standard, 3 = express

            await Order.create({
                sessionId: session.metadata?.sessionId,
                stripeSessionId: session.id,
                stripeCustomerId: session.customer as string,
                stripePaymentIntentId: session.payment_intent as string,
                email: session.customer_details?.email || "",
                status: "paid",
                lineItems: orderItems,
                addressTo: addressTo,
                subtotalInCents: session.amount_subtotal,
                shippingInCents: session.total_details?.amount_shipping,
                discountInCents: session.total_details?.amount_discount,
                taxInCents: session.total_details?.amount_tax,
                totalAmountPaidInCents: session.amount_total ?? 0,
                // shippingMethod: shippingMethod,
            });

            console.log("Order saved:", session.id);

            // Delete the cart after confirming session
            await Cart.deleteOne({ sessionId: session.metadata?.sessionId });

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
