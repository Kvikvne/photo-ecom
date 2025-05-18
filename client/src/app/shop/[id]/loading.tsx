import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="h-[calc(100vh-88px)] flex justify-center items-center w-full">
            <Loader2 className="animate-spin" />
        </div>
    );
}
