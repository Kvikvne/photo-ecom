import { ContactSubmission } from "../models/contact";
import { RequestHandler } from "express";
import axios from "axios";

export const postContactForm: RequestHandler = async (req, res) => {
    const { values, token } = req.body;

    try {
        // 1. Verify the reCAPTCHA token with Google
        if (!process.env.RECAPTCHA_SECRET_KEY) {
            res.status(500).json({ error: "Missing reCAPTCHA secret key." });
            return;
        }

        if (!token || typeof token !== "string") {
            res.status(400).json({
                error: "Missing or invalid reCAPTCHA token.",
            });
            return;
        }

        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
        const params = new URLSearchParams();
        params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
        params.append("response", token);

        const { data } = await axios.post(verifyUrl, params);

        if (
            !data.success ||
            data.score < 0.5 ||
            data.action !== "contact_form"
        ) {
            res.status(403).json({
                error: "reCAPTCHA verification failed.",
                details: data,
            });
            return;
        }

        // 2. Save the submission
        const contactSub = new ContactSubmission({
            ...values,
            recaptchaScore: data.score,
        });

        await contactSub.save();
        res.status(200).json({ submissionSaved: values });
    } catch (err) {
        console.error("Error submitting contact submission:", err);
        res.status(500).json({
            error: "Failed to submit contact form.",
        });
    }
};
