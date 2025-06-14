import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET!;
const EXPIRY = "4h";

interface AdminPayload {
    username: string;
}

export function signAdminToken(payload: AdminPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRY });
}

export function verifyAdminToken(token: string): AdminPayload {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
}
