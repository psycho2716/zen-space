"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import JournalInput from "./journal-input";

import { journalInputs } from "@/data/journalInputs";
import JournalTextarea from "./journal-textarea";
import JournalMoodSelect from "./journal-mood-select";
import JournalTagSelect from "./journal-tag-select";
import useSupabaseJournal from "@/hooks/useSupabaseJournal";
import Loader from "../ui/loader";
import { CardFooter } from "../ui/card";
import { FormAlert } from "../ui/form-alert";
import { moods } from "@/data/moods";

const JournalCreateForm = () => {
    const { status, errors, handleInsertJournalEntry } = useSupabaseJournal();

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState<string>(moods[0].name);
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        // Reset the form after successful submission
        if (status?.state === "success") {
            setIsVisible(false);
            setTitle("");
            setContent("");
            setMood(moods[0].name);
            setTags([]);
        }
    }, [status?.state]);

    return (
        <>
            {isVisible ? (
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
                                    error={
                                        errors?.find((error) => error.field === input.name)?.message
                                    }
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
                                    error={
                                        errors?.find((error) => error.field === input.name)?.message
                                    }
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
                                    error={
                                        errors?.find((error) => error.field === input.name)?.message
                                    }
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
                            onClick={() => handleInsertJournalEntry(title, content, mood, tags)}
                            disabled={status?.state === "loading"}
                            className="mr-2"
                        >
                            {status?.state === "loading" ? (
                                <>
                                    <Loader /> Creating...
                                </>
                            ) : (
                                "Create Entry"
                            )}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setIsVisible(false)}>
                            Cancel
                        </Button>
                    </CardFooter>
                </>
            ) : (
                <Button onClick={() => setIsVisible(true)} className="w-full">
                    Start New Entry
                </Button>
            )}
        </>
    );
};

export default JournalCreateForm;
