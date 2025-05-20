import mongoose, { Schema, Document, Types } from "mongoose";

interface OrderItem {
    variantId: number;
    productId: string;
    quantity: number;
    priceInCents: number;
    title?: string;
    image?: string;
}

interface AddressTo {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string; // ISO 3166-1 alpha-2 country code (e.g., "US")
    region: string; // State or province
    city: string;
    address1: string;
    address2?: string; // Optional
    zip: string;
}

const AddressToSchema = new Schema<AddressTo>(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        country: { type: String, required: true },
        region: { type: String, required: true },
        city: { type: String, required: true },
        address1: { type: String, required: true },
        address2: { type: String, required: false },
        zip: { type: String, required: true },
    },
    { _id: false }
);

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

export interface OrderDocument extends Document {
    sessionId: string;
    stripeSessionId: string;
    email?: string;
    status:
        | "pending"
        | "paid"
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
    addressTo: AddressTo;
    subtotalInCents?: number;
    shippingInCents?: number;
    discountInCents?: number;
    totalAmountPaidInCents: number;
}

const OrderSchema = new Schema<OrderDocument>(
    {
        sessionId: { type: String },
        stripeSessionId: { type: String },
        email: String,
        status: {
            type: String,
            enum: [
                "pending",
                "paid",
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
        addressTo: { type: AddressToSchema, required: true },
        subtotalInCents: { type: Number },
        shippingInCents: { type: Number },
        discountInCents: { type: Number },
        totalAmountPaidInCents: { type: Number, required: true },
    },
    { timestamps: true }
);

OrderSchema.index(
    { stripeSessionId: 1 },
    {
        unique: true,
        partialFilterExpression: {
            stripeSessionId: { $exists: true, $ne: null },
        },
    }
);

export const Order = mongoose.model<OrderDocument>("Order", OrderSchema);
