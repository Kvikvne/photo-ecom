import { Router } from "express";
import {
  postNewproduct,
  getProductsArray
} from "../controllers/productController";

const router = Router();

router.post("/queue", postNewproduct);
router.get("/get-queue", getProductsArray);

export default router;
