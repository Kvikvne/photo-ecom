import ProductGrid from "@/components/shop/product/ProductGrid";
import { fetchWithErrorHandling } from "@/lib/fetch-with-error-handling";
import { TriangleAlert, Rat } from "lucide-react";

interface Products {
    id: string;
    image: string;
    inStock: boolean;
    maxPrice: number;
    minPrice: number;
    title: string;
}

export default async function Prints() {
    // This gets the products by tag then generates all of your product cards.
    // `http://localhost:5000/api/products/cards/{ your tag here }`
    const data = await fetchWithErrorHandling<{ products: Products[] }>(
        "http://localhost:5000/api/products/cards/canvas",
        {
            credentials: "include",
            next: { revalidate: 60 },
        }
    );

    const products = data && "products" in data ? data.products : null;

    if (!products) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-4 text-center">
                <div className="text-red-500">
                    <TriangleAlert size={48} />
                </div>
                <p className="text-lg font-medium">Something went wrong</p>
                <p className="text-muted-foreground mt-2">
                    Please try refreshing the page or check back later.
                </p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-4 text-center">
                <div className="text-primary">
                    <Rat size={48} />
                </div>
                <p className="text-lg font-medium">No products yet!</p>
                <p className="text-muted-foreground mt-2">
                    Check back with us later.
                </p>
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
