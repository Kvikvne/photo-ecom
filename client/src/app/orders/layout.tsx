export default function OrdersLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className="container mx-auto py-16 min-h-screen">
                {children}
            </div>
        </main>
    );
}
