"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

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

async function addToCart(
    selectedVariant: Variant,
    product: ProductInfo,
    image: string
) {
    try {
        const res = await fetch("http://localhost:5000/api/cart/add", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                item: {
                    ...selectedVariant,
                    productId: product.productId,
                    image: image,
                    productTitle: product.title,
                },
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Add to cart failed:", errorData);
        } else {
            const data = await res.json();
            console.log("Cart updated:", data);
        }
    } catch (err) {
        console.error("There was a problem adding item to cart:", err);
    }
}

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

    console.log("add to cart component product: ", product);

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
                onClick={() => addToCart(selectedVariant, product, image)}
            >
                Add to Cart
            </Button>
        </div>
    );
}
