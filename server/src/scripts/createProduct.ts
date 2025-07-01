import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import { createProduct, findProductByTitle } from "../services/printifyService";
import { connectToMongoDB, disconnectFromMongoDB } from "../db/mongoose";
import Stripe from "stripe";
import { ProductVariant } from "../models/productVariant";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/** This is the main function for creating products in the admin panel.
 * This takes the response from creating the product on printify and a creates corresponding prices
 * in stripe. Then it records the variant data with price ids in the DB so we know how much to charge
 * the customer in checkout.
 * @param printifyProductResponse Response from printify when product is created successfully
 */
export async function syncPrintifyToStripe(printifyProductResponse: any) {
  const stripeProduct = await stripe.products.create({
    name: printifyProductResponse.title,
    description: printifyProductResponse.description,
    images: [printifyProductResponse.images[0].src],
    metadata: {
      printifyProductId: printifyProductResponse.id,
      printProviderId: printifyProductResponse.print_provider_id.toString(),
      blueprintId: printifyProductResponse.blueprint_id.toString()
    }
  });

  const variants = printifyProductResponse.variants.filter(
    (v: any) => v.is_enabled
  );

  for (const variant of variants) {
    const stripePrice = await stripe.prices.create({
      unit_amount: variant.price,
      currency: "usd",
      product: stripeProduct.id,
      metadata: {
        productId: printifyProductResponse.id,
        variantId: variant.id.toString(),
        sku: variant.sku,
        size: variant.title
      }
    });

    await ProductVariant.create({
      productId: printifyProductResponse.id,
      variantId: variant.id,
      title: printifyProductResponse.title,
      size: variant.title,
      sku: variant.sku,
      priceInCents: variant.price,
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
      image: printifyProductResponse.images[0]?.src || ""
    });

    console.log(`✅ Synced variant ${variant.id} to Stripe and DB`);
  }

  return stripeProduct.id;
}

/**
 * Script to batch create products in Printify and Stripe.
 * This is the main function for creating products in the admin panel.
 *
 * - Reads product data from `productsArray`.
 * - Skips creation if a product with the same title already exists on Printify.
 * - Syncs product and variant data to Stripe and stores metadata in your database.
 *
 * ⚠️ Note: This script assumes you're creating canvas prints using specific blueprint/provider settings.
 * Customize `productsArray` and sync logic as needed for your store.
 *
 * ⚠️Be aware that if you run this script in the terminal loaclly you need
 * to connnect and disconnect from the DB with the commented out functions.
 * LEAVE THEM COMMENTED OUT IN PRODUCTION OR YOU WILL DISCONNECT THE WHOLE
 * SERVER FROM THE DB!!!
 */
export async function CreateProduct() {
  try {
    const pendingPath = path.join(__dirname, "data/pendingProducts.json");
    const productsPath = path.join(__dirname, "data/products.json");

    let pendingProducts = JSON.parse(fs.readFileSync(pendingPath, "utf-8"));
    let finalProducts = fs.existsSync(productsPath)
      ? JSON.parse(fs.readFileSync(productsPath, "utf-8"))
      : [];

    const updatedPending = [];

    for (const productData of pendingProducts) {
      const existing = await findProductByTitle(productData.title);
      if (existing) {
        console.log(
          `Skipped: Product "${productData.title}" already exists on Printify.`
        );
        updatedPending.push(productData); // keep it pending
        continue;
      }

      try {
        const printifyResponse = await createProduct(productData);
        await syncPrintifyToStripe(printifyResponse);

        console.log(`Created and synced "${productData.title}"`);

        finalProducts.push(productData); // add to final list
      } catch (err) {
        console.error(`Failed to process "${productData.title}":`, err);
        updatedPending.push(productData); // keep it in pending for retry
      }
    }

    // Write back the updated files
    fs.writeFileSync(pendingPath, JSON.stringify(updatedPending, null, 2));
    fs.writeFileSync(productsPath, JSON.stringify(finalProducts, null, 2));
  } catch (err) {
    console.error("Script failed:", err);
  }
}

// run();
