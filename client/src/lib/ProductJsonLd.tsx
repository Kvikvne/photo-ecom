import React from "react";

interface ProductJsonLdProps {
    id: string;
    title: string;
    description: string;
    image: string;
    prices: number[]; // Pass an array of all variant prices
    currency: string;
    availability?: "InStock" | "OutOfStock" | "PreOrder";
    url: string;
}

export function ProductJsonLd({
    id,
    title,
    description,
    image,
    prices,
    currency,
    availability = "InStock",
    url,
}: ProductJsonLdProps) {
    const minPrice = (Math.min(...prices) / 100).toFixed(2);
    const maxPrice = (Math.max(...prices) / 100).toFixed(2);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: title,
        image: [image],
        description,
        sku: id,
        brand: {
            "@type": "Brand",
            name: "KVIKVNE",
        },
        offers: {
            "@type": "AggregateOffer",
            url,
            priceCurrency: currency,
            lowPrice: minPrice,
            highPrice: maxPrice,
            offerCount: prices.length,
            availability: `https://schema.org/${availability}`,
            itemCondition: "https://schema.org/NewCondition",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
