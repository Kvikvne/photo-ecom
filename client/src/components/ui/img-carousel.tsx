"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";

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
        image: "https://images-api.printify.com/mockup/683a32f8372403cb7d0be794/91635/60397/family.jpg?camera_label=context-2",
        name: "Family",
        link: "/shop/683a32f8372403cb7d0be794",
    },
    {
        image: "https://images-api.printify.com/mockup/683a32f48cd7be7c3a056a37/91638/60481/emerald.jpg?camera_label=context-3",
        name: "Emerald",
        link: "/shop/683a32f48cd7be7c3a056a37",
    },
    {
        image: "https://images-api.printify.com/mockup/683a279e1ab41436080963ea/91653/60359/marine-leap.jpg?camera_label=context-1",
        name: "Marine Leap",
        link: "/shop/683a279e1ab41436080963ea",
    },
];

export function ImgCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 6000, stopOnInteraction: true })
    );

    const router = useRouter();

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-xl max-w-[85svw]"
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
                            className="rounded-sm"
                            height={800}
                            width={800}
                            src={photo.image}
                            alt={photo.name}
                        />
                        <Button
                            variant={"outline"}
                            className="cursor-pointer bg-transparent mt-4 hover:border-accent"
                            onClick={() => router.push(photo.link)}
                        >
                            View {photo.name}
                        </Button>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="text-foreground border-0 hidden md:visible" />
            <CarouselNext className="text-foreground border-0 hidden md:visible" />
        </Carousel>
    );
}
