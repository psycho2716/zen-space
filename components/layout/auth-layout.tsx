import Link from "next/link";
import React from "react";

const AuthLayout = ({
    title,
    subTitle,
    description,
    linkText,
    link,
    children
}: {
    title: string;
    subTitle: string;
    description: string;
    linkText: string;
    link: string;
    children: React.ReactNode;
}) => {
    return (
        <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-[#20c997] text-center mb-7">{title}</h1>

            <div className="floating-card p-8">
                <h4 className="text-zinc-700 text-center text-2xl mb-7 font-semibold">
                    {subTitle}
                </h4>

                {children}

                <p className="text-center mt-6 text-sm text-muted-foreground">
                    {description}{" "}
                    <Link href={link} className="text-[#20c997] hover:underline">
                        {linkText}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;
