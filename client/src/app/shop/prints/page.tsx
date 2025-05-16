import ProductGrid from "@/components/shop/product/ProductGrid";

async function getProducts() {
    const res = await fetch(`http://localhost:5000/api/products/cards`, {
        next: { revalidate: 60 }, // ISR
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    return data.products;
}

export default async function Prints() {
    const products = await getProducts();
    return (
        <main>
            <div className="container mx-auto py-16">
                <h1 className="text-6xl font-bold">Prints</h1>
                <p className="w-2xl">
                    Transform Your Space with Inspired prints: Elevate Your
                    Home's Aesthetic with Our Stunning Selection. We currently
                    offer our prints in both canvas and acrylic options.
                </p>
                <ProductGrid products={products} />
            </div>
        </main>
    );
}
