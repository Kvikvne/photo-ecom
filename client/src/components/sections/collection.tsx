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

const gridItems = [
    {
        image: oceanic,
        name: "Oceanic",
        link: "/",
    },
    {
        image: sheetGlass,
        name: "Sheet Glass",
        link: "/",
    },
    {
        image: emerald,
        name: "Emerald",
        link: "/",
    },
    {
        image: family,
        name: "Family",
        link: "/",
    },
    {
        image: paintedSky,
        name: "Painted Sky",
        link: "/",
    },
    {
        image: hawaiianSun,
        name: "Hawaiian Sun",
        link: "/",
    },
    {
        image: emeraldTunnel,
        name: "Emerald Tunnel",
        link: "/",
    },
    {
        image: goldenSands,
        name: "Golden Sands",
        link: "/",
    },
    {
        image: sunlitSurge,
        name: "Sunlit Surge",
        link: "/",
    },
    {
        image: tropicalSnow,
        name: "Tropical Snow",
        link: "/",
    },
    {
        image: marineLeap,
        name: "Marine Leap",
        link: "/",
    },
];

export default function Collection() {
    return (
        <section id="collection">
            <div className="py-16 px-8">
                <div>
                    <div className="flex items-center gap-4">
                        <h3 className="text-6xl font-bold">Collection</h3>
                        <Button>Shop prints</Button>
                    </div>
                    <p>
                        Discover Captivating Moments: Explore Our Stunning
                        Collection of Photography
                    </p>
                </div>
                <div className="grid w-full gap-2 px-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {gridItems.map((item, idx) => (
                        <Dialog>
                            <DialogContent className="bg-background min-w-fit">
                                <DialogHeader>
                                    <DialogTitle>{item.name}</DialogTitle>
                                    <DialogDescription>
                                        <Button>Shop {item.name}</Button>
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
