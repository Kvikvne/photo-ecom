import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/nav-bar";
import { Footer } from "@/components/navigation/footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    metadataBase: new URL("https://www.kvikvne.com/"),
    title: "KVIKVNE | Fine Photography Prints",
    description:
        "Transform your space with KVIKVNE — a curated collection of ocean, surf, and beach photography from Kauai. Premium canvas and fine art prints available.",
    keywords: [
        "KVIKVNE",
        "Ocean Photography",
        "Surf Art",
        "Beach Prints",
        "Canvas Prints",
        "Coastal Wall Art",
        "Kauai Photographer",
        "Hawaii Prints",
        "Fine Art Photography",
    ],
    icons: {
        icon: "/favicon-32x32.png",
    },
    openGraph: {
        title: "KVIKVNE | Ocean-Inspired Photography Prints",
        description:
            "Bring the calm and beauty of Kauai into your home with photography from KVIKVNE. Premium wall art for beach lovers and ocean souls.",
        url: "https://kvikvne.com",
        siteName: "KVIKVNE",
        images: [
            {
                url: "/og-home.png",
                width: 1200,
                height: 630,
                alt: "KVIKVNE Ocean Photography",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "KVIKVNE | Ocean-Inspired Photography Prints",
        description:
            "Curated photography prints capturing the soul of the sea. Explore KVIKVNE's ocean and surf art collection.",
        images: ["/og-home.png"],
    },
};

export default function StoreLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
        </>
    );
}
