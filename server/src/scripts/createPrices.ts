import { syncExistingPrintifyProductsToStripe } from "../services/createPrices";

(async () => {
  try {
    await syncExistingPrintifyProductsToStripe();
    process.exit(0);
  } catch (err) {
    console.error("Script failed:", err);
    process.exit(1);
  }
})();
