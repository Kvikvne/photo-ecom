import rateLimit, { Options } from "express-rate-limit";
import { Request } from "express";

// Generic key generator that safely parses x-forwarded-for or falls back to req.ip
const defaultKeyGenerator = (req: Request): string => {
  const xForwardedFor = req.headers["x-forwarded-for"];
  if (typeof xForwardedFor === "string" && xForwardedFor.length > 0) {
    return xForwardedFor.split(",")[0].trim();
  }
  return req.ip || "unknown-ip";
};

// Generic helper
const createRateLimiter = (options: Partial<Options>) =>
  rateLimit({
    windowMs: 15 * 60 * 1000, // default 15 minutes unless overridden
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: defaultKeyGenerator, // default key generator for all
    ...options
  });

export const checkoutLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { message: "Too many checkout attempts. Please slow down." }
});

export const cartValidationLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: { message: "Too many checkout attempts. Please slow down." }
});

export const emailLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 2,
  message: { message: "Too many form submissions. Try again later." }
});
