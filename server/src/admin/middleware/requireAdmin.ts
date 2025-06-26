import { Request, Response, NextFunction } from "express";
import { verifyAdminToken } from "../utils/jwt";

export function requireAdminAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.adminToken;

  if (!token) {
    res.status(401).json({ message: "Missing authentication token" });
    return;
  }

  const payload = verifyAdminToken(token);

  if (!payload) {
    res.status(401).json({ message: "Unauthorized or token expired" });
    return;
  }

  next();
}
