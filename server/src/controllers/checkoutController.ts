import { RequestHandler } from "express";
import { Request, Response } from "express";
import { stripe } from "../lib/stripe";
import { ProductVariant } from "../models/productVariant";
import { calculateShippingCost } from "../utils/shippingCost";
import Stripe from "stripe";

export const createCheckoutSession = async (
    req: Request,
    res: Response
): Promise<void> => {
    const sessionId = req.sessionId;
    const { shipping, cart } = req.body;

    if (!sessionId) {
        res.status(400).json({ error: "Missing session ID" });
        return;
    }

    if (!cart || cart.length === 0) {
        res.status(400).json({ error: "Cart is empty or not found" });
        return;
    }

    // Create Stripe Customer
    const customer = await stripe.customers.create({
        name: `${shipping.first_name} ${shipping.last_name}`,
        email: shipping.email,
        phone: shipping.phone,
        address: {
            line1: shipping.address1,
            line2: shipping.address2,
            city: shipping.city,
            state: shipping.region,
            postal_code: shipping.zip,
            country: shipping.country,
        },
        shipping: {
            name: `${shipping.first_name} ${shipping.last_name}`,
            phone: shipping.phone,
            address: {
                line1: shipping.address1,
                line2: shipping.address2,
                city: shipping.city,
                state: shipping.region,
                postal_code: shipping.zip,
                country: shipping.country,
            },
        },
    });

    // Step 1: Build compound filters from the cart
    const variantFilters = cart.map((item: any) => ({
        variantId: item.id,
        productId: item.productId,
    }));

    // Step 2: Query ProductVariant by both variantId + productId
    const variants = await ProductVariant.find({
        $or: variantFilters,
    });

    // Step 3: Build Stripe line items
    let lineItems;
    try {
        lineItems = cart.map((item: any) => {
            // Find variant matching both productId and variantId
            const matchedVariant = variants.find(
                (v) =>
                    v.variantId === item.id &&
                    v.productId.toString() === item.productId // match string vs ObjectId
            );

            if (!matchedVariant) {
                throw new Error(
                    `Variant not found in DB for productId=${item.productId} and variantId=${item.id}`
                );
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

    // Build line_items for Printify
    const printifyLineItems = cart.map((item: any) => ({
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
            shipping_address_collection: { allowed_countries: ["US"] },
            automatic_tax: { enabled: true },
            customer: customer.id,
            customer_update: { shipping: "auto" },
            mode: "payment",
            payment_method_types: ["card"],
            shipping_options: shippingOptions,
            line_items: lineItems,
            success_url: `http://localhost:3000/success`,
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
