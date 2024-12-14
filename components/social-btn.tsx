import React from "react";
import { Button } from "./ui/button";
import { Provider } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import Loader from "./ui/loader";

interface SocialBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading: boolean;
    oauthProvider: Provider;
    icon: React.ReactNode;
    handleClick: (provider: Provider) => void;
    className?: string;
}

const SocialButton = ({
    isLoading,
    oauthProvider: provider,
    icon,
    handleClick,
    className
}: SocialBtnProps) => {
    return (
        <Button
            variant="outline"
            onClick={() => handleClick(provider)}
            disabled={isLoading}
            className={cn(
                `w-full dark:bg-transparent dark:text-background dark:hover:bg-[#1DB68A]/70 dark:hover:text-accent-foreground ${className}`
            )}
        >
            {isLoading ? <Loader /> : icon}
            Google
        </Button>
    );
};

export default SocialButton;
