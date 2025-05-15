import Stripe from "stripe";
import dotenv from "dotenv";
import { connectToMongoDB } from "../db/mongoose";
import { ProductVariant } from "../models/productVariant";
import { PrintifyVariant } from "../types/printifyVariant";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const variants: PrintifyVariant[] = [
    {
        size: "18″ x 12″",
        price: Math.round(78.5 * 100),
        variantId: 75757,
        sku: "18024405615812850173",
        title: "Hawaiian Sun 12x16",
        image: "https://example.com/img1.jpg",
        productId: "65c55b04688e99f9a001907b",
    },
    {
        size: "24″ x 16″",
        price: Math.round(111.63 * 100),
        variantId: 75758,
        sku: "28129491301146335518",
        title: "Hawaiian Sun 12x16",
        image: "https://example.com/img2.jpg",
        productId: "65c55b04688e99f9a001907b",
    },
    {
        size: "30″ x 20″",
        price: Math.round(144.67 * 100),
        variantId: 75770,
        sku: "15293034341910514658",
        title: "Hawaiian Sun 12x16",
        image: "https://example.com/img3.jpg",
        productId: "65c55b04688e99f9a001907b",
    },
];

async function createStripeProductAndStore() {
    await connectToMongoDB();

    const stripeProduct = await stripe.products.create({
        name: "Hawaiian Sun Canvas Print",
        description: "Premium canvas print featuring the Hawaiian sunset",
        metadata: {
            printifyProductId: "65c55b04688e99f9a001907b",
            printifyProviderId: "2",
            blueprintId: "50",
        },
    });

    for (const variant of variants) {
        const stripePrice = await stripe.prices.create({
            unit_amount: variant.price,
            currency: "usd",
            product: stripeProduct.id,
            metadata: {
                variantId: variant.variantId.toString(),
                size: variant.size,
                sku: variant.sku,
                productId: variant.productId,
            },
        });

        await ProductVariant.create({
            productId: "65c55b04688e99f9a001907b",
            variantId: variant.variantId,
            title: variant.title,
            size: variant.size,
            sku: variant.sku,
            priceInCents: variant.price,
            stripeProductId: stripeProduct.id,
            stripePriceId: stripePrice.id,
            image: variant.image,
        });

        console.log(`Synced variant ${variant.size} to Stripe and DB`);
    }

    console.log("All variants synced");
    return;
}

createStripeProductAndStore();
