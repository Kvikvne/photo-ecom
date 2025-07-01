import cron from "node-cron";
import { fulfillPendingOrders } from "./fulfillOrders";

/**
 * Node cron worker to be ran in the server. Use this carfully as I have run into
 * issues with production envs. I recommend using this for staging and local dev
 * and using the stand alone worker (fulfillWorker.ts) for prod
 */

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
