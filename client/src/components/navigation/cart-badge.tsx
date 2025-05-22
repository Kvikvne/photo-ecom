// components/CartLenBadge.tsx
"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export function CartLenBadge() {
    const [cartLen, setCartLen] = useState<number>(0);

    const getCartLength = () => {
        const stored = localStorage.getItem("cart");
        if (stored) {
            try {
                const cart = JSON.parse(stored);
                return cart.length;
            } catch {
                return 0;
            }
        }
        return 0;
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

    return <Badge variant="destructive">{cartLen}</Badge>;
}
