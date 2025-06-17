import AuthGuard from "./authGuard";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthGuard>{children}</AuthGuard>
      <Toaster />
    </>
  );
}
