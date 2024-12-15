import React, { HTMLAttributes } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FormInputError from "../form-input.error";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

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
        <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground dark:text-background capitalize">
                {label}
            </Label>
            <div className="w-full relative">
                <Input
                    className="text-foreground dark:text-background"
                    name={name}
                    disabled={disabled}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    {...props}
                />
                {name === "password" ? (
                    passwordVisibility ? (
                        <EyeClosedIcon
                            className="w-[20px] h-[15px] cursor-pointer text-foreground/70 bg-background absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={onIconClick}
                        />
                    ) : (
                        <EyeIcon
                            className="w-[20px] h-[15px] cursor-pointer text-foreground/70 bg-background absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={onIconClick}
                        />
                    )
                ) : null}
            </div>
            <FormInputError message={error} />
        </div>
    );
};

export default AuthInput;
