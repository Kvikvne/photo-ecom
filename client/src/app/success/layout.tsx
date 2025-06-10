export default function CheckoutSuccessLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className="container mx-auto py-16 px-8 min-h-screen">
                {children}
            </div>
        </main>
    );
}
