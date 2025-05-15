import { RequestHandler } from "express";
import { stripe } from "../lib/stripe";
import { Cart } from "../models/cart";
import { ProductVariant } from "../models/productVariant";

export const createCheckoutSession: RequestHandler = async (req, res) => {
    const sessionId = req.sessionId;
    if (!sessionId) {
        res.status(400).json({ error: "Missing session ID" });
        return;
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart || cart.items.length === 0) {
        res.status(400).json({ error: "Cart is empty or not found" });
        return;
    }

    // Lookup all stripePriceIds in one go
    const variantIds = cart.items.map((item) => item.variantId);
    const variants = await ProductVariant.find({
        variantId: { $in: variantIds },
    });

    const lineItems = cart.items.map((item) => {
        const matchedVariant = variants.find(
            (v) => v.variantId === item.variantId
        );
        if (!matchedVariant) {
            throw new Error(`Variant ${item.variantId} not found in DB`);
        }

        return {
            price: matchedVariant.stripePriceId,
            quantity: item.quantity,
        };
    });

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: lineItems,
        success_url: `https://example.com/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://example.com/cart`,
        metadata: {
            sessionId,
        },
    });

    res.json({ url: session.url });
};
