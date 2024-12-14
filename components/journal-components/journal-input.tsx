import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FormInputError from "../form-input.error";

interface JournalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    required?: boolean;
    error: string | undefined;
    defaultValue: string;
}

const JournalInput: React.FC<JournalInputProps> = ({
    label,
    defaultValue,
    required,
    error,
    ...props
}) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={label} className="capitalize">
                {label}
            </Label>
            <Input
                id={label}
                required={required}
                defaultValue={defaultValue}
                {...props} // Spread the remaining props to the input
            />
            {error && <FormInputError message={error} />}
        </div>
    );
};

export default JournalInput;
