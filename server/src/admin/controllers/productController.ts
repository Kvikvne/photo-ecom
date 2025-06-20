import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { syncExistingPrintifyProductsToStripe } from "../../services/createPrices";

const productsPath = path.resolve(
  process.cwd(),
  "src/scripts/data/products.json"
);

export const postNewproduct = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body;

    // Validate basic shape (optional: more validation with zod or joi)
    if (!newProduct.title || !newProduct.blueprint_id || !newProduct.variants) {
      res.status(400).json({ error: "Invalid product format" });
      return;
    }

    const data = fs.readFileSync(productsPath, "utf-8");
    const products = JSON.parse(data);

    products.push(newProduct);

    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), "utf-8");

    res.status(200).json({ message: "Product added", products });
  } catch (err) {
    console.error("Failed to append product:", err);
    res.status(500).json({ error: "Failed to append product" });
  }
};

export const getProductsArray = (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(productsPath, "utf-8");
    const products = JSON.parse(data);

    res.status(200).json({ products });
  } catch (err) {
    console.error("Failed to read products.json:", err);
    res.status(500).json({ error: "Unable to load products." });
  }
};

export const createPrices = async (req: Request, res: Response) => {
  try {
    // Optionally require a secret or check JWT
    // if (
    //   req.headers.authorization !== `Bearer ${process.env.ADMIN_JWT_SECRET}`
    // ) {
    //   res.status(401).json({ error: "Unauthorized" });
    //   return;
    // }

    await syncExistingPrintifyProductsToStripe();
    res.status(200).json({ message: "Sync successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Sync failed" });
  }
};
