import dotenv from "dotenv";
import { connectToMongoDB } from "../db/mongoose";
import { Order } from "../models/order";
import { sendToPrintify, getPrintifyOrder } from "../services/printifyService";
import { sendConfirmationEmailDev } from "../services/emailService";

dotenv.config();

/**
 * This function is for CRON workers
 * It scans the DB for paid orders and send them to Printify.
 * Then it marks the order as confirmed and sends an email to the customer.
 */

export async function fulfillPendingOrders() {
  await connectToMongoDB();

  const paidOrders = await Order.find({ status: "paid" });

  if (paidOrders.length === 0) {
    console.log("No paid orders to confirm.");
  }

  for (const order of paidOrders) {
    try {
      console.log(`[ORDER ${order._id}] Sending to Printify...`);
      const printifyOrderId = await sendToPrintify(order);
      console.log(`[ORDER ${order._id}] Printify ID: ${printifyOrderId}`);

      console.log(`[ORDER ${order._id}] Fetching Printify details...`);
      const printifyData = await getPrintifyOrder(printifyOrderId);

      order.status = "confirmed";
      order.printifyOrderId = printifyOrderId;
      order.fulfilledAt = new Date();
      order.error = null; // clear any previous error

      // Optional enriched fields:
      order.trackingUrl = printifyData.printify_connect?.url || null;
      order.printifyStatus = printifyData.status;
      order.printifySyncedAt = new Date();

      console.log(`[ORDER ${order._id}] Saving order as confirmed...`);
      await order.save();

      console.log(`[ORDER ${order._id}] Saved status: ${order.status}`);
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
      console.error(
        `[ORDER ${order._id}] Error thrown, setting to failed:`,
        err.message
      );
      order.status = "failed";
      order.error = err.message;
      await order.save();
      console.log(
        `[ORDER ${order._id}] Marked as failed with error: ${order.error}`
      );
    }
  }
}
