"use client";

import { Loader2, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

import { getCart, saveCart, CartItem } from "@/lib/cart-utils";

export default function CartList() {
    const [cartItems, setCartItems] = useState<CartItem[] | null>(null);

    useEffect(() => {
        const cart = getCart();
        setCartItems(cart);
    }, []);

    const updateQuantity = (itemId: number, newQuantity: number) => {
        const updatedCart = getCart().map((item: CartItem) => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        saveCart(updatedCart);
        setCartItems(updatedCart);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const removeItem = (itemId: number) => {
        const updatedCart = getCart().filter(
            (item: CartItem) => item.id !== itemId
        );
        saveCart(updatedCart);
        setCartItems(updatedCart);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    if (cartItems === null) return <Loader2 className="animate-spin" />;
    if (cartItems.length === 0) {
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

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-4xl mx-auto py-24">
            {cartItems.map((item, idx) => (
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
                    <p>${(item.price / 100).toFixed(2)}</p>
                    <div className="flex items-center gap-2">
                        <Button
                            disabled={item.quantity === 1}
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                item.quantity > 1 &&
                                updateQuantity(item.id, item.quantity - 1)
                            }
                        >
                            -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                            }
                        >
                            +
                        </Button>
                    </div>
                    <Button
                        onClick={() => removeItem(item.id)}
                        size="icon"
                        variant="destructive"
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
