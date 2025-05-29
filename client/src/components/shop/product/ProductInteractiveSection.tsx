"use client";

import { useState } from "react";
import ProductImageGallery from "@/components/shop/product/ProductImageGallery";
import ProductPurchaseSection from "@/components/shop/product/ProductPurchaseSection";
import { Badge } from "@/components/ui/badge";

type Variant = {
    id: number;
    title: string;
    price: number;
};

type ImageType = {
    src: string;
    variant_ids: number[];
    is_default: boolean;
};

type Props = {
    images: ImageType[];
    variants: Variant[];
    title: string;
    description: string;
    productId: string;
};

export default function ProductInteractiveSection({
    title,
    description,
    images,
    variants,
    productId,
}: Props) {
    const [activeVariantId, setActiveVariantId] = useState(variants[0]?.id);
    const variantImages = images.filter((img) =>
        img.variant_ids.includes(activeVariantId)
    );
    return (
        <div className="grid md:grid-cols-2 gap-12">
            <ProductImageGallery images={images} variantId={activeVariantId} />
            <div>
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <p className="text-muted-foreground mb-6 text-lg">
                    {description}
                </p>
                {variants.length > 0 ? (
                    <Badge variant={"outline"}>In stock</Badge>
                ) : (
                    <Badge variant={"destructive"}>Out of stock</Badge>
                )}
                <ProductPurchaseSection
                    variants={variants}
                    onVariantChange={setActiveVariantId}
                    product={{
                        productId: productId,
                        title: title,
                    }}
                    image={variantImages[0]?.src || ""}
                />
            </div>
        </div>
    );
}
