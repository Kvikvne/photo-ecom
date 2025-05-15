import dotenv from "dotenv";
import { connectToMongoDB } from "../db/mongoose";
import { Order } from "../models/order";
import { sendToPrintify } from "../services/printifyService";
import { sendConfirmationEmailDev } from "../services/emailService";

dotenv.config();

export async function fulfillPendingOrders() {
    await connectToMongoDB();

    const pendingOrders = await Order.find({ status: "pending" });

    if (pendingOrders.length === 0) {
        console.log("No pending orders to fulfill.");
    }

    for (const order of pendingOrders) {
        try {
            const printifyOrderId = await sendToPrintify(order);
            order.status = "fulfilled";
            order.printifyOrderId = printifyOrderId;
            order.fulfilledAt = new Date();
            await order.save();
            await sendConfirmationEmailDev(order);
            console.log(`Fulfilled order ${order._id}`);
        } catch (err: any) {
            console.error(`Failed to fulfill order ${order._id}:`, err.message);
            order.status = "failed";
            order.error = err.message;
            await order.save();
        }
    }
}
