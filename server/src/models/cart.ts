import mongoose, { Schema } from "mongoose";
import { CartDocument } from "../types/cart";

const CartSchema = new Schema<CartDocument>(
    {
        sessionId: { type: String, required: true },
        items: [
            {
                id: { type: Number, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                title: String,
                productId: { type: String, required: true },
                image: String,
                productTitle: String,
            },
        ],
    },
    { timestamps: true }
);

export const Cart = mongoose.model<CartDocument>("Cart", CartSchema);
