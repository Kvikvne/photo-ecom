"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { CircleX } from "lucide-react";
import Link from "next/link";

async function getCart() {
    const res = await fetch("http://localhost:5000/api/cart", {
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch cart");
    }

    return res.json();
}

async function removeCartItem(id: string) {
    const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch cart");
    }

    return res.json();
}

async function updateCartItemQuantity(id: number, quantity: number) {
    const res = await fetch(`http://localhost:5000/api/cart/item/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
    });

    if (!res.ok) throw new Error("Failed to update cart item");
    return res.json();
}

export default function CartList() {
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
                    <p>Your cart is empty.</p>
                    <Button>
                        <Link href={"/shop/prints"}>Go to shop</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const total = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-4xl mx-auto py-24">
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
                    <p className="" key={idx}>
                        ${(item.price / 100).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            disabled={item.quantity === 1}
                            variant="ghost"
                            size="icon"
                            onClick={async () => {
                                if (item.quantity > 1) {
                                    const updated =
                                        await updateCartItemQuantity(
                                            item.id,
                                            item.quantity - 1
                                        );
                                    setCart(updated);
                                }
                            }}
                        >
                            -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={async () => {
                                const updated = await updateCartItemQuantity(
                                    item.id,
                                    item.quantity + 1
                                );
                                setCart(updated);
                            }}
                        >
                            +
                        </Button>
                    </div>
                    <Button
                        onClick={async () => {
                            await removeCartItem(item.id);
                            const updatedCart = await getCart();
                            setCart(updatedCart);
                        }}
                        size={"icon"}
                        variant={"destructive"}
                    >
                        <CircleX />
                    </Button>
                </div>
            ))}
            <div className="flex items-end flex-col">
                <p className="text-xl font-semibold mb-4">
                    Total: ${(total / 100).toFixed(2)}
                </p>

                <Button>
                    <Link href={"/checkout"}>Checkout</Link>
                </Button>
            </div>
        </div>
    );
}
