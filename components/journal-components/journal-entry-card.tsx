import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tag, Calendar, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import DeleteAlert from "../ui/delete-alert";
import useSupabaseJournal from "@/hooks/useSupabaseJournal";
import { journalProps } from "@/lib/schemas";

interface JournalEntryCardProps {
    entry: journalProps;
    className?: string;
}

const JournalEntryCard = ({ entry, className }: JournalEntryCardProps) => {
    const { title, mood, tags, content, created_at } = entry;
    const { status, handleDeleteJournalEntry } = useSupabaseJournal();

    // Parse and split tags into an array
    const entryTags = tags
        ? Array.isArray(tags)
            ? tags // If `tags` is already an array, use it as-is
            : (tags as string).split(",") // If `tags` is a string, split it into an array
        : [];

    const date = new Date(created_at!).toISOString().split("T")[0];

    return (
        <Card className={cn(`floating-card flex flex-1 flex-col ${className}`)}>
            <CardHeader className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-normal rounded-full px-2">
                        {mood}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {date}
                    </span>
                </div>
                <CardTitle className="text-lg font-semibold line-clamp-1">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{content}</p>
                <div className="flex flex-wrap gap-2">
                    {entryTags.map((tag: string, index: number) => (
                        <Badge
                            key={index}
                            className="bg-zinc-100 text-xs text-zinc-800 cursor-default hover:bg-zinc-100"
                        >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag.trim()} {/* Ensure no extra spaces */}
                        </Badge>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <Link href={`/journals/update/${entry.id}`}>
                        <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    </Link>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>

                        <DeleteAlert
                            id={entry.id!}
                            handleDelete={handleDeleteJournalEntry}
                            message="This will permanently delete your journal entry."
                            isLoading={status?.state === "loading"}
                        />
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
};

export default JournalEntryCard;
