import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About KVIKVNE",
    description:
        "Discover the story behind KVIKVNE — a print brand inspired by the surf, ocean, and coastline of Kauai. Learn more about our vision and values.",
    metadataBase: new URL("https://kvikvne.com"),
    openGraph: {
        title: "About KVIKVNE",
        description:
            "Discover the story behind KVIKVNE — a print brand inspired by the surf, ocean, and coastline of Kauai. Learn more about our vision and values.",
        url: "https://kvikvne.com/about",
        siteName: "KVIKVNE",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About KVIKVNE",
        description:
            "Learn the story behind KVIKVNE — from the waves of Kauai to premium wall art for your home.",
    },
};

export default function AboutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className="container mx-auto py-16">{children}</div>
        </main>
    );
}
