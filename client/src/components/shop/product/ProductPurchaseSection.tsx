"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getCart, saveCart, CartItem } from "@/lib/cart-utils";

type Variant = {
    id: number;
    title: string;
    price: number;
};

type ProductInfo = {
    productId: string;
    title: string;
};

type Props = {
    variants: Variant[];
    onVariantChange: (variantId: number) => void;
    product: ProductInfo;
    image: string;
};

export function Checkmark() {
    return (
        <svg
            className={"checkmark text-primary"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
        >
            <circle
                className={"checkmarkCircle "}
                cx="26"
                cy="26"
                r="25"
                fill="none"
            />
            <path
                className={"checkmarkCheck"}
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
        </svg>
    );
}

export default function ProductPurchaseSection({
    variants,
    onVariantChange,
    product,
    image,
}: Props) {
    const [selectedVariant, setSelectedVariant] = useState<Variant>(
        variants[0] || null
    );
    const [loading, setLoading] = useState(false);

    const handleSelect = (variant: Variant) => {
        setSelectedVariant(variant);
        onVariantChange(variant.id);
    };

    const handleAddToCart = () => {
        setLoading(true);

        const cart = getCart();

        const existingIndex = cart.findIndex(
            (item: CartItem) =>
                item.productId === product.productId &&
                item.id === selectedVariant.id
        );

        if (existingIndex !== -1) {
            // If item exists, increment quantity
            cart[existingIndex].quantity += 1;
        } else {
            // If item doesn't exist, add new item with quantity 1
            const newItem: CartItem = {
                ...selectedVariant,
                productId: product.productId,
                image,
                productTitle: product.title,
                quantity: 1,
            };
            cart.push(newItem);
        }
        setTimeout(() => {
            setLoading(false);
        }, 2500);
        saveCart(cart);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    return (
        <div className="mt-6">
            {variants.length > 0 ? (
                <>
                    <p className="text-xl font-semibold mb-4">
                        ${(selectedVariant.price / 100).toFixed(2)}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {variants.map((variant) => (
                            <Button
                                key={variant.id}
                                variant={
                                    selectedVariant.id === variant.id
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() => handleSelect(variant)}
                            >
                                {variant.title.replace(
                                    /\s*\((Horizontal|Vertical)\)/,
                                    ""
                                )}
                            </Button>
                        ))}
                    </div>
                </>
            ) : (
                <></>
            )}
            <div className="flex items-center mt-4 gap-4">
                <Button
                    disabled={variants.length === 0}
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
                {loading && <Checkmark />}
            </div>
        </div>
    );
}
