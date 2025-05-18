import express from "express";
import {
    getCart,
    addToCart,
    removeFromCart,
    updateCartItem,
} from "../controllers/cartController";
const router = express.Router();

router.post("/add", addToCart);
router.get("/", getCart);
router.patch("/item/:variantId", updateCartItem);
router.delete("/:variantId", removeFromCart);

export default router;
