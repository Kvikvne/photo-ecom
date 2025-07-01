import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | KVIKVNE",
  description:
    "Have a question or need help with your order? Reach out to us directly—we're here to help with prints, shipping, or anything else.",
  metadataBase: new URL("https://kvikvne.com"),
  openGraph: {
    title: "Contact Us | KVIKVNE",
    description:
      "Have a question or need help with your order? Reach out to us directly—we're here to help with prints, shipping, or anything else.",
    url: "https://kvikvne.com/contact",
    siteName: "KVIKVNE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact KVIKVNE",
    description:
      "Need support or have questions? Contact us for order help, shipping info, or general inquiries."
  }
};

export default function ContactLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto py-18 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="">{children}</div>
    </main>
  );
}
