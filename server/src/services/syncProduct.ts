import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import { ProductVariant } from "../models/productVariant";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * This takes the response from creating the product on printify and a creates corresponding prices in stripe.
 * Then it records the variant data with price ids in the DB so we know how much to charge the customer in checkout.
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
