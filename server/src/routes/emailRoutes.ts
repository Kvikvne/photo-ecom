import express from "express";
import { postEmail } from "../controllers/emailController";
import { emailLimiter } from "../utils/rateLimiters";

const router = express.Router();

router.post("/sub", emailLimiter, postEmail);

export default router;
