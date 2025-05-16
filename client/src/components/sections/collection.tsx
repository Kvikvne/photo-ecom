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

const gridItems = [
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
                <div className="grid w-full gap-4 px-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {gridItems.map((item, idx) => (
                        <Dialog>
                            <DialogContent className="min-w-fit">
                                <DialogHeader>
                                    <DialogTitle>{item.name}</DialogTitle>
                                    <DialogDescription>
                                        <Button>Shop {item.name}</Button>
                                    </DialogDescription>
                                </DialogHeader>
                                <Image
                                    height={1200}
                                    width={1200}
                                    className="max-w-full rounded-sm"
                                    alt={item.name}
                                    src={item.image}
                                />
                            </DialogContent>

                            <DialogTrigger asChild>
                                <div
                                    key={idx}
                                    className=" relative overflow-hidden rounded-xl hover:scale-102 duration-100 ease-in cursor-pointer"
                                >
                                    <Image
                                        height={1000}
                                        width={1000}
                                        className="max-w-full "
                                        alt={item.name}
                                        src={item.image}
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
