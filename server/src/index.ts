import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { startWorker } from "./scripts/worker";

// Route imports
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import checkoutRoutes from "./routes/checkoutRoutes";

// DB
import { connectToMongoDB } from "./db/mongoose";
import cookieParser from "cookie-parser";
import { assignSessionId } from "./middleware/sessionId";

//webhook
import webhookHandler from "./webhooks/stripeWebhook";

const app = express();

// Webhook
app.post(
    "/api/webhook",
    bodyParser.raw({ type: "application/json" }),
    webhookHandler
);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(assignSessionId);

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

const PORT = process.env.PORT || 5000;

connectToMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        startWorker();
    });
});
