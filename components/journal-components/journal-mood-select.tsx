import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { moods } from "@/data/moods";
import { SelectProps } from "@radix-ui/react-select";

interface JournalMoodSelectProps extends React.HTMLAttributes<SelectProps> {
    label: string;
    mood?: string;
    error?: string | undefined;
    placeholder?: string;
    onValueChange?: (value: string) => void;
}

const JournalMoodSelect = ({
    label,
    error,
    mood,
    placeholder,
    onValueChange
}: JournalMoodSelectProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={label} className="capitalize">
                {label}
            </Label>
            <Select defaultValue={mood} onValueChange={onValueChange}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {moods.map((mood) => (
                        <SelectItem key={mood.name} value={mood.name}>
                            {mood.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default JournalMoodSelect;
