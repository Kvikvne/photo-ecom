import { RequestHandler } from "express";
import { Cart } from "../models/cart";

// POST /api/cart/add
export const addToCart: RequestHandler = async (req, res) => {
    const { sessionId, item } = req.body;

    if (!sessionId || !item?.variantId) {
        res.status(400).json({ error: "Missing sessionId or item" });
        return;
    }

    const cart = await Cart.findOne({ sessionId });

    if (cart) {
        const existingItem = cart.items.find(
            (i) => i.variantId === item.variantId
        );

        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cart.items.push(item);
        }

        await cart.save();
        res.status(200).json(cart);
    } else {
        const newCart = new Cart({ sessionId, items: [item] });
        await newCart.save();
        res.status(201).json(newCart);
    }
};

// GET /api/cart?sessionId=abc123
export const getCart: RequestHandler = async (req, res) => {
    const { sessionId } = req.query;

    if (!sessionId) {
        res.status(400).json({ error: "Missing sessionId" });
        return;
    }

    const cart = await Cart.findOne({ sessionId });
    res.json(cart || { sessionId, items: [] });
};

// DELETE /api/cart/:variantId?sessionId=abc123
export const removeFromCart: RequestHandler = async (req, res) => {
    const { sessionId } = req.query;
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

    cart.items = cart.items.filter((i) => i.variantId !== Number(variantId));
    await cart.save();

    res.status(200).json(cart);
};
