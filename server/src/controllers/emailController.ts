import { RequestHandler } from "express";
import { Email } from "../models/email";

export const postEmail: RequestHandler = async (req, res) => {
    const sessionId = req.sessionId;
    const { email } = req.body;

    //Validate email presence
    if (!email) {
        res.status(400).json({ error: "email is missing from request." });
    }

    try {
        // Check if the email is already subscribed
        const existingEmail = await Email.findOne({ email });

        if (existingEmail) {
            res.status(409).json({ error: "Email already subscribed." });
        } else {
            // Save new email
            const newEmail = new Email({
                sessionId,
                email,
            });
            await newEmail.save();
            res.status(201).json({ emailSubscribed: email });
        }
    } catch (err) {
        console.error("Error subscribing email.", err);
        res.status(500).json({ error: "Failed to subscribe email", err });
    }
};
