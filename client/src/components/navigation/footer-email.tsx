"use client";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function EmailSignupForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            // Send email to your API route or 3rd party service
            await fetch("/api/subscribe", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: { "Content-Type": "application/json" },
            });
            setStatus("success");
        } catch {
            setStatus("error");
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
                    disabled={status === "loading"}
                >
                    {status === "loading" ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        "Subscribe"
                    )}
                </Button>
            </form>
        </div>
    );
}
