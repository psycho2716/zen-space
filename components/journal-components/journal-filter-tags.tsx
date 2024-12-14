import React, { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const JournalFilterTags = ({
    allTags,
    tagsPerPage,
    selectedTag,
    setSelectedTag
}: {
    allTags: string[];
    tagsPerPage: number;
    selectedTag: string | null;
    setSelectedTag: (selectedTag: string | null) => void;
}) => {
    const [currentTagPage, setCurrentTagPage] = useState(0);
    const totalTagPages = Math.ceil(allTags.length / tagsPerPage);

    const currentPageTags = allTags.slice(
        currentTagPage * tagsPerPage,
        (currentTagPage + 1) * tagsPerPage
    );

    const nextTagPage = () => {
        setCurrentTagPage((prev) => Math.min(prev + 1, totalTagPages - 1));
    };

    const prevTagPage = () => {
        setCurrentTagPage((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className="w-full max-w-[60rem] flex items-center justify-between space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={prevTagPage}
                disabled={currentTagPage === 0}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
            >
                All Tags
            </Button>

            <div className="w-full flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50">
                {currentPageTags.map((tag) => (
                    <Button
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTag(tag)}
                    >
                        {tag}
                    </Button>
                ))}
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={nextTagPage}
                disabled={currentTagPage === totalTagPages - 1}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default JournalFilterTags;
