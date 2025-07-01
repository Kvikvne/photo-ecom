import cron from "node-cron";
import { fulfillPendingOrders } from "./fulfillOrders";

console.log("Starting node-based CRON worker...");

cron.schedule("*/5 * * * *", async () => {
  console.log("[CRON] Running fulfillment at", new Date().toISOString());

  try {
    await fulfillPendingOrders();
    console.log("[CRON] Fulfillment completed");
  } catch (error: any) {
    console.error("[CRON ERROR]", error.message);
  }
});
