import { fulfillPendingOrders } from "./fulfillOrders";

(async () => {
  console.log("[JOB] Fulfillment job started at", new Date().toISOString());

  try {
    await fulfillPendingOrders();
    console.log("[JOB] Fulfillment completed successfully.");
  } catch (error: any) {
    console.error("[JOB ERROR]", error.message);
    process.exit(1);
  }

  process.exit(0);
})();
