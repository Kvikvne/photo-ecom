import AuthGuard from "./authGuard";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <div className="container mx-auto py-16 min-h-[80svh] px-8">
                <AuthGuard>{children}</AuthGuard>
            </div>
        </main>
    );
}
