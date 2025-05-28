import { getAllProducts, getProductById } from "../services/printifyService";
import { PrintifyProduct } from "../types/printify";
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
        const product = await getProductById(id);

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
        res.status(500).json({
            error: "Failed to fetch product what the hell",
        });
    }
};

export const fetchProductCards: RequestHandler = async (req, res) => {
    const { productType } = req.params;

    try {
        const rawProducts = await getAllProducts();
        const filteredProducts = rawProducts.map(filterEnabledVariants);

        const cardProducts = filteredProducts
            .filter((product: PrintifyProduct) =>
                product.tags.includes(productType)
            )
            .map((product: PrintifyProduct) => {
                const defaultImage =
                    product.images.find((img) => img.is_default)?.src ||
                    product.images[0]?.src;

                const prices = product.variants.map((v) => v.price);
                const inStock = product.variants.some((v) => v.is_available);

                const minPrice = Math.min(...prices) / 100;
                const maxPrice = Math.max(...prices) / 100;

                return {
                    id: product.id,
                    title: product.title,
                    image: defaultImage,
                    minPrice,
                    maxPrice,
                    inStock,
                };
            });

        res.status(200).json({ products: cardProducts });
    } catch (error: any) {
        console.error("Error fetching product cards:", error);
        res.status(500).json({ error: "Failed to fetch product cards" });
    }
};
