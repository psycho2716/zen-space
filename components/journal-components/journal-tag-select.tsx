import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Label } from "../ui/label";
import FormInputError from "../form-input.error";

interface JournalTagSeSelectProps {
    name: string;
    label: string;
    placeholder?: string;
    returnedError?: string | undefined;
    tags: string[];
    setTags: (tags: string[]) => void;
}

const JournalTagSelect = ({
    label,
    placeholder,
    tags,
    returnedError,
    setTags,
    name
}: JournalTagSeSelectProps) => {
    const [newTag, setNewTag] = useState<string>("");
    const [error, setError] = useState<string | null>(returnedError || null);

    const addTag = () => {
        if (newTag === "") {
            setError("Please enter a tag!");
            return;
        }

        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, ` ${newTag}`]);
            setNewTag("");
            setError("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    useEffect(() => {
        setError(returnedError || null);
    }, [returnedError]);

    return (
        <div className="space-y-2">
            <Label htmlFor={label} className="capitalize">
                {label}
            </Label>
            <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                    <Button
                        key={index}
                        variant="secondary"
                        size="sm"
                        onClick={() => removeTag(tag)}
                    >
                        {tag}
                        <X className="h-3 w-3 ml-1" />
                    </Button>
                ))}
            </div>
            <div className="flex gap-2">
                <Input name={name} defaultValue={tags} className="hidden" />
                <Input
                    id="newTag"
                    placeholder={placeholder}
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag}>
                    Add
                </Button>
            </div>
            {error && <FormInputError message={error || returnedError} />}
        </div>
    );
};

export default JournalTagSelect;
