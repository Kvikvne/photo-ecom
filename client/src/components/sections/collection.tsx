import { Button } from "../ui/button";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import oceanic from "@/assets/images/oceanic.jpg";
import sheetGlass from "@/assets/images/sheet-glass.jpg";
import emerald from "@/assets/images/emerald.jpg";
import family from "@/assets/images/family.jpg";
import paintedSky from "@/assets/images/painted-sky.jpg";
import hawaiianSun from "@/assets/images/hawaiian-sun.jpg";
import emeraldTunnel from "@/assets/images/emerald-tunnel.jpg";
import goldenSands from "@/assets/images/golden-sands.jpg";
import sunlitSurge from "@/assets/images/sunlit-surge.jpg";
import tropicalSnow from "@/assets/images/tropical-snow.jpg";
import marineLeap from "@/assets/images/marine-leap.jpg";
import Link from "next/link";

const gridItems = [
    {
        image: oceanic,
        name: "Oceanic",
        link: "/shop/65c53b0224b6d9777f0ffb58",
    },
    {
        image: sheetGlass,
        name: "Sheet Glass",
        link: "/shop/65c559ec511eb82d320116fa",
    },
    {
        image: emerald,
        name: "Emerald",
        link: "/shop/65c54e726a56e47eba094950",
    },
    {
        image: family,
        name: "Family",
        link: "/shop/65c5535bc55f04117f02cd7b",
    },
    {
        image: paintedSky,
        name: "Painted Sky",
        link: "/shop/65c55f164ba9341a6d081ef4",
    },
    {
        image: hawaiianSun,
        name: "Hawaiian Sun",
        link: "/shop/65c55b04688e99f9a001907b",
    },
    {
        image: emeraldTunnel,
        name: "Emerald Tunnel",
        link: "/shop/65c55855800827daf10c139f",
    },
    {
        image: goldenSands,
        name: "Golden Sands",
        link: "/shop/65c552364d795c018c0c9a9e",
    },
    {
        image: sunlitSurge,
        name: "Sunlit Surge",
        link: "/shop/65c5508098398742140348fd",
    },
    {
        image: tropicalSnow,
        name: "Tropical Snow",
        link: "/shop/65c556ece943e035240e3e8e",
    },
    {
        image: marineLeap,
        name: "Marine Leap",
        link: "/shop/65c55cb2833a332c6d0bc39a",
    },
];

export default function Collection() {
    return (
        <section id="collection">
            <div className="py-16 px-8">
                <div>
                    <div className="flex items-center gap-4">
                        <h3 className="text-6xl font-bold">Collection</h3>
                        <Button asChild>
                            <Link href="/shop/prints">Shop prints</Link>
                        </Button>
                    </div>
                    <p>
                        Discover Captivating Moments: Explore Our Stunning
                        Collection of Photography
                    </p>
                </div>
                <div className="grid w-full gap-2 px-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {gridItems.map((item, idx) => (
                        <Dialog key={idx}>
                            <DialogContent className="bg-background min-w-fit">
                                <DialogHeader>
                                    <DialogTitle>{item.name}</DialogTitle>
                                    <DialogDescription>
                                        <Button asChild>
                                            <Link href={item.link}>
                                                Shop {item.name}
                                            </Link>
                                        </Button>
                                    </DialogDescription>
                                </DialogHeader>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full max-h-[80svh] rounded-md"
                                />
                            </DialogContent>

                            <DialogTrigger asChild>
                                <div
                                    key={idx}
                                    className="h-64 w-fit relative overflow-hidden rounded-sm flex items-center justify-center  hover:scale-102 duration-100 ease-in cursor-pointer"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        className="object-cover h-full w-auto"
                                    />
                                </div>
                            </DialogTrigger>
                        </Dialog>
                    ))}
                </div>
            </div>
        </section>
    );
}
