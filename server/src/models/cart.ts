import mongoose, { Schema, Document } from "mongoose";
import { CartItem, CartDocument } from "../types/cart";

const CartSchema = new Schema<CartDocument>(
    {
        sessionId: { type: String, required: true },
        items: [
            {
                id: { type: Number, required: true },
                productId: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                title: String,
                image: String,
            },
        ],
    },
    { timestamps: true }
);

export const Cart = mongoose.model<CartDocument>("Cart", CartSchema);
