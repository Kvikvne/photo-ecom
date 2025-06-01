import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductInteractiveSection from "@/components/shop/product/ProductInteractiveSection";

import { API_BASE_URL } from "@/lib/config";

type Product = {
    id: string;
    title: string;
    description: string;
    variants: { id: number; title: string; price: number }[];
    images: { src: string; is_default: boolean; variant_ids: number[] }[];
    selectedVariant: { id: number; sku: string; price: number };
};

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    // Next 15 bullshit await to make the warning go away
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return {
            title: "Product Not Found - KAI",
            description: "This product could not be found.",
        };
    }

    return {
        title: `${product.title}`,
        description: product.description,
        openGraph: {
            title: `${product.title}`,
            description: product.description
                .replace(/<[^>]*>/g, "")
                .slice(0, 150),
            images: [
                {
                    url:
                        product.images.find((img) => img.is_default)?.src ??
                        product.images[0]?.src,
                    width: 1200,
                    height: 630,
                    alt: product.title,
                },
            ],
        },
    };
}

async function getProduct(id: string): Promise<Product | null> {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        credentials: "include",
        next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    return res.json();
}

export default async function ProductPage({
    params,
}: {
    params: { id: string };
}) {
    // Next 15 bullshit await to make the warning go away
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) return notFound();
    return (
        <main className="px-8 py-16">
            <ProductInteractiveSection
                title={product.title}
                description={product.description}
                images={product.images}
                variants={product.variants}
                productId={product.id}
            />
        </main>
    );
}
