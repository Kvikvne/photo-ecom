import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import { getAllProducts } from "../services/printifyService";

async function run() {
    try {
        const products = await getAllProducts();

        const baseUrl = process.env.CLIENT_URL;

        const urls = products
            .map((product: { id: string }) => {
                return `
  <url>
    <loc>${baseUrl}/shop/${product.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
            })
            .join("");

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/shop/prints</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${urls}
</urlset>`;

        const filePath = path.join(
            __dirname,
            "../../../client/public/sitemap.xml" // adjust if needed
        );

        fs.writeFileSync(filePath, sitemap, "utf8");
        console.log("Sitemap generated successfully");
    } catch (err) {
        console.error("Sitemap generation failed", err);
    }
}

run();
