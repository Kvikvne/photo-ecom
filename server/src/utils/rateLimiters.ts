import rateLimit, { Options } from "express-rate-limit";
import { Request } from "express";

// Generic helper
const createRateLimiter = (options: Partial<Options>) =>
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    standardHeaders: true,
    legacyHeaders: false,
    ...options
  });

// Checkout
export const checkoutLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { message: "Too many checkout attempts. Please slow down." }
});

// Cart validation
export const cartValidationLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: { message: "Too many checkout attempts. Please slow down." }
});

// Contact / Email
export const emailLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many form submissions. Try again later." },
  keyGenerator: (req: Request): string => {
    const xForwardedFor = req.headers["x-forwarded-for"];
    if (typeof xForwardedFor === "string" && xForwardedFor.length > 0) {
      return xForwardedFor.split(",")[0].trim();
    }
    return req.ip || "unknown-ip"; // fallback to always return a string
  }
});
