import React, { HTMLAttributes } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FormInputError from "../form-input.error";

interface AuthInputProps extends HTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string | undefined;
}

const AuthInput = ({ label, error, ...props }: AuthInputProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground dark:text-background capitalize">
                {label}
            </Label>
            <Input className="text-foreground dark:text-background" {...props} />
            <FormInputError message={error} />
        </div>
    );
};

export default AuthInput;
