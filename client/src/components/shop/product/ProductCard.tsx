import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ProductCardProps = {
    id: string;
    title: string;
    image: string;
    minPrice: number;
    maxPrice: number;
};

export default function ProductCard({
    id,
    title,
    image,
    minPrice,
    maxPrice,
}: ProductCardProps) {
    return (
        <Card className="bg-transparent shadow-none border-0">
            <CardContent className="bg-transparent">
                <Link href={`/shop/${id}`}>
                    <Image
                        src={image}
                        alt={title}
                        width={300}
                        height={300}
                        className="rounded-sm mx-auto"
                    />
                    <h3 className="text-lg font-semibold mt-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">
                        ${minPrice.toFixed(2)} from ${maxPrice.toFixed(2)}
                    </p>
                    <Button
                        variant={"outline"}
                        className="w-full mt-4 bg-primary text-background hover:text-foreground"
                        asChild
                    >
                        <Link href={`/shop/${id}`}>View details</Link>
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
