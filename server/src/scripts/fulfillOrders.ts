import dotenv from "dotenv";
import { connectToMongoDB } from "../db/mongoose";
import { Order } from "../models/order";
import { sendToPrintify } from "../services/printifyService";
import { sendConfirmationEmailDev } from "../services/emailService";

dotenv.config();

export async function fulfillPendingOrders() {
    await connectToMongoDB();

    const paidOrders = await Order.find({ status: "paid" });

    if (paidOrders.length === 0) {
        console.log("No paid orders to confirm.");
    }

    for (const order of paidOrders) {
        try {
            const printifyOrderId = await sendToPrintify(order);
            order.status = "confirmed";
            order.printifyOrderId = printifyOrderId;
            order.fulfilledAt = new Date();
            await order.save();
            await sendConfirmationEmailDev(order);
            console.log(`Confirmed order ${order._id}`);
        } catch (err: any) {
            console.error(`Failed to confirm order ${order._id}:`, err.message);
            order.status = "failed";
            order.error = err.message;
            await order.save();
        }
    }
}
