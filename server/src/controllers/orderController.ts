import { RequestHandler } from "express";
import { Order } from "../models/order";
import { sendCanceledEmail } from "../services/emailService";
import {
    getPrintifyOrder,
    cancelPrintifyOrder,
} from "../services/printifyService";
import { stripe } from "../services/stripeService";

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
        trackingUrl,
        printifyStatus,
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
        trackingUrl,
        printifyStatus,
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
            trackingUrl,
            printifyStatus,
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
            trackingUrl,
            printifyStatus,
        };
    });

    res.status(200).json({ orders });
    return;
};

export const cancelOrder: RequestHandler = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }

        if (!order.printifyOrderId) {
            res.status(400).json({
                error: "No Printify order ID associated with this order",
            });
            return;
        }

        const printifyOrder = await getPrintifyOrder(order.printifyOrderId);

        if (printifyOrder.status === "canceled") {
            res.status(400).json({ error: "Order is already cancelled" });
            return;
        }

        const nonCancelableStatuses = [
            "sending-to-production",
            "in-production",
            "fulfilled",
            "partially-fulfilled",
        ];

        if (nonCancelableStatuses.includes(printifyOrder.status)) {
            res.status(400).json({
                error: `Cannot cancel order in '${printifyOrder.status}' state`,
            });
            return;
        }

        if (order.stripeRefundId) {
            res.status(400).json({
                error: "This order has already been refunded",
            });
            return;
        }

        if (!order.stripePaymentIntentId) {
            res.status(400).json({
                error: "No Stripe payment intent associated with this order",
            });
            return;
        }

        const cancelResponse = await cancelPrintifyOrder(order.printifyOrderId);

        let refund;

        try {
            refund = await stripe.refunds.create({
                payment_intent: order.stripePaymentIntentId,
            });
        } catch (stripeErr) {
            console.error("Stripe refund failed:", stripeErr);
            res.status(500).json({
                error: "Refund failed, order not cancelled",
            });
            return;
        }

        order.status = "canceled";
        order.printifyStatus = "canceled";
        order.stripeRefundId = refund.id;
        await order.save();

        await sendCanceledEmail(order);

        res.status(200).json({
            message: "Order cancelled and refunded successfully",
            order,
            printify: cancelResponse,
            refund,
        });
    } catch (error: any) {
        console.error("Error canceling order:", error);
        res.status(500).json({ error: "Failed to cancel order" });
    }
};
