import { getAllProducts, getProductById } from "../services/printifyService";
import { filterEnabledVariants } from "../utils/printifyFilter";

import { RequestHandler } from "express";

export const fetchAllProducts: RequestHandler = async (req, res) => {
    try {
        const rawProducts = await getAllProducts();
        const filteredProducts = rawProducts.map(filterEnabledVariants);

        res.status(200).json({
            count: filteredProducts.length,
            products: filteredProducts,
        });
    } catch (error: any) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

export const fetchProductById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { variantId } = req.query;

    try {
        const product = await getProductById(id); // from Printify or Mongo

        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        const enabledVariants = product.variants.filter((v) => v.is_enabled);
        const selectedVariant = variantId
            ? enabledVariants.find((v) => v.id.toString() === variantId)
            : null;

        res.status(200).json({
            ...product,
            variants: enabledVariants,
            selectedVariant,
        });
    } catch (error: any) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
};
