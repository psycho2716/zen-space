import React from "react";
import { cn } from "@/lib/utils";

const HeroContent = ({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn(`relative container mx-auto text-center text-white`, className)}>
            {children}
        </div>
    );
};

export default HeroContent;
