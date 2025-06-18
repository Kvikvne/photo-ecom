import express from "express";
import { emailLimiter } from "../utils/rateLimiters";
import { postContactForm } from "../controllers/contactController";

const router = express.Router();

router.post(
  "/",
  (req, res, next) => {
    console.log("[IP]", req.ip, req.ips, req.headers["x-forwarded-for"]);
    next();
  },
  emailLimiter,
  postContactForm
);

export default router;
