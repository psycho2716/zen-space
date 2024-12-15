import Link from "next/link";
import React from "react";
import { fetchUser } from "@/actions/user-actions";
import NavbarLinks from "./navbar-links";
import Image from "next/image";

const Navbar = async () => {
    const user = await fetchUser();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/40">
            <div className="container mx-auto px-4 sm:px-8 h-16 flex justify-between items-center">
                <Link
                    href="/"
                    className="flex items-center gap-1 text-2xl font-bold text-[#20c997]"
                >
                    <Image src="/logo.png" alt="ZenSpace" width={40} height={40} className="ml-2" />
                    ZenSpace
                </Link>

                <NavbarLinks user={user?.user_metadata} />
            </div>
        </header>
    );
};

export default Navbar;
