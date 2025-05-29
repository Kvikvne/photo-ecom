export async function fetchWithErrorHandling<T>(
    url: string,
    options: RequestInit = {}
): Promise<T | { error: string }> {
    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            const errText = await res.text();
            console.error(`Fetch error ${res.status}: ${errText}`);
            return { error: `Server error ${res.status}` };
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Network error:", error);
        return { error: "Network request failed" };
    }
}
