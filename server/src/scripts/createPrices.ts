import { syncExistingPrintifyProductsToStripe } from "../services/createPrices";
/**
 * This is a stand alone script for now
 * If you already have products made on Printify this will sync them up with Stripe
 * and your DB.
 */

(async () => {
  try {
    await syncExistingPrintifyProductsToStripe();
    process.exit(0);
  } catch (err) {
    console.error("Script failed:", err);
    process.exit(1);
  }
})();
