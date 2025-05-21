import { RequestHandler } from "express";
import { Order } from "../models/order";

// /api/order/:orderId
export const getOrder: RequestHandler = async (req, res) => {
    const { orderId } = req.params;
    const sessionId = req.sessionId;

    if (!orderId) {
        res.status(404).json({ error: "missing session ID or order ID" });
        return;
    }

    const order = await Order.findById(orderId);

    if (!order) {
        res.status(404).json({ error: "Order not found" });
        return;
    }

    const { _id, status, lineItems, createdAt, fulfilledAt } = order;

    res.status(200).json({
        order: {
            _id,
            status,
            lineItems,
            createdAt,
            fulfilledAt,
        },
    });
};
