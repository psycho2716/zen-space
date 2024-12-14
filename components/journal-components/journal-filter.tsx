import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import JournalFilterTags from "./journal-filter-tags";

interface JournalFilterProps {
    allTags: string[];
    searchTerm: string;
    selectedTag: string | null;
    setSearchTerm: (searchTerm: string) => void;
    setSelectedTag: (selectedTag: string | null) => void;
}

const JournalFilter = ({
    allTags,
    searchTerm,
    selectedTag,
    setSearchTerm,
    setSelectedTag
}: JournalFilterProps) => {
    return (
        <div className="w-full flex flex-col sm:flex-row md:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative flex-grow">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search journals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-background text-foreground pl-8"
                />
            </div>
            <JournalFilterTags
                allTags={allTags}
                tagsPerPage={10}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
            />
        </div>
    );
};

export default JournalFilter;
