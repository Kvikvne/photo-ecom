import { Router } from "express";
import { loginHandler } from "../controllers/authController";
import { requireAdminAuth } from "../middleware/requireAdmin";

const router = Router();

router.post("/admin/login", loginHandler);
router.get("/admin/verify", requireAdminAuth, (req, res) => {
  res.status(200).json({ authenticated: true });
});

export default router;
