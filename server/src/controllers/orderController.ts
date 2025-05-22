import { RequestHandler } from "express";
import { Order } from "../models/order";

// /api/order/:orderId
export const getOrder: RequestHandler = async (req, res) => {
    const { orderId } = req.params;
    const sessionId = req.sessionId;

    if (!sessionId) {
        res.status(404).json({ error: "missing session ID or order ID" });
        return;
    }

    const order = await Order.findOne({ sessionId: sessionId }).sort({
        updatedAt: -1,
    });

    if (!order) {
        res.status(404).json({ error: "Order not found" });
        return;
    }

    const {
        _id,
        status,
        lineItems,
        createdAt,
        fulfilledAt,
        addressTo,
        subtotalInCents,
        shippingInCents,
        taxInCents,
        totalAmountPaidInCents,
    } = order;

    res.status(200).json({
        _id,
        status,
        lineItems,
        addressTo,
        createdAt,
        fulfilledAt,
        subtotalInCents,
        shippingInCents,
        taxInCents,
        totalAmountPaidInCents,
    });
};
