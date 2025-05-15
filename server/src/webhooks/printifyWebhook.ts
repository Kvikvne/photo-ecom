import { RequestHandler } from "express";
import { Order } from "../models/order";
import {
    sendShippingEmail,
    sendDeliveredEmail,
} from "../services/emailService";

export const printifyWebhookHandler: RequestHandler = async (req, res) => {
    const { type, resource } = req.body;

    if (!type || !resource?.id) {
        res.status(400).json({ error: "Invalid payload" });
    }

    try {
        const order = await Order.findOne({ printifyOrderId: resource.id });

        if (!order) {
            console.warn("Webhook for unknown order: data.id");
            res.status(404).json({ error: "Order not found" });
            return;
        }

        if (type === "order:shipment:created") {
            order.status = "shipped";
            order.shippedAt = new Date();

            const tracking = resource.data.carrier;
            if (tracking?.tracking_url) {
                order.trackingUrl = tracking.tracking_url;
                await sendShippingEmail(order, tracking.tracking_url);
            }
        } else if (type === "order:shipment:delivered") {
            const tracking = resource.data.carrier;
            order.status = "delivered";
            order.deliveredAt = new Date();
            if (tracking?.tracking_url) {
                order.trackingUrl = tracking.tracking_url;
                await sendDeliveredEmail(order, tracking.tracking_url);
            }
        }

        await order.save();
        res.status(200).json({ received: true });
    } catch (err) {
        console.error("Failed to process webhook:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
