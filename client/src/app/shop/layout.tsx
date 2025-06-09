import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://www.kvikvne.com"),
    title: "Shop Canvas & Fine Art Prints | KVIKVNE",
    description:
        "Explore ocean, surf, and beach photography prints from KVIKVNE. Premium canvas and fine art wall art crafted to elevate your space.",
    keywords: [
        "Ocean Prints",
        "Canvas Wall Art",
        "Beach Photography",
        "Surf Prints",
        "KVIKVNE Prints",
        "Fine Art Photography",
        "Kauai Photography",
        "Hawaii Wall Art",
        "Coastal Decor",
        "Buy Ocean Prints",
    ],
    openGraph: {
        title: "Shop Canvas & Fine Art Prints | KVIKVNE",
        description:
            "Bring home the beauty of the ocean. Browse KVIKVNE's collection of high-quality photography prints, available in canvas and fine art formats.",
        url: "https://kvikvne.com/shop/prints",
        siteName: "KVIKVNE",
        images: [
            {
                url: "/og-shop-prints.png",
                width: 1200,
                height: 630,
                alt: "Ocean and Surf Photography Prints",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Shop Canvas & Fine Art Prints | KVIKVNE",
        description:
            "Premium photography prints inspired by the ocean and surf. Discover KVIKVNE's canvas and fine art wall collections.",
        images: ["/og-shop-prints.png"],
    },
};

export default function StoreLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <main className="container mx-auto py-16">{children}</main>;
}
