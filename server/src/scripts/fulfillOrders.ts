import dotenv from "dotenv";
import { connectToMongoDB } from "../db/mongoose";
import { Order } from "../models/order";
import { sendToPrintify, getPrintifyOrder } from "../services/printifyService";
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
      const printifyData = await getPrintifyOrder(printifyOrderId);

      order.status = "confirmed";
      order.printifyOrderId = printifyOrderId;
      order.fulfilledAt = new Date();

      // Optional enriched fields:
      order.trackingUrl = printifyData.printify_connect?.url || null;
      order.printifyStatus = printifyData.status;
      order.printifySyncedAt = new Date();

      await order.save();

      try {
        await sendConfirmationEmailDev(order);
      } catch (emailErr: any) {
        console.error(
          `Order ${order._id} confirmed, but email failed:`,
          emailErr.message
        );
        // Don't overwrite confirmed status
      }

      console.log(`Confirmed and enriched order ${order._id}`);
      console.log(`Final saved status for order ${order._id}: ${order.status}`);
    } catch (err: any) {
      console.error(`Failed to confirm order ${order._id}:`, err.message);
      order.status = "failed";
      order.error = err.message;
      await order.save();
    }
  }
}
