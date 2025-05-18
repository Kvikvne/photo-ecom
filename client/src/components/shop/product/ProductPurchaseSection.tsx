"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Variant = {
    id: number;
    title: string;
    price: number;
};

type Props = {
    variants: Variant[];
    onVariantChange: (variantId: number) => void;
    productId: string;
};

function addToCart(selectedVariant: Variant, productId: string) {
    try {
        fetch("http://localhost:5000/api/cart/add", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                item: {
                    ...selectedVariant,
                    productId: productId,
                },
            }),
        });
    } catch (err) {
        console.error("There was problem adding item to cart.");
    }
}

export default function ProductPurchaseSection({
    variants,
    onVariantChange,
    productId,
}: Props) {
    const [selectedVariant, setSelectedVariant] = useState<Variant>(
        variants[0]
    );

    const handleSelect = (variant: Variant) => {
        setSelectedVariant(variant);
        onVariantChange(variant.id);
    };

    console.log(selectedVariant);

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

            <Button
                className="mt-4"
                onClick={() => addToCart(selectedVariant, productId)}
            >
                Add to Cart
            </Button>
        </div>
    );
}
