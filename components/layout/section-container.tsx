import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionContainerProps {
    children: ReactNode;
    className?: string;
}

export function SectionContainer({ children, className }: SectionContainerProps) {
    return (
        <section className={cn(`py-20 px-4`, className)}>
            <div className="container mx-auto">{children}</div>
        </section>
    );
}
