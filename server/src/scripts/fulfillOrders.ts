// scripts/fulfillOrders.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectToMongoDB } from "../db/mongoose";
import { Order } from "../models/order";
import { sendToPrintify } from "../services/printifyService";

dotenv.config();

async function fulfillPendingOrders() {
    await connectToMongoDB();

    const pendingOrders = await Order.find({ status: "pending" });

    if (pendingOrders.length === 0) {
        console.log("No pending orders to fulfill.");
        return process.exit(0);
    }

    for (const order of pendingOrders) {
        try {
            const printifyOrderId = await sendToPrintify(order);
            order.status = "fulfilled";
            order.printifyOrderId = printifyOrderId;
            order.fulfilledAt = new Date();
            await order.save();
            console.log(`Fulfilled order ${order._id}`);
        } catch (err: any) {
            console.error(`Failed to fulfill order ${order._id}:`, err.message);
            order.status = "failed";
            order.error = err.message;
            await order.save();
        }
    }

    process.exit(0);
}

fulfillPendingOrders();
