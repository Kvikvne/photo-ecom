import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { signAdminToken } from "../utils/jwt";

export const loginHandler = (req: Request, res: Response) => {
    const { username, password } = req.body;

    const expectedUsername = process.env.ADMIN_USERNAME;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!expectedUsername || !passwordHash) {
        console.error("Missing admin credentials in env");
        res.status(500).json({ error: "Server misconfigured" });
        return;
    }

    const isUsernameValid = username === expectedUsername;
    const isPasswordValid = bcrypt.compareSync(password, passwordHash);

    if (!isUsernameValid || !isPasswordValid) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
    }

    const token = signAdminToken({ username });
    res.json({ token });
    return;
};
