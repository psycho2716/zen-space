import React from "react";
import { cn } from "@/lib/utils";

const MainLayout = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={cn(`md:max-w-[1366px] mx-auto bg-transparent relative`, className)}>
            {children}
        </div>
    );
};

export default MainLayout;
