"use client";
import { API_BASE_URL } from "@/lib/config";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SyncPrintifyButton() {
  const [loading, setLoading] = useState(false);

  async function handleSync() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/products/create-prices`, {
        method: "POST"
        // headers: {
        //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET!}`
        // }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sync failed");

      toast.success(data.message);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleSync} disabled={loading}>
      {loading ? "Syncing..." : "Sync Printify to Stripe"}
    </Button>
  );
}
