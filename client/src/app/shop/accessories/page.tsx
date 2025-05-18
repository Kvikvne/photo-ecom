import ProductGrid from "@/components/shop/product/ProductGrid";

async function getProducts() {
    const res = await fetch(
        `http://localhost:5000/api/products/cards/Accessories`,
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
}

export default async function Accessories() {
    const products = await getProducts();
    return (
        <>
            <h1 className="text-6xl font-bold">Accessories</h1>
            <p className="w-2xl">
                Complete your space with thoughtfully designed accessories that
                add both function and flair.
            </p>

            <ProductGrid products={products} />
        </>
    );
}
