import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import { createProduct, findProductByTitle } from "../services/printifyService";
import { syncPrintifyToStripe } from "../services/syncProduct";
import { connectToMongoDB, disconnectFromMongoDB } from "../db/mongoose";

/**
 * Script to batch create products in Printify and Stripe.
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
const productsPath = path.join(__dirname, "data/pendingProducts.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
export async function CreateProduct() {
  try {
    // await connectToMongoDB();

    for (const productData of products) {
      // Prevent duplicates
      const existing = await findProductByTitle(productData.title);
      if (existing) {
        console.log(
          `⚠️ Skipped: Product "${productData.title}" already exists on Printify.`
        );
        continue;
      }

      // Create on Printify & sync to Stripe/DB
      const printifyResponse = await createProduct(productData);
      await syncPrintifyToStripe(printifyResponse);
      console.log(`✅ Created and synced "${productData.title}"`);
    }

    // await disconnectFromMongoDB();
    // process.exit(0);
  } catch (err) {
    console.error("❌ Script failed:", err);
  }
}

// run();
