"use client";
import React, { useState, useEffect } from "react";

import { Loader2 } from "lucide-react";
import Image from "next/image";

async function getCart() {
    const res = await fetch("http://localhost:5000/api/cart", {
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch cart");
    }

    return res.json();
}

export default function CartSummary() {
    const [cart, setCart] = useState<{ items: any[] } | null>(null);

    useEffect(() => {
        getCart()
            .then(setCart)
            .catch((err) => {
                console.error("Failed to load cart:", err);
                setCart({ items: [] }); // fallback
            });
    }, []);

    if (!cart) return <Loader2 className="animate-spin" />;
    else if (cart.items.length === 0) {
        return (
            <div className="max-w-xl mx-auto">
                <div className="flex flex-col gap-8 items-center justify-center min-h-90">
                    <p className="text-destructive">Somthing went wrong.</p>
                </div>
            </div>
        );
    }

    const total = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-xl mx-auto">
            {cart.items.map((item, idx) => (
                <div
                    key={idx}
                    className="flex items-center justify-between gap-6 mb-4 border-b-2 pb-4"
                >
                    <Image
                        height={100}
                        width={100}
                        src={item.image}
                        alt={item.productTitle}
                    />
                    <div>
                        <p className="font-semibold">{item.productTitle}</p>
                        <p className="text-muted-foreground">{item.title}</p>
                    </div>
                    <p className="">${(item.price / 100).toFixed(2)}</p>
                    <p>X {item.quantity}</p>
                </div>
            ))}
            <div className="flex items-end flex-col">
                <p className="text-xl font-semibold mb-4">
                    Total: ${(total / 100).toFixed(2)}
                </p>
            </div>
        </div>
    );
}
