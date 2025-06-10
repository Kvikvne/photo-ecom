import express from "express";
import { emailLimiter } from "../utils/rateLimiters";
import { postContactForm } from "../controllers/contactController";

const router = express.Router();

router.post("/", emailLimiter, postContactForm);

export default router;
