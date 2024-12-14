import { cn } from "@/lib/utils";
import React from "react";

const FormInputError = ({
    message,
    className
}: {
    message: string | undefined;
    className?: string;
}) => {
    return <span className={cn(`text-red-500 text-sm ${className}`)}>{message}</span>;
};

export default FormInputError;
