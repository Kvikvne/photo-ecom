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

export default function ProductPurchaseSection({
    variants,
    onVariantChange,
    product,
    image,
}: Props) {
    const [selectedVariant, setSelectedVariant] = useState<Variant>(
        variants[0]
    );

    const handleSelect = (variant: Variant) => {
        setSelectedVariant(variant);
        onVariantChange(variant.id);
    };

    const handleAddToCart = () => {
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

        saveCart(cart);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    return (
        <div className="mt-6">
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
                        {variant.title}
                    </Button>
                ))}
            </div>

            <Button className="mt-4" onClick={handleAddToCart}>
                Add to Cart
            </Button>
        </div>
    );
}
