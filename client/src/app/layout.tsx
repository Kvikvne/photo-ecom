import { Analytics } from "@vercel/analytics/next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"]
});
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable}  antialiased`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
