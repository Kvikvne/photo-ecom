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
        // Don't run auth check on the login route
        if (pathname === "/admin/login") {
            setIsLoading(false);
            return;
        }

        const token = localStorage.getItem("admin_token");

        if (!token) {
            toast.error("You must be logged in to access admin.");
            router.replace("/admin/login");
        } else {
            setIsLoading(false);
        }
    }, [router, pathname]);

    if (isLoading)
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-transparent">
                <Loader2 className="animate-spin" />
            </div>
        );

    return <>{children}</>;
}
