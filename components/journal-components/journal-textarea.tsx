import React from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import FormInputError from "../form-input.error";

interface JournalTextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    required?: boolean;
    error: string | undefined;
    className?: string;
}

const JournalTextarea = ({ label, required, className, ...props }: JournalTextareaProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={label} className="capitalize">
                {label}
            </Label>
            <Textarea
                required={required}
                className={cn(`min-h-[150px], ${className}`)}
                {...props}
            />
            <FormInputError message={props.error} />
        </div>
    );
};

export default JournalTextarea;
