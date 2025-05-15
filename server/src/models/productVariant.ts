import mongoose, { Schema, Document } from "mongoose";

export interface ProductVariantDocument extends Document {
    productId: string; // Your Printify product ID
    variantId: number; // Your Printify variant ID
    title: string; // Human-friendly label like "18x24 Canvas"
    size: string;
    sku: string;
    priceInCents: number;
    stripeProductId: string;
    stripePriceId: string;
    image?: string;
}

const ProductVariantSchema = new Schema<ProductVariantDocument>({
    productId: { type: String, required: true },
    variantId: { type: Number, required: true },
    title: { type: String, required: true },
    size: { type: String, required: true },
    sku: { type: String, required: true },
    priceInCents: { type: Number, required: true },
    stripeProductId: { type: String, required: true },
    stripePriceId: { type: String, required: true },
    image: { type: String },
});

export const ProductVariant = mongoose.model<ProductVariantDocument>(
    "ProductVariant",
    ProductVariantSchema
);
