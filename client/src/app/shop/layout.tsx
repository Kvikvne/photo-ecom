export default function StoreLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className="container mx-auto py-16">{children}</div>
        </main>
    );
}
