import express from "express";
import { createCheckoutSession } from "../controllers/checkoutController";

const router = express.Router();

router.post("/", createCheckoutSession);

export default router;
