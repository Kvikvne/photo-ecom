import cron from "node-cron";
import { fulfillPendingOrders } from "./fulfillOrders";

// Run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
    console.log("Running fulfillment worker...");
    await fulfillPendingOrders();
});

// Keep process alive
console.log("Worker is running on interval...");
