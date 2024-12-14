import { getJournalEntries } from "@/actions/journal-actions";
import { journalProps } from "@/lib/schemas";
import React from "react";
import { Button } from "../ui/button";
import { formatRelativeTime } from "@/lib/utils";
import Link from "next/link";

const RecentEntries = async () => {
    const entries: journalProps[] = await getJournalEntries(3);

    return (
        <div className="floating-card flex-1 lg:basis-[70%] p-6 flex flex-col justify-between">
            <div className="w-full">
                <h2 className="text-xl font-semibold text-[#20c997] mb-2">Recent Entries</h2>
                <p className="text-muted-foreground mb-6">Express your thoughts and feelings</p>
                <div className="space-y-6 mb-6">
                    {entries.length > 0 ? (
                        entries.map((entry) => (
                            <div key={entry.title} className="space-y-2">
                                <h3 className="font-medium hover:text-[#20c997] transition-colors">
                                    {entry.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {entry.content}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {formatRelativeTime(entry.created_at!)}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            No recent entries available.
                        </p>
                    )}
                </div>
            </div>

            <Button
                className="w-full bg-[#20c997] text-white hover:bg-[#20c997]/90 rounded-xl h-12"
                asChild
            >
                <Link href="/journals">Open Journals</Link>
            </Button>
        </div>
    );
};

export default RecentEntries;
