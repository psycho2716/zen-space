"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { notFound, useRouter } from "next/navigation";
import JournalInput from "./journal-input";

import { convertTagsToArray } from "@/lib/utils";
import { journalInputs } from "@/data/journalInputs";
import JournalTextarea from "./journal-textarea";
import JournalMoodSelect from "./journal-mood-select";
import JournalTagSelect from "./journal-tag-select";
import useSupabaseJournal from "@/hooks/useSupabaseJournal";
import Loader from "../ui/loader";
import { CardFooter } from "../ui/card";
import { FormAlert } from "../ui/form-alert";
import { journalProps } from "@/lib/schemas";

const JournalUpdateForm = ({ journalEntry }: { journalEntry: journalProps }) => {
    const router = useRouter();

    const { status, errors, handleUpdateJournalEntry } = useSupabaseJournal();

    const [title, setTitle] = useState(journalEntry.title);
    const [content, setContent] = useState(journalEntry.content);
    const [mood, setMood] = useState<string>(journalEntry.mood);
    const [tags, setTags] = useState<string[]>(convertTagsToArray(journalEntry.tags));

    if (!journalEntry) return notFound();

    return (
        <>
            {status?.state !== "idle" && status?.state !== undefined && (
                <FormAlert
                    type={status?.state ?? "idle"}
                    message={status?.message}
                    timeout={3000}
                />
            )}

            {journalInputs.map((input) => {
                if (input.name === "title") {
                    return (
                        <JournalInput
                            key={input.name}
                            label={input.label}
                            id={input.name}
                            name={input.name}
                            defaultValue={title}
                            placeholder={input.placeholder}
                            onChange={(e) => setTitle(e.target.value)}
                            error={errors?.find((error) => error.field === input.name)?.message}
                        />
                    );
                } else if (input.name === "content") {
                    return (
                        <JournalTextarea
                            key={input.name}
                            label={input.label}
                            name={input.name}
                            defaultValue={content}
                            id={input.name}
                            placeholder={input.placeholder}
                            onChange={(e) => setContent(e.target.value)}
                            error={errors?.find((error) => error.field === input.name)?.message}
                        />
                    );
                } else if (input.name === "mood") {
                    return (
                        <JournalMoodSelect
                            key={input.name}
                            label={input.label}
                            id={input.name}
                            mood={mood}
                            defaultValue={mood}
                            placeholder={input.placeholder}
                            onValueChange={(value) => setMood(value)}
                            error={errors?.find((error) => error.field === input.name)?.message}
                        />
                    );
                } else if (input.name === "tags") {
                    return (
                        <JournalTagSelect
                            name={input.name}
                            key={input.name}
                            label={input.label}
                            placeholder={input.placeholder}
                            tags={tags}
                            setTags={setTags}
                            returnedError={
                                errors?.find((error) => error.field === input.name)?.message
                            }
                        />
                    );
                }
            })}
            <CardFooter className="px-0 pb-0">
                <Button
                    onClick={() =>
                        handleUpdateJournalEntry(journalEntry.id!, title, content, mood, tags)
                    }
                    disabled={status?.state === "loading"}
                    className="mr-2"
                >
                    {status?.state === "loading" ? (
                        <>
                            <Loader /> Saving...
                        </>
                    ) : (
                        "Save Changes"
                    )}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/journals")}>
                    Cancel
                </Button>
            </CardFooter>
        </>
    );
};

export default JournalUpdateForm;
