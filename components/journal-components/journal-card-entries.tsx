import React, { useState } from "react";
import JournalEntryCard from "./journal-entry-card";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { journalProps } from "@/lib/schemas";

const JournalCardEntries = ({
    filteredEntries,
    entriesPerPage = 6
}: {
    filteredEntries: journalProps[];
    entriesPerPage?: number;
}) => {
    const [currentEntryPage, setCurrentEntryPage] = useState(0);

    const totalEntryPages = Math.ceil(filteredEntries.length / entriesPerPage);
    const currentPageEntries = filteredEntries.slice(
        currentEntryPage * entriesPerPage,
        (currentEntryPage + 1) * entriesPerPage
    );

    const nextEntryPage = () => {
        setCurrentEntryPage((prev) => Math.min(prev + 1, totalEntryPages - 1));
    };

    const prevEntryPage = () => {
        setCurrentEntryPage((prev) => Math.max(prev - 1, 0));
    };

    const goToEntryPage = (page: number) => {
        setCurrentEntryPage(page);
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentPageEntries.length > 0 ? (
                    currentPageEntries.map((entry: journalProps) => (
                        <JournalEntryCard key={entry.id} entry={entry} className="min-h-64" />
                    ))
                ) : (
                    <p className="text-muted-foreground">No entries found.</p>
                )}
            </div>
            {totalEntryPages > 1 && (
                <div className="flex items-center space-x-2 mt-6">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={prevEntryPage}
                        disabled={currentEntryPage === 0}
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Button>
                    {Array.from({ length: totalEntryPages }, (_, i) => (
                        <Button
                            key={i}
                            variant={currentEntryPage === i ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToEntryPage(i)}
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={nextEntryPage}
                        disabled={currentEntryPage === totalEntryPages - 1}
                    >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default JournalCardEntries;
