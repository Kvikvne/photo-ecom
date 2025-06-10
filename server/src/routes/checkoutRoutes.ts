import express from "express";
import { createCheckoutSession } from "../controllers/checkoutController";
import { checkoutLimiter } from "../utils/rateLimiters";

const router = express.Router();

router.post("/", checkoutLimiter, createCheckoutSession);

export default router;
