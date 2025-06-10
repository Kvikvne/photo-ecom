"use client";

import { useState, useEffect } from "react";
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
    // Preload all images availible for each variant to imporve perceived speed on variant change.
    useEffect(() => {
        if (!images || images.length === 0) return;

        const uniqueImageSrcs = Array.from(
            new Set(images.map((img) => img.src))
        );
        uniqueImageSrcs.forEach((src) => {
            const preload = new Image();
            preload.decoding = "async";
            preload.src = src;
        });
    }, [images]);

    const [activeVariantId, setActiveVariantId] = useState(variants[0]?.id);
    const variantImages = images.filter((img) =>
        img.variant_ids.includes(activeVariantId)
    );
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <ProductImageGallery images={images} variantId={activeVariantId} />
            <div>
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <ProductPurchaseSection
                    variants={variants}
                    onVariantChange={setActiveVariantId}
                    product={{
                        productId: productId,
                        title: title,
                    }}
                    image={variantImages[0]?.src || ""}
                />
                <div className="flex items-center gap-5 my-8">
                    {variants.length > 0 ? (
                        <Badge variant={"outline"}>In stock</Badge>
                    ) : (
                        <Badge variant={"destructive"}>Out of stock</Badge>
                    )}
                    <p className="text-sm">
                        Our canvas prints are made with a cotton-poly blend and
                        stretched over a solid pine wood frame sourced from
                        renewable forests. Each piece comes ready to hang with
                        rubber supports on the back.
                    </p>
                </div>
                <p className="text-muted-foreground mb-6 text-lg">
                    {description}
                </p>
            </div>
        </div>
    );
}
