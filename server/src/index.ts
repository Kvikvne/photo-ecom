import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Route imports
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";

// DB
import { connectToMongoDB } from "./db/mongoose";
import cookieParser from "cookie-parser";
import { assignSessionId } from "./middleware/sessionId";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(assignSessionId);

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;

connectToMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
