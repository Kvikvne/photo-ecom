import { RequestHandler } from "express";
import { Request, Response } from "express";
import { stripe } from "../lib/stripe";
import { Cart } from "../models/cart";
import { Order } from "../models/order";
import { ProductVariant } from "../models/productVariant";
import { calculateShippingCost } from "../utils/shippingCost";
import Stripe from "stripe";

export const createCheckoutSession = async (
    req: Request,
    res: Response
): Promise<void> => {
    const sessionId = req.sessionId;
    const { shipping } = req.body;

    if (!sessionId) {
        res.status(400).json({ error: "Missing session ID" });
        return;
    }

    const cart = await Cart.findOne({ sessionId });

    if (!cart || cart.items.length === 0) {
        res.status(400).json({ error: "Cart is empty or not found" });
        return;
    }

    // Step 1: Collect variant IDs
    const variantIds = cart.items.map((item) => item.id);

    // Step 2: Lookup Stripe price IDs from your ProductVariant model
    const variants = await ProductVariant.find({
        variantId: { $in: variantIds },
    });

    // Step 3: Create line items for Stripe Checkout
    let lineItems;

    try {
        lineItems = cart.items.map((item) => {
            const matchedVariant = variants.find(
                (v) => v.variantId === item.id
            );

            if (!matchedVariant) {
                throw new Error(`Variant ${item.id} not found in DB`);
            }

            return {
                price: matchedVariant.stripePriceId,
                quantity: item.quantity,
            };
        });
    } catch (err) {
        console.error("Checkout session error:", err);
        res.status(500).json({ error: "Error building checkout line items" });
        return;
    }

    // Create pending order document
    const addressTo = {
        first_name: shipping.first_name,
        last_name: shipping.last_name,
        email: shipping.email,
        phone: shipping.phone,
        country: shipping.country,
        region: shipping.region,
        address1: shipping.address1,
        address2: shipping.address2,
        city: shipping.city,
        zip: shipping.zip,
    };

    // const order = await Order.create({
    //     sessionId,
    //     addressTo,
    //     status: "pending",
    // });

    // Build line_items for Printify
    const printifyLineItems = cart.items.map((item) => ({
        product_id: item.productId,
        variant_id: item.id,
        quantity: item.quantity,
    }));

    // Calculate shipping from Printify
    let shippingData;
    try {
        shippingData = await calculateShippingCost(
            addressTo,
            printifyLineItems
        );
        console.log("Shipping cost calculated:", shippingData);
    } catch (err) {
        console.error("Failed to calculate shipping:", err);
        res.status(500).json({ error: "Failed to calculate shipping cost" });
        return;
    }

    const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
        [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: shippingData.standard,
                        currency: "usd",
                    },
                    display_name: "Standard Shipping",
                    delivery_estimate: {
                        minimum: { unit: "business_day", value: 4 },
                        maximum: { unit: "business_day", value: 8 },
                    },
                },
            },
        ];

    // Step 4: Create Stripe Checkout Session
    try {
        const session = await stripe.checkout.sessions.create({
            allow_promotion_codes: true,
            mode: "payment",
            payment_method_types: ["card"],
            shipping_options: shippingOptions,
            line_items: lineItems,
            success_url: `https://yourdomain.com/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/cart`,
            metadata: {
                sessionId,
                first_name: addressTo.first_name,
                last_name: addressTo.last_name,
                email: addressTo.email,
                phone: addressTo.phone,
                country: addressTo.country,
                region: addressTo.region,
                address1: addressTo.address1,
                address2: addressTo.address2,
                city: addressTo.city,
                zip: addressTo.zip,
            },
        });

        res.json({ url: session.url });
        return;
    } catch (err) {
        console.error("Stripe session error:", err);
        res.status(500).json({ error: "Failed to create checkout session" });
        return;
    }
};
