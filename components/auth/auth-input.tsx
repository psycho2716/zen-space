import React, { HTMLAttributes } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FormInputError from "../form-input.error";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { Button } from "../ui/button";

interface AuthInputProps extends HTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string | undefined;
    disabled?: boolean;
    name: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    passwordVisibility?: boolean;
    onIconClick?: () => void;
}

const AuthInput = ({
    label,
    name,
    placeholder,
    required = false,
    error,
    disabled = false,
    type,
    passwordVisibility,
    onIconClick,
    ...props
}: AuthInputProps) => {
    return (
        <div className="relative space-y-2">
            <Label htmlFor="email" className="text-foreground dark:text-background capitalize">
                {label}
            </Label>
            <Input
                className="text-foreground dark:text-background"
                name={name}
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                required={required}
                {...props}
            />
            {name === "password" && (
                <Button
                    variant="ghost"
                    className="p-2 px-3 h-6 w-7 hover:bg-background rounded-none bg-background flex items-center justify-center absolute right-3 top-[61%] -translate-y-1/2"
                    onClick={onIconClick}
                >
                    {passwordVisibility ? (
                        <EyeClosedIcon className="w-4.5 h-4.5 cursor-pointer text-muted-foreground/70" />
                    ) : (
                        <EyeIcon className="w-4.5 h-4.5 cursor-pointer text-muted-foreground/70" />
                    )}
                </Button>
            )}
            <FormInputError message={error} />
        </div>
    );
};

export default AuthInput;
