import { RequestHandler } from "express";
import { Order } from "../models/order";

// /api/order/:orderId
export const getOrder: RequestHandler = async (req, res) => {
    const sessionId = req.sessionId;
    const orderId = req.params.orderId;

    let order;

    if (!orderId) {
        // If no orderId is provided, use sessionId for fetch lateset order
        if (!sessionId) {
            res.status(404).json({ error: "Missing session ID" });
            return;
        }
        // Find the latest order for the sessionId
        order = await Order.findOne({ sessionId }).sort({
            createdAt: -1,
        });
    } else {
        // If orderId is provided, find a single order by orderId
        order = await Order.findById(orderId);
    }

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

export const getAllOrders: RequestHandler = async (req, res) => {
    const sessionId = req.sessionId;

    let orders;

    const ordersData = await Order.find({ sessionId }).sort({
        createdAt: -1,
    });

    orders = ordersData.map((order) => {
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
        return {
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
        };
    });

    res.status(200).json({ orders });
    return;
};
