import { Schema, model } from "mongoose";

const ContactSubmissionSchema = new Schema(
    {
        first_name: String,
        last_name: String,
        email: String,
        reason: String,
        orderId: String,
        message: String,
        recaptchaScore: Number,
    },
    { timestamps: true }
);

export const ContactSubmission = model(
    "ContactSubmission",
    ContactSubmissionSchema
);
