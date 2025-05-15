import express from "express";
import {
    fetchAllProducts,
    fetchProductById,
} from "../controllers/productController";

const router = express.Router();

router.get("/", fetchAllProducts);
// /api/products/65c55b04688e99f9a001907b?variantId=75757
router.get("/:id", fetchProductById);

export default router;
