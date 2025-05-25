export default function CartLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className="container mx-auto py-16 min-h-[80svh]">
                <h1 className="font-bold text-4xl">Your cart</h1>
                {children}
            </div>
        </main>
    );
}
