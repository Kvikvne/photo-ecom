import cron from "node-cron";
import { fulfillPendingOrders } from "./fulfillOrders";

export async function startWorker() {
    console.log("🔁 Order fulfillment worker started.");

    cron.schedule("*/2 * * * *", async () => {
        console.log("🕑 Running scheduled fulfillment job...");
        await fulfillPendingOrders();
    });
}
