import { Button } from "@/components/ui/button";
import { ChevronsDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section
            id="home"
            className="h-[calc(100vh-88px)] bg-[url(/Oceanic.JPG)] bg-cover bg-bottom flex flex-col justify-between items-center px-4 py-8"
        >
            {/* <div
                className="z-0 absolute top-0 left-0 w-full h-full"
                style={{
                    backgroundImage:
                        "linear-gradient(180deg, rgba(6, 21, 28, 0) 40%, rgba(6, 21, 28, 1) 100%)",
                }}
            /> */}
            <div className="flex-1 flex flex-col justify-center items-start max-w-4xl z-1">
                <p className="text-background text-4xl">Photography by</p>
                <h1 className="text-8xl text-background font-bold">
                    Kaikane Anderson
                </h1>
                <p className="text-background mt-4 text-lg">
                    This space is a celebration of my love for photography and
                    my skill in presenting captivating moments through the art
                    of print. Explore and immerse yourself in a collection that
                    reflects not only images captured through my lens but also
                    the essence of unique stories preserved in each print.
                </p>
                <Button
                    className="mt-6 cursor-pointer"
                    size="lg"
                    color="primary"
                >
                    Shop prints
                </Button>
            </div>

            <Link href="#fav" aria-label="Scroll down" className="z-1">
                <div className="pb-4 border-2 rounded-full w-24 h-24 flex justify-center items-center backdrop-blur-[2px]">
                    <ChevronsDown className="text-background animate-bounce mt-4" />
                </div>
            </Link>
        </section>
    );
}
