import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

const Loader = ({ className }: { className?: string }) => {
    return (
        <div className={cn(`w-4 h-4 ${className}`)}>
            <Loader2 className="w-full h-full animate-spin" />
        </div>
    );
};

export default Loader;
