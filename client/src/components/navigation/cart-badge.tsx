// components/CartLenBadge.tsx
"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { CartItem } from "@/lib/cart-utils";

export function CartLenBadge() {
    const [cartLen, setCartLen] = useState<number>(0);

    const getCartLength = () => {
        try {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            return cart.reduce(
                (sum: number, item: CartItem) => sum + (item.quantity ?? 1),
                0
            );
        } catch {
            return 0;
        }
    };

    useEffect(() => {
        // Set initial cart length on mount
        setCartLen(getCartLength());

        // Listen for custom cart update events (fired manually when cart changes)
        const updateHandler = () => {
            setCartLen(getCartLength());
        };

        window.addEventListener("cartUpdated", updateHandler);

        // Optional: Listen to storage changes from other tabs
        window.addEventListener("storage", updateHandler);

        return () => {
            window.removeEventListener("cartUpdated", updateHandler);
            window.removeEventListener("storage", updateHandler);
        };
    }, []);
    if (cartLen === 0) return;
    return <Badge variant="destructive">{cartLen}</Badge>;
}
