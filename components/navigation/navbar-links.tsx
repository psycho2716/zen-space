"use client";

import { navigations } from "@/data/navigations";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { UserMetaDataProps } from "@/actions/user-actions";
import useSupabaseAuth from "@/hooks/useSupabaseAuth";

const NavbarLinks = ({ user }: { user: UserMetaDataProps }) => {
    const pathname = usePathname();
    const { handleUserSignOut } = useSupabaseAuth();

    if (pathname === "/auth/error" || pathname === "/auth/success") return null;

    return (
        <nav className="flex items-center gap-8">
            {navigations
                .filter((item) =>
                    user
                        ? item.name !== "Sign Up" && item.name !== "Sign In"
                        : item.name === "Sign Up" || item.name === "Sign In"
                )
                .map((item) => {
                    if (item.name === "Sign Out") {
                        return (
                            <Button
                                key={item.name}
                                variant="default"
                                className="bg-[#20c997] text-white hover:bg-[#20c997]/90 rounded-full px-6"
                                onClick={handleUserSignOut}
                            >
                                Sign Out
                            </Button>
                        );
                    }

                    if (item.name === "Sign Up") {
                        return (
                            <Button
                                key={item.name}
                                className="bg-[#20c997] text-white hover:bg-[#20c997]/90 rounded-full p-4 px-6"
                                asChild
                            >
                                <Link href="/auth/sign-up">{item.name}</Link>
                            </Button>
                        );
                    }

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-[#20c997]",
                                pathname === item.href ? "text-[#20c997]" : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    );
                })}
        </nav>
    );
};

export default NavbarLinks;
