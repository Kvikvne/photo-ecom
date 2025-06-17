import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductInteractiveSection from "@/components/shop/product/ProductInteractiveSection";
import { ProductJsonLd } from "@/lib/ProductJsonLd";

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
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found - KAI",
      description: "This product could not be found."
    };
  }

  return {
    metadataBase: new URL("https://kvikvne.com"),
    title: product.title,
    description: product.description,
    keywords: [
      "canvas print",
      product.title,
      "beach art",
      "ocean wall decor",
      "surf photography",
      "coastal photography"
    ],
    openGraph: {
      title: product.title,
      description: product.description,
      url: `https://kvikvne.com/shop/prints/${id}`,
      siteName: "KVIKVNE",
      images: [
        {
          url:
            product.images.find((img) => img.is_default)?.src ??
            product.images[0]?.src,
          width: 1200,
          height: 630,
          alt: product.title
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [
        product.images.find((img) => img.is_default)?.src ??
          product.images[0]?.src
      ]
    }
  };
}

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    credentials: "include",
    next: { revalidate: 3600 }
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return notFound();

  const defaultImage =
    product.images.find((img) => img.is_default)?.src ?? product.images[0]?.src;
  return (
    <>
      <ProductJsonLd
        id={product.id}
        title={product.title}
        description={product.description}
        image={defaultImage}
        prices={product.variants.map((v) => v.price)}
        currency="USD"
        url={`https://kvikvne.com/shop/prints/${product.id}`}
      />
      <main className="px-3 md:py-16">
        <ProductInteractiveSection
          title={product.title}
          description={product.description}
          images={product.images}
          variants={product.variants}
          productId={product.id}
        />
      </main>
    </>
  );
}
