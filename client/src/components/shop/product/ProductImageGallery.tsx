"use client";

import { useState, useEffect } from "react";

type ImageType = {
    src: string;
    variant_ids: number[];
    is_default: boolean;
};

type Props = {
    images: ImageType[];
    variantId: number;
};

export default function ProductImageGallery({ images, variantId }: Props) {
    const variantImages = images.filter((img) =>
        img.variant_ids.includes(variantId)
    );

    const defaultImage =
        variantImages[variantImages.length - 1]?.src || images[0].src;
    const [mainImage, setMainImage] = useState<string>(defaultImage);

    useEffect(() => {
        setMainImage(defaultImage);
    }, [variantId]);

    return (
        <div>
            <div className="w-full mb-4">
                {/* IMPORTANT! Use img instead on Image in this component. 
                This allows all of the variant images to be preloaded 
                improving speed when the user switched product variants */}
                <img
                    src={mainImage}
                    alt="Main product image"
                    width={500}
                    height={500}
                    className="rounded-md"
                    loading="eager"
                />
            </div>
            <div className="flex gap-2 flex-wrap">
                {variantImages.map((img) => (
                    <button
                        key={img.src}
                        onClick={() => setMainImage(img.src)}
                        className="w-24 h-24 border rounded overflow-hidden"
                    >
                        <img
                            src={img.src}
                            alt="Thumbnail"
                            width={96}
                            height={96}
                            className="object-cover w-full h-full"
                            loading="lazy"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
