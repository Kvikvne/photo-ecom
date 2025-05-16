"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const carouselItems = [
    {
        image: "/Oceanic.JPG",
        name: "Oceanic",
        link: "/",
    },
    {
        image: "/SheetGlass.jpg",
        name: "Sheet Glass",
        link: "/",
    },
];

export function ImgCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 6000, stopOnInteraction: true })
    );

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-3xl"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
                align: "start",
                loop: true,
            }}
        >
            <CarouselContent>
                {carouselItems.map((photo, idx) => (
                    <CarouselItem key={idx}>
                        <Image
                            className="rounded-sm w-full"
                            height={1000}
                            width={1000}
                            src={photo.image}
                            alt={photo.name}
                        />
                        <Button
                            variant={"outline"}
                            className="cursor-pointer bg-transparent mt-4 hover:border-accent"
                        >
                            View {photo.name}
                        </Button>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="text-foreground border-0" />
            <CarouselNext className="text-foreground border-0" />
        </Carousel>
    );
}
