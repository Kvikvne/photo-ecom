import express from "express";
import {
    getCart,
    addToCart,
    removeFromCart,
    updateCartItem,
    validateCart,
} from "../controllers/cartController";
import { cartValidationLimiter } from "../utils/rateLimiters";

const router = express.Router();

router.post("/add", addToCart);
router.get("/", getCart);
router.patch("/item/:variantId", updateCartItem);
router.delete("/:variantId", removeFromCart);
router.post("/validate", cartValidationLimiter, validateCart);

export default router;
