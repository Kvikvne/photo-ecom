import { Router } from "express";
import {
  postNewproduct,
  getProductsArray,
  getPendingProductsArray,
  createPrices
} from "../controllers/productController";

const router = Router();

router.post("/queue", postNewproduct);
router.get("/get-queue", getPendingProductsArray);
router.get("/get-live", getProductsArray);
router.post("/create-prices", createPrices);

export default router;
