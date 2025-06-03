export default function ContactLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="container mx-auto py-18 min-h-screen">
            <div className="">{children}</div>
        </main>
    );
}
