import express from "express";
import {
    getCart,
    addToCart,
    removeFromCart,
} from "../controllers/cartController";
const router = express.Router();

router.post("/add", addToCart);
router.get("/", getCart);
router.delete("/:variantId", removeFromCart);

export default router;
