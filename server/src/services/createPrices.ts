import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import { ProductVariant } from "../models/productVariant";
import { getAllProducts } from "../services/printifyService";
import { connectToMongoDB, disconnectFromMongoDB } from "../db/mongoose";

/**
 * This is the main helper function for product creation and product/price sync
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function syncExistingPrintifyProductsToStripe() {
  try {
    // Use await connectToMongoDB() and await disconnectFromMongoDB()
    // if you are running this in the terminal locally
    // If used in the admin dash you will disconnect the server from the DB
    // Bad things will happen

    const printifyProducts = await getAllProducts();

    for (const product of printifyProducts) {
      const existingVariants = await ProductVariant.find({
        productId: product.id
      });
      const existingVariantMap = new Map(
        existingVariants.map((v) => [`${v.productId}_${v.variantId}`, v])
      );

      const stripeProduct = await stripe.products.create({
        name: product.title,
        description: product.description,
        images: [product.images[0]?.src || ""],
        metadata: {
          printifyProductId: product.id,
          printProviderId: product.print_provider_id?.toString() || "",
          blueprintId: product.blueprint_id?.toString() || ""
        }
      });

      for (const variant of product.variants.filter((v: any) => v.is_enabled)) {
        const key = `${product.id}_${variant.id}`;
        if (existingVariantMap.has(key)) {
          console.log(`🟡 Variant ${variant.id} already exists, skipping.`);
          continue;
        }

        const stripePrice = await stripe.prices.create({
          unit_amount: variant.price,
          currency: "usd",
          product: stripeProduct.id,
          metadata: {
            productId: product.id,
            variantId: variant.id.toString(),
            sku: variant.sku,
            size: variant.title
          }
        });

        await ProductVariant.create({
          productId: product.id,
          variantId: variant.id,
          title: product.title,
          size: variant.title,
          sku: variant.sku,
          priceInCents: variant.price,
          stripeProductId: stripeProduct.id,
          stripePriceId: stripePrice.id,
          image: product.images[0]?.src || ""
        });

        console.log(`✅ Synced new variant ${variant.id} to Stripe and DB`);
      }
    }
    // await disconnectFromMongoDB();
  } catch (error) {
    console.error("❌ Script failed:", error);
  }
}
