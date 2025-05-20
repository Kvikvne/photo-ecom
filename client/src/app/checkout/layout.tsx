export default function CheckoutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="container mx-auto py-18 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {children}
            </div>
        </main>
    );
}
