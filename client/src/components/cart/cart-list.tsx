"use client";

import { API_BASE_URL } from "@/lib/config";

import { Loader2, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCart, saveCart, CartItem } from "@/lib/cart-utils";
import { toast } from "sonner";

interface InvalidItems {
    productId: string;
    variantId: number;
    valid: boolean;
    inStock: boolean;
    currentPrice: number | null;
    expectedPrice: number;
    priceMatch: boolean;
}

export default function CartList() {
    const router = useRouter();

    const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [invalidItems, setInvalidItems] = useState<InvalidItems[]>();

    useEffect(() => {
        const cart = getCart();
        setCartItems(cart);
    }, []);

    // ----------------
    // Cart Validation
    // ----------------
    async function validateCart(cartItems: CartItem[]) {
        try {
            const res = await fetch(`${API_BASE_URL}/api/cart/validate`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ cartItems }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 429) {
                    toast.error(data.message);
                } else {
                    toast.error(data.error || "Cart validation failed.");
                }
                return null;
            }

            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function handleCheckout(cartItems: CartItem[]) {
        try {
            setLoading(true);
            const cartValidation = await validateCart(cartItems);

            if (!cartValidation?.items) {
                return;
            }

            const isCartValid = cartValidation.items.every((item: any) => {
                return item.valid && item.inStock && item.priceMatch;
            });

            if (isCartValid) {
                router.push("/checkout");
            } else {
                const invalidItems = cartValidation.items.filter(
                    (item: any) => {
                        return !item.valid || !item.inStock || !item.priceMatch;
                    }
                );
                setInvalidItems(invalidItems);
            }
        } catch (err) {
            console.error("There was problem validating cart.", err);
        } finally {
            setLoading(false);
        }
    }

    // ----------------
    // Cart actions
    // ----------------
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

    // ----------------
    // UI RENDERING
    // ----------------
    if (cartItems === null) return <Loader2 className="animate-spin" />;

    if (cartItems.length === 0) {
        return (
            <div className="max-w-xl mx-auto">
                <div className="flex flex-col gap-8 items-center justify-center min-h-90">
                    <p>Your cart is empty.</p>
                    <Button asChild>
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
            {invalidItems && invalidItems.length > 0 && (
                <Alert variant="destructive" className="mb-12">
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        There {invalidItems.length === 1 ? "is" : "are"}{" "}
                        {invalidItems.length} item
                        {invalidItems.length !== 1 && "s"} with issues in your
                        cart. Please review and remove them before proceeding to
                        checkout.
                    </AlertDescription>
                </Alert>
            )}
            {cartItems.map((item, idx) => {
                const isInvalid = invalidItems?.find(
                    (i) =>
                        i.productId === item.productId &&
                        i.variantId === item.id
                );

                return (
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
                            <p className="text-muted-foreground">
                                {item.title}
                            </p>
                        </div>
                        <p>${(item.price / 100).toFixed(2)}</p>

                        {isInvalid ? (
                            <div className="text-sm text-destructive space-y-1">
                                {!isInvalid.inStock && <p>Out of stock</p>}
                                {!isInvalid.valid && (
                                    <p>This variant is no longer available</p>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button
                                    disabled={item.quantity === 1}
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        item.quantity > 1 &&
                                        updateQuantity(
                                            item.id,
                                            item.quantity - 1
                                        )
                                    }
                                >
                                    -
                                </Button>
                                <span>{item.quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            item.quantity + 1
                                        )
                                    }
                                >
                                    +
                                </Button>
                            </div>
                        )}

                        <Button
                            onClick={() => removeItem(item.id)}
                            size="icon"
                            variant="destructive"
                        >
                            <CircleX />
                        </Button>
                    </div>
                );
            })}

            <div className="flex items-end flex-col">
                <p className="text-xl font-semibold mb-4">
                    Total: ${(total / 100).toFixed(2)}
                </p>
                <Button onClick={() => handleCheckout(cartItems)}>
                    {loading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        "Checkout"
                    )}
                </Button>
            </div>
        </div>
    );
}
