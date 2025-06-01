import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

export function assignSessionId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const existingSessionId = req.cookies?.sessionId;

    if (!existingSessionId) {
        const newSessionId = uuidv4();
        res.cookie("sessionId", newSessionId, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === "true",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            sameSite: "lax",
        });
        req.sessionId = newSessionId;
    } else {
        req.sessionId = existingSessionId;
    }

    next();
}
