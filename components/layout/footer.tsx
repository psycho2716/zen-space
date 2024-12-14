import React from "react";
import Link from "next/link";
import { socialLinks } from "@/data/socialLinks";

const Footer = () => {
    return (
        <footer className="bg-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-cyan-600 hover:text-cyan-700 transition-colors mb-2"
                        >
                            ZenSpace
                        </Link>
                        <p className="text-gray-600 text-sm">
                            &copy; {new Date().getFullYear()} ZenSpace. All rights reserved.
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                            <span className="text-sm">Developed with</span>
                            <span className="text-red-500 animate-pulse">❤️</span>
                            <span className="text-sm">by</span>
                            <span className="font-medium text-cyan-600">
                                {process.env.NEXT_PUBLIC_AUTHOR_NAME}
                            </span>
                        </div>
                        <div className="flex space-x-6">
                            {socialLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.url!}
                                    className="text-gray-400 hover:text-cyan-600 transition-colors"
                                >
                                    <span className="sr-only">{link.name}</span>
                                    {link.icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
