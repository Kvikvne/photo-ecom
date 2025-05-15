import { RequestHandler } from "express";
import { Order } from "../models/order";
import { sendShippingEmail } from "../services/emailService";

export const printifyWebhookHandler: RequestHandler = async (req, res) => {
    const { type, data } = req.body;

    if (!type || !data?.id) {
        res.status(400).json({ error: "Invalid payload" });
    }

    try {
        const order = await Order.findOne({ printifyOrderId: data.id });

        if (!order) {
            console.warn("Webhook for unknown order: data.id");
            res.status(404).json({ error: "Order not found" });
            return;
        }

        if (type === "order:shipped") {
            order.status = "shipped";
            order.shippedAt = new Date();

            const tracking = data.fulfillments?.[0];
            if (tracking?.tracking_url) {
                order.trackingUrl = tracking.tracking_url;
                await sendShippingEmail(order, tracking.tracking_url);
            }
        } else if (type === "order:delivered") {
            order.status = "delivered";
            order.deliveredAt = new Date();
        }

        await order.save();
        res.status(200).json({ received: true });
    } catch (err) {
        console.error("Failed to process webhook:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
