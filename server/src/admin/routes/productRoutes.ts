import { Router } from "express";
import {
  postNewproduct,
  getProductsArray,
  createPrices
} from "../controllers/productController";

const router = Router();

router.post("/queue", postNewproduct);
router.get("/get-queue", getProductsArray);
router.post("/create-prices", createPrices);

export default router;
