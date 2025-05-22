import express from "express";
import { getOrder, getAllOrders } from "../controllers/orderController";

const router = express.Router();

// Fetch a single order by orderId
router.get("/get/:orderId", getOrder);
// Fetch the latest order using sessionId
router.get("/", getOrder); // This is for the success page, using sessionId
// Attempts to fetch all orders using sessionId then wil need to fall back
// to using "/:orderId" route in client
router.get("/all", getAllOrders);

export default router;
