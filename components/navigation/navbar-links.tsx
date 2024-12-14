"use client";

import { navigations } from "@/data/navigations";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { UserMetaDataProps } from "@/actions/user-actions";
import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import { Menu, X } from "lucide-react";

const NavbarLinks = ({ user }: { user: UserMetaDataProps }) => {
    const pathname = usePathname();
    const { handleUserSignOut } = useSupabaseAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (pathname === "/auth/error" || pathname === "/auth/success") return null;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = navigations.filter((item) =>
        user
            ? item.name !== "Sign Up" && item.name !== "Sign In"
            : item.name === "Sign Up" || item.name === "Sign In"
    );

    const renderNavItem = (item: (typeof navigations)[0]) => {
        if (item.name === "Sign Out") {
            return (
                <Button
                    key={item.name}
                    variant="default"
                    className="bg-red-500 text-white hover:bg-red-600/90 rounded-full px-6 w-full sm:w-auto"
                    onClick={() => {
                        handleUserSignOut();
                        setIsMenuOpen(false);
                    }}
                >
                    Sign Out
                </Button>
            );
        }

        if (item.name === "Sign Up") {
            return (
                <Button
                    key={item.name}
                    className="bg-[#20c997] text-white hover:bg-[#20c997]/90 rounded-full p-4 px-6 w-full sm:w-auto"
                    asChild
                >
                    <Link href="/auth/sign-up" onClick={() => setIsMenuOpen(false)}>
                        {item.name}
                    </Link>
                </Button>
            );
        }

        return (
            <Link
                key={item.name}
                href={item.href}
                className={cn(
                    "text-sm font-medium transition-colors hover:text-[#20c997] w-full sm:w-auto text-center sm:text-left py-2 sm:py-0",
                    pathname === item.href ? "text-[#20c997]" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
            >
                {item.name}
            </Link>
        );
    };

    return (
        <nav className="flex items-center">
            <div className="hidden sm:flex items-center gap-8">{navItems.map(renderNavItem)}</div>
            <div className="sm:hidden">
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                    {isMenuOpen ? <X /> : <Menu />}
                </Button>
            </div>
            {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-background/90 backdrop-blur-lg border-b border-border/40 p-4 flex flex-col items-center gap-4 sm:hidden">
                    {navItems.map(renderNavItem)}
                </div>
            )}
        </nav>
    );
};

export default NavbarLinks;
