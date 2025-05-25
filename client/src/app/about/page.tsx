import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import AboutImage from "@/assets/images/about.jpg";

export default function About() {
    return (
        <>
            <h1 className="text-6xl font-bold">About me</h1>

            <Card className=" mx-auto mt-12 max-w-5xl">
                {/* <CardHeader>
                    <CardTitle className="text-5xl">About me</CardTitle>
                </CardHeader> */}
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
                        <p>
                            I am passionate about capturing the beauty of the
                            world through my lense and bringing those moments to
                            life in your living space. I specialize in
                            high-quality wall prints of stunning ocean waves and
                            mesmerizing nature scenes, meticulously curated to
                            elevate any room's ambiance. My journey began with a
                            simple fascination for photography and a deep-rooted
                            love for exploring the world's wonders. Over the
                            years, I've honed my craft, mastering the art of
                            composition, lighting, and storytelling through
                            every click of the shutter. Each print in my
                            collection is a testament to my dedication to
                            capturing the essence of my surroundings and sharing
                            it with you.
                        </p>
                        <Image
                            height={300}
                            width={300}
                            src={AboutImage}
                            alt="Me"
                            className="rounded-sm "
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="mt-4 space-y-4 ">
                        <p>
                            What sets me apart is not just my eye for aesthetics
                            but also my commitment to quality. We meticulously
                            select premium materials for my prints, ensuring
                            vibrant colors, sharp details, and long-lasting
                            durability. Whether you're seeking a serene
                            landscape to add tranquility to your bedroom or a
                            dynamic cityscape to inspire creativity in your
                            workspace, our prints are designed to evoke emotions
                            and spark imagination.
                        </p>
                        <p>
                            We're incredibly grateful for the opportunity to
                            share our passion with you and to be a part of your
                            journey in creating a space that reflects your
                            unique style and personality. Thank you for visiting
                            my gallery, where every print tells a story, and
                            every wall becomes a canvas for adventure. Explore
                            my collection today and let my prints transform your
                            space.
                        </p>
                        <p>
                            With gratitude,
                            <br /> Kai
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}
