import { RequestHandler } from "express";
import { Cart } from "../models/cart";
import { getAllProducts } from "../services/printifyService";

// ---------------------------
// Functions for carts stored in a DB.
// Currently using local storage for user carts.
// ---------------------------

// POST /api/cart/add
export const addToCart: RequestHandler = async (req, res) => {
    const sessionId = req.sessionId;
    const { item, product } = req.body;

    if (!sessionId || !item?.productId) {
        res.status(400).json({ error: "Missing sessionId or item" });
        return;
    }

    const cart = await Cart.findOne({ sessionId });

    if (cart) {
        // Check if item (by variant ID) already exists
        const existingItem = cart.items.find((i) => i.id === item.id);

        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cart.items.push(item);
        }

        // Only add the product metadata if it’s not already stored
        if (product && product.productId) {
            const productExists = cart.products?.some(
                (p) => p.productId === product.productId
            );

            if (!productExists) {
                cart.products.push(product);
            }
        }

        await cart.save();
        res.status(200).json(cart);
        return;
    } else {
        const newCart = new Cart({
            sessionId,
            items: [item],
            products: [product],
        });

        await newCart.save();
        res.status(201).json(newCart);
        return;
    }
};

// GET /api/cart
export const getCart: RequestHandler = async (req, res) => {
    const sessionId = req.sessionId;
    if (!sessionId) {
        res.status(400).json({ error: "Missing sessionId" });
        return;
    }

    const cart = await Cart.findOne({ sessionId });
    res.json(cart || { sessionId, items: [] });
};

// DELETE /api/cart/:variantId?sessionId=abc123
export const removeFromCart: RequestHandler = async (req, res) => {
    const sessionId = req.sessionId;
    const { variantId } = req.params;

    if (!sessionId || !variantId) {
        res.status(400).json({ error: "Missing sessionId or variantId" });
        return;
    }

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
        res.status(404).json({ error: "Cart not found" });
        return;
    }

    cart.items = cart.items.filter((i) => i.id !== Number(variantId));
    await cart.save();

    res.status(200).json(cart);
};

export const updateCartItem: RequestHandler = async (req, res) => {
    const sessionId = req.sessionId;
    const { variantId } = req.params;
    const { quantity } = req.body;

    if (!sessionId || !variantId || typeof quantity !== "number") {
        res.status(400).json({ error: "Missing data" });
        return;
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
        res.status(404).json({ error: "Cart not found" });
        return;
    }

    const item = cart.items.find((i) => i.id === Number(variantId));
    if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
    }

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
};

// -------------------------------
// Needed for any type of cart.
// Validates cart before checkout session
// -------------------------------

export const validateCart: RequestHandler = async (req, res) => {
    const { cartItems } = req.body;

    try {
        const allProducts = await getAllProducts();

        let resObject: {
            items: {
                productId: string;
                variantId: number;
                valid: boolean;
                inStock: boolean;
                currentPrice: number | null;
                expectedPrice: number;
                priceMatch: boolean;
            }[];
        } = { items: [] };

        cartItems.forEach((item: any) => {
            const product = allProducts.find(
                (p: any) => p.id === item.productId
            );
            const variant = product?.variants.find(
                (v: any) => v.id === item.id
            );

            resObject.items.push({
                productId: item.productId,
                variantId: item.id,
                valid: !!variant,
                inStock: variant?.is_available || false,
                currentPrice: variant?.price || null,
                expectedPrice: item.price,
                priceMatch: variant?.price === item.price,
            });
        });

        res.status(200).json(resObject);
    } catch (error) {
        console.error("Cart validataion failed:", error);
    }
};
