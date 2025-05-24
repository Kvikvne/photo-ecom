import mongoose, { Schema, Document } from "mongoose";

export interface EmailDocument extends Document {
    sessionId?: string;
    email: string;
}

const EmailSchema = new Schema<EmailDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        sessionId: { type: String, required: false },
    },
    { timestamps: true }
);

export const Email = mongoose.model<EmailDocument>("Email", EmailSchema);
