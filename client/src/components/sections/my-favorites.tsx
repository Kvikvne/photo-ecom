import { ChevronsDown } from "lucide-react";
import Link from "next/link";
import { ImgCarousel } from "@/components/ui/img-carousel";

export default function MyFavorites() {
    return (
        <section
            id="fav"
            className="bg-primary text-background min-h-[calc(100vh-88px)]"
        >
            <div className="container mx-auto py-16 px-8 md:px-0">
                <div>
                    <p className="text-2xl">My favorites.</p>
                    <h2 className="text-5xl">Inspire through Imagery</h2>
                </div>
                <div className="flex justify-center flex-wrap gap-26 mt-12">
                    <div>
                        <ImgCarousel />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-12 max-w-lg">
                        <p className="text-lg">
                            Photography is the art of capturing moments,
                            emotions, and the beauty of our world through the
                            lens of a camera. My photography collection is a
                            visual journey that showcases the wonders of life,
                            from the grand landscapes to the smallest details.
                            With each click of the shutter, we aim to freeze
                            time and immortalize the essence of every scene.
                        </p>
                        <Link
                            href="#collection"
                            aria-label="Scroll down"
                            className="z-1"
                        >
                            <div className="pb-4 border-2 rounded-full w-24 h-24 flex justify-center items-center backdrop-blur-[2px]">
                                <ChevronsDown className="text-background animate-bounce mt-4" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
