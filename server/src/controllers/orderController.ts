import { RequestHandler } from "express";
import { Order } from "../models/order";
import { sendCanceledEmail } from "../services/emailService";
import {
    getPrintifyOrder,
    cancelPrintifyOrder,
} from "../services/printifyService";
import { stripe } from "../services/stripeService";

// ─────────────────────────────────────────────
// GET /api/order/:orderId (or fallback to sessionId)
// Returns a specific order by ID or latest by sessionId
// ─────────────────────────────────────────────
export const getOrder: RequestHandler = async (req, res) => {
    const sessionId = req.sessionId;
    const orderId = req.params.orderId;

    let order;

    if (!orderId) {
        // No orderId provided: fallback to latest order by session
        if (!sessionId) {
            res.status(404).json({ error: "Missing session ID" });
            return;
        }
        // Find latest order from session
        order = await Order.findOne({ sessionId }).sort({
            createdAt: -1,
        });
    } else {
        // Find by specific order ID
        order = await Order.findById(orderId);
    }

    if (!order) {
        res.status(404).json({ error: "Order not found" });
        return;
    }

    // Return minimal necessary fields
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

// ─────────────────────────────────────────────
// GET /api/orders/all
// Returns all orders for a session
// ─────────────────────────────────────────────
export const getAllOrders: RequestHandler = async (req, res) => {
    const sessionId = req.sessionId;

    let orders;

    const ordersData = await Order.find({ sessionId }).sort({
        createdAt: -1,
    });

    // Map to clean structure
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

// ─────────────────────────────────────────────
// Validation helpers for cleaner logic
// ─────────────────────────────────────────────

/**
 * Throws an error if the given value is falsy
 */
function ensure<T>(
    value: T,
    message: string,
    status = 400
): asserts value is NonNullable<T> {
    if (!value) {
        const err = new Error(message) as any;
        err.status = status;
        throw err;
    }
}

/**
 * Throws an error if the value is in a list of disallowed values
 */
function ensureNotIncluded(
    value: string,
    disallowed: string[],
    message: string,
    status = 400
) {
    if (disallowed.includes(value)) {
        const err = new Error(message) as any;
        err.status = status;
        throw err;
    }
}

// ─────────────────────────────────────────────
// POST /api/orders/cancel-order/:orderId
// Cancels a Printify order and refunds via Stripe
// ─────────────────────────────────────────────
export const cancelOrder: RequestHandler = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        // Fetch order and validate
        const order = await Order.findById(orderId);
        ensure(order, "Order not found", 404);
        ensure(
            order.printifyOrderId,
            "No Printify order ID associated with this order"
        );

        ensure(!order.stripeRefundId, "This order has already been refunded");
        ensure(
            order.stripePaymentIntentId,
            "No Stripe payment intent associated with this order"
        );

        // Verify current status from Printify
        const printifyOrder = await getPrintifyOrder(order.printifyOrderId);
        ensure(
            printifyOrder.status !== "canceled",
            "Order is already cancelled"
        );

        ensureNotIncluded(
            printifyOrder.status,
            [
                "sending-to-production",
                "in-production",
                "fulfilled",
                "partially-fulfilled",
            ],
            `Cannot cancel order in '${printifyOrder.status}' state`
        );

        // Cancel order on Printify
        const cancelResponse = await cancelPrintifyOrder(order.printifyOrderId);

        // Refund customer via Stripe
        let refund;
        try {
            refund = await stripe.refunds.create({
                payment_intent: order.stripePaymentIntentId,
            });
        } catch (stripeErr) {
            console.error("Stripe refund failed:", stripeErr);
            throw new Error("Refund failed, order not cancelled");
        }

        // Update local order state
        order.status = "canceled";
        order.printifyStatus = "canceled";
        order.stripeRefundId = refund.id;
        await order.save();

        // Send cancellation email
        await sendCanceledEmail(order);

        // Success response
        res.status(200).json({
            message: "Order cancelled and refunded successfully",
            order,
            printify: cancelResponse,
            refund,
        });
    } catch (err: any) {
        console.error("Error canceling order:", err.message);

        res.status(err.status || 500).json({
            error: err.message || "Failed to cancel order",
        });
    }
};
