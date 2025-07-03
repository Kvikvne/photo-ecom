"use client";

import { useState } from "react";
import NewPrintifyProductForm from "@/components/admin/new-printify-product-form";
import ProductsJsonViewer from "@/components/admin/products-json-viewer";
import ActiveProductViewer from "@/components/admin/active-product-viewer";
import { SyncPrintifyButton } from "@/components/admin/sync-products-btn";

export default function CreateNewPProduct() {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1); // Forces re-render of viewers
  };
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3 ">
        <div className="aspect-video rounded-xl">
          <NewPrintifyProductForm onSuccess={triggerRefresh} />
        </div>
        <div className="aspect-video rounded-xl">
          <ProductsJsonViewer refreshKey={refreshKey} />
        </div>
        <div className="aspect-video rounded-xl">
          <ActiveProductViewer refreshKey={refreshKey} />
        </div>
      </div>
      <SyncPrintifyButton onSuccess={triggerRefresh} />
      {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
    </div>
  );
}
