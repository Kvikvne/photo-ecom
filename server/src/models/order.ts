import mongoose, { Schema, Document, Types } from "mongoose";

interface OrderItem {
    variantId: number;
    productId: string;
    quantity: number;
    priceInCents: number;
    title?: string;
    image?: string;
}

export interface OrderDocument extends Document {
    sessionId: string;
    stripeSessionId: string;
    email?: string;
    status:
        | "pending"
        | "processing"
        | "confirmed"
        | "shipped"
        | "delivered"
        | "failed";
    lineItems: OrderItem[];
    stripeCustomerId?: string;
    stripePaymentIntentId?: string;
    createdAt: Date;
    fulfilledAt?: Date;
    printifyOrderId: string;
    error?: string;
    _id: Types.ObjectId;
    shippedAt: Date;
    deliveredAt: Date;
    trackingUrl: string;
}

const OrderItemSchema = new Schema<OrderItem>(
    {
        variantId: { type: Number, required: true },
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        priceInCents: { type: Number, required: true },
        title: String,
        image: String,
    },
    { _id: false }
);

const OrderSchema = new Schema<OrderDocument>(
    {
        sessionId: { type: String, required: true },
        stripeSessionId: { type: String, required: true, unique: true },
        email: String,
        status: {
            type: String,
            enum: [
                "pending",
                "processing",
                "confirmed",
                "shipped",
                "delivered",
                "failed",
            ],
            default: "pending",
        },
        lineItems: [OrderItemSchema],
        stripeCustomerId: String,
        stripePaymentIntentId: String,
        fulfilledAt: Date,
        printifyOrderId: String,
        error: String,
        shippedAt: Date,
        deliveredAt: Date,
        trackingUrl: { type: String },
    },
    { timestamps: true }
);

export const Order = mongoose.model<OrderDocument>("Order", OrderSchema);
