import mongoose, { Document, Schema } from "mongoose";

export interface ContactSubmissionDocument extends Document {
    first_name: string;
    last_name: string;
    email: string;
    reason: string;
    orderId?: string;
    message: string;
    recaptchaScore: number;
    createdAt: Date;
    updatedAt: Date;
}

const ContactSubmissionSchema = new Schema<ContactSubmissionDocument>(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        reason: { type: String, required: true },
        orderId: { type: String },
        message: { type: String, required: true },
        recaptchaScore: { type: Number, required: true },
    },
    { timestamps: true }
);

export const ContactSubmission = mongoose.model<ContactSubmissionDocument>(
    "ContactSubmission",
    ContactSubmissionSchema
);
