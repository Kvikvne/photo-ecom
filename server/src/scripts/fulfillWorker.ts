import { fulfillPendingOrders } from "./fulfillOrders";

/**
 * IMPORTANT
 * This script is for a stand alone CRON worker an is to be ran seperatly from
 * the server instance. If you want to use node cron take a look at nodeWoker.ts
 * and configure it in index.ts
 *
 * Do not use both or else
 */

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
