import ProductGrid from "@/components/shop/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

async function getProducts() {
    try {
        const res = await fetch(
            `http://localhost:5000/api/products/cards/Canvas`,
            {
                credentials: "include",
                next: { revalidate: 60 }, // ISR
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        return data.products;
    } catch (err) {
        console.error("Failed to load products:", err);
        return null;
    }
}

export default async function Prints() {
    const products = await getProducts();
    console.log(products);
    if (!products) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-4 text-center">
                <div className="text-red-500">
                    <TriangleAlert size={48} />
                </div>
                <p className="text-lg font-medium">Somthing went wrong</p>
                <p className="text-muted-foreground mt-2">
                    Please try refreshing the page or check back later.
                </p>
                <Button onClick={() => window.location.reload()}>
                    Reload Page
                </Button>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-6xl font-bold">Prints</h1>
            <p className="w-2xl">
                Transform Your Space with Inspired prints: Elevate Your Home's
                Aesthetic with Our Stunning Selection.
            </p>
            <ProductGrid products={products} />
        </>
    );
}
