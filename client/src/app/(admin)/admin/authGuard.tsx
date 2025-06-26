"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/verify`,
          {
            method: "GET",
            credentials: "include"
          }
        );

        if (res.status !== 200) {
          throw new Error("Unauthorized");
        }

        setIsLoading(false);
      } catch (err) {
        toast.error("You must be logged in to access admin.");
        router.replace("/admin/login");
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-transparent">
        <Loader2 className="animate-spin" />
      </div>
    );

  return <>{children}</>;
}
