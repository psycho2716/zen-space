"use client";

import React, { useState } from "react";
import JournalFilter from "./journal-filter";
import JournalCardEntries from "./journal-card-entries";
import { journalProps } from "@/lib/schemas";

const entriesPerPage = Number(process.env.NEXT_PUBLIC_ENTRIES_PER_PAGE);

const JournalEntries = ({ journalEntries }: { journalEntries: journalProps[] }) => {
    // Local States
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const filteredEntries = journalEntries.filter(
        (entry: journalProps) =>
            (entry.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!selectedTag || entry.tags.includes(selectedTag))) ||
            (entry.mood.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!selectedTag || entry.tags.includes(selectedTag)))
    );

    const allTags = Array.from(
        new Set(
            journalEntries.flatMap((entry: journalProps) =>
                typeof entry.tags === "string"
                    ? (entry.tags as string).split(",")
                    : Array.isArray(entry.tags)
                    ? entry.tags.flatMap((tag: string) => tag.split(","))
                    : []
            )
        )
    );

    return (
        <>
            <JournalFilter
                allTags={allTags}
                searchTerm={searchTerm}
                selectedTag={selectedTag}
                setSearchTerm={setSearchTerm}
                setSelectedTag={setSelectedTag}
            />
            <JournalCardEntries filteredEntries={filteredEntries} entriesPerPage={entriesPerPage} />
        </>
    );
};

export default JournalEntries;
