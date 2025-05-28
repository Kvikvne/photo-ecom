import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import AboutImage from "@/assets/images/about.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
    return (
        <div className="max-w-[60svw] mx-auto">
            <h1 className="text-6xl font-bold text-center mb-12">About me</h1>

            <div className="flex gap-12 items-center justify-between mb-12">
                <p className="max-w-xl">
                    Hey, I'm Kai. I'm a software engineer by day and a
                    photographer by heart. This site is a personal project that
                    brings both of those worlds together—code and creativity.
                    What started as a simple love for light, nature, and
                    exploring the world through a lens turned into a way to
                    share the stillness and awe I find in those places. I focus
                    on ocean waves, landscapes, and natural scenes that tell a
                    story or capture a feeling. Every print you see here was
                    photographed, selected, and prepared by me, with the hope
                    that it brings a little peace or inspiration into your
                    space. Thanks for being here—it means a lot.
                </p>
                <Image
                    src={AboutImage}
                    alt="Portrait of Kai"
                    height={400}
                    width={400}
                    className="rounded-full shadow-lg object-cover"
                />
            </div>

            <div className="mt-4 space-y-4 ">
                <p>
                    What makes this project special to me isn't just the
                    photography—it's the intention behind it. As someone who
                    spends most days writing code, this space became a way for
                    me to slow down, create with my hands and eyes, and connect
                    with others through the natural world. Every print is
                    carefully chosen, edited, and printed using premium
                    materials to make sure the colors pop, the details stay
                    sharp, and the moment lasts.
                </p>
                <p>
                    Whether you're looking for something calm to bring a sense
                    of peace to your space or something bold that sparks
                    inspiration, I hope these prints speak to you the way the
                    scenes spoke to me. Thanks so much for visiting and being
                    part of this. Every order supports my craft—and helps keep
                    this passion alive.
                </p>
                <p className="mt-8 italic text-muted-foreground">
                    With gratitude,
                </p>
                <p className="text-xl font-semibold">Kai</p>
            </div>
            <Button asChild className="mt-6">
                <Link href="/shop/prints">Explore the Collection</Link>
            </Button>
        </div>
    );
}
