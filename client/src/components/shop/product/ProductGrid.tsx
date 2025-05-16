import ProductCard from "./ProductCard";

type Product = {
    id: string;
    title: string;
    image: string;
    minPrice: number;
    maxPrice: number;
};

type ProductGridProps = {
    products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    title={product.title}
                    image={product.image}
                    minPrice={product.minPrice}
                    maxPrice={product.maxPrice}
                />
            ))}
        </div>
    );
}
