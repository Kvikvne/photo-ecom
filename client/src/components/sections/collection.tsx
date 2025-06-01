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
        link: "/shop/6838b0c7a2d0cb6edf0363d2",
    },
    {
        image: sheetGlass,
        name: "Sheet Glass",
        link: "/shop/683a29d9372403cb7d0be57c",
    },
    {
        image: emerald,
        name: "Emerald",
        link: "/shop/683a32f48cd7be7c3a056a37",
    },
    {
        image: family,
        name: "Family",
        link: "/shop/683a32f8372403cb7d0be794",
    },
    {
        image: paintedSky,
        name: "Painted Sky",
        link: "/shop/683a1f933ce89481aa03a6e5",
    },
    {
        image: hawaiianSun,
        name: "Hawaiian Sun",
        link: "/shop/683a28f2372403cb7d0be53c",
    },
    {
        image: emeraldTunnel,
        name: "Emerald Tunnel",
        link: "/shop/683a32e93b3af933b20c49e4",
    },
    {
        image: goldenSands,
        name: "Golden Sands",
        link: "/shop/683a33018cd7be7c3a056a3b",
    },
    {
        image: sunlitSurge,
        name: "Sunlit Surge",
        link: "/shop/683a32fb3a7f9a1e0409896a",
    },
    {
        image: tropicalSnow,
        name: "Tropical Snow",
        link: "/shop/683a32ec372403cb7d0be78e",
    },
    {
        image: marineLeap,
        name: "Marine Leap",
        link: "/shop/683a279e1ab41436080963ea",
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
