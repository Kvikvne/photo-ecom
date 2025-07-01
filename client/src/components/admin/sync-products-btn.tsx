"use client";
import { API_BASE_URL } from "@/lib/config";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function SyncPrintifyButton({ onSuccess }: { onSuccess: () => void }) {
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
      onSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleSync} disabled={loading}>
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        "Deploy Products to Stripe, Printify, and DB"
      )}
    </Button>
  );
}
