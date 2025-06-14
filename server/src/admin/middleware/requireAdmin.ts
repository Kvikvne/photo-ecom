import { Request, Response, NextFunction } from "express";
import { verifyAdminToken } from "../utils/jwt";

export const requireAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid token" });
    }

    try {
        const token = authHeader.split(" ")[1];
        const payload = verifyAdminToken(token);
        (req as any).admin = payload;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Token verification failed" });
    }
};
