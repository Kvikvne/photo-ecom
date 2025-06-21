// Force a consistent timezone
process.env.TZ = "UTC";

import cron from "node-cron";
import { fulfillPendingOrders } from "./fulfillOrders";

// Sanity check for system date
const now = new Date();
if (isNaN(now.getTime())) {
  console.error("Invalid system date:", now);
  process.exit(1);
}

// Run every 5 minutes
try {
  cron.schedule("*/5 * * * *", async () => {
    console.log(
      "[CRON] Running fulfillment worker at",
      new Date().toISOString()
    );
    await fulfillPendingOrders();
  });
} catch (error) {
  console.error("[CRON ERROR] Failed to initialize scheduled task:", error);
}

// Keep process alive
console.log("Worker is running on interval...");
