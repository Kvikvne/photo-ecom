"use client";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function EmailSignupForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/email/sub", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: { "Content-Type": "application/json" },
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Subscription failed.");
            }

            toast.success("You have subscribed successfully!");
        } catch (err: any) {
            toast.error(err?.message || "There was a problem subscribing.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-72">
            <span className="text-background text-2xl font-bold">
                Keep up with the latest releases
            </span>
            <p className="text-background mb-4">
                I will continue to design and add new items to my collection so
                you dont want to miss out!
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background"
                />
                <Button
                    type="submit"
                    variant={"outline"}
                    className="bg-primary text-background w-full hover:border-accent"
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        "Subscribe"
                    )}
                </Button>
            </form>
        </div>
    );
}
``;
