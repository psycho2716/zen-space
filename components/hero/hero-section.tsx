import React from "react";
import { cn } from "@/lib/utils";

const HeroSection = ({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <section className={cn(`relative pt-36 pb-40 px-4`, className)}>
            <div className="bg-white bg-opacity-75 py-12 rounded-3xl shadow-xl">{children}</div>
        </section>
    );
};

export default HeroSection;
