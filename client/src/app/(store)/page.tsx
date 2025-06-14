import Hero from "@/components/sections/hero";
import MyFavorites from "@/components/sections/my-favorites";
import Collection from "@/components/sections/collection";

export default function Home() {
    return (
        <main>
            <Hero />
            <MyFavorites />
            <Collection />
        </main>
    );
}
