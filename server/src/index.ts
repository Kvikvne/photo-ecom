import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

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
import authRoutes from "./admin/routes/authRoutes";
import adminProductsRoutes from "./admin/routes/productRoutes";

const app = express();
const PORT = parseInt(process.env.PORT || "5000", 10);
const CORS_ORIGIN = process.env.CORS_ORIGIN;

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
    origin: CORS_ORIGIN,
    credentials: true
  })
);

// General middleware
app.use(express.json());
app.use(cookieParser());
app.use(assignSessionId);
app.set("trust proxy", 1);

// App routes
app.use(authRoutes);
app.use("/admin/products", adminProductsRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/contact", contactRoutes);

// Start server
connectToMongoDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);

    // Start worker after DB and server are both ready
    if (process.env.ENABLE_INLINE_CRON === "true") {
      (async () => {
        try {
          await import("./scripts/nodeWorker");
          console.log("CRON Worker initialized.");
        } catch (err) {
          console.error("Failed to start CRON Worker:", err);
        }
      })();
    }
  });
});
