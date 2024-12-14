import Link from "next/link";
import React from "react";
import { fetchUser } from "@/actions/user-actions";
import NavbarLinks from "./navbar-links";

const Navbar = async () => {
    const user = await fetchUser();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border/40">
            <div className="container mx-auto px-8 h-16 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-[#20c997]">
                    ZenSpace
                </Link>

                <NavbarLinks user={user?.user_metadata} />
            </div>
        </header>
    );
};

export default Navbar;
