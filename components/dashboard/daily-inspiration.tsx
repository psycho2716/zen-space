"use client";

import { useEffect } from "react";
import { getInspirationalQuote } from "@/actions/inspirational-actions";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import { useQuoteStore } from "@/store/quote.store";

export default function DailyInspiration() {
    const setQuote = useQuoteStore((state) => state.setQuote);
    const quote = useQuoteStore((state) => state.quote);
    const refreshCount = useQuoteStore((state) => state.refreshCount);
    const setRefreshCount = useQuoteStore((state) => state.setRefreshCount);

    const handleQuoteRefresh = async () => {
        if (refreshCount < 2) {
            const newQuote = await getInspirationalQuote();

            setQuote(newQuote);
            setRefreshCount(refreshCount + 1);
        }
    };

    useEffect(() => {
        if (!quote) {
            (async () => {
                const newQuote = await getInspirationalQuote();

                setQuote(newQuote);
            })();
        }
    }, []);

    return (
        <div className="floating-card p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#20c997]">Daily Inspiration</h2>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-[#20c997]"
                    onClick={handleQuoteRefresh}
                >
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>
            <p className="text-muted-foreground mb-4">Quotes to uplift your spirit</p>

            <Suspense fallback={qouteSkeleton()}>
                <blockquote className="text-lg font-medium italic dark:text-background mb-2">
                    {quote ? `"${quote.quote}"` : null}
                </blockquote>
                <p className="text-muted-foreground"> - {quote ? quote?.author : null}</p>
            </Suspense>
        </div>
    );
}

const qouteSkeleton = () => {
    return (
        <>
            <Skeleton className="text-lg font-medium italic mb-2" />
            <Skeleton className="text-muted-foreground" />
        </>
    );
};
