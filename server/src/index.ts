import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

// CRON
import "./scripts/worker";

// DB
import { connectToMongoDB } from "./db/mongoose";

// Middleware
import { assignSessionId } from "./middleware/sessionId";

// Webhooks
import webhookHandler from "./webhooks/stripeWebhook";
import { printifyWebhookHandler } from "./webhooks/printifyWebhook";

// Routes
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import checkoutRoutes from "./routes/checkoutRoutes";
import orderRoutes from "./routes/orderRoutes";
import emailRoutes from "./routes/emailRoutes";
import contactRoutes from "./routes/contactRoutes";

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

if (process.env.NODE_ENV === "production") {
    app.use(helmet());
} else {
    console.log("Running in development mode");
}

// Webhooks first (raw body required)
app.post(
    "/api/webhook/stripe",
    bodyParser.raw({ type: "application/json" }),
    webhookHandler
);
app.post("/api/webhook/printify", express.json(), printifyWebhookHandler);

// CORS middleware
app.use(
    cors({
        origin: CLIENT_URL,
        credentials: true,
    })
);

// General middleware
app.use(express.json());
app.use(cookieParser());
app.use(assignSessionId);

// App routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/contact", contactRoutes);

// Start server
connectToMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    });
});
