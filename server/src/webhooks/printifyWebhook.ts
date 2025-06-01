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
        return;
    }

    try {
        const order = await Order.findOne({ printifyOrderId: resource.id });

        if (!order) {
            console.warn("Webhook for unknown order:", resource.id);
            res.status(404).json({ error: "Order not found" });
            return;
        }

        if (type === "order:shipment:created") {
            order.status = "shipped";
            order.shippedAt = new Date();

            const trackingUrl = resource.shipments?.[0]?.tracking_url || null;

            if (trackingUrl) {
                order.trackingUrl = trackingUrl;
                try {
                    await sendShippingEmail(order, trackingUrl);
                } catch (emailErr) {
                    console.error("Failed to send shipping email:", emailErr);
                }
            }
        }

        if (type === "order:shipment:delivered") {
            order.status = "delivered";
            order.deliveredAt = new Date();

            const trackingUrl = resource.shipments?.[0]?.tracking_url || null;

            if (trackingUrl) {
                order.trackingUrl = trackingUrl;
                try {
                    await sendDeliveredEmail(order, trackingUrl);
                } catch (emailErr) {
                    console.error("Failed to send delivered email:", emailErr);
                }
            }
        }

        await order.save();
        res.status(200).json({ received: true });
        return;
    } catch (err) {
        console.error("Failed to process webhook:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};
