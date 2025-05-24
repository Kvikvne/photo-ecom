import express from "express";
import { postEmail } from "../controllers/emailController";

const router = express.Router();

router.post("/sub", postEmail);

export default router;
