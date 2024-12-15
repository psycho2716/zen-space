"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Oops! Something went wrong.
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    We&apos;re sorry, but we encountered an error while processing your request.
                </p>

                <Button
                    asChild
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                >
                    <Link href="/">Return to Home Page</Link>
                </Button>
            </div>
        </div>
    );
}
