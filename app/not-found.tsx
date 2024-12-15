import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary/10 px-4">
            <div className="floating-card backdrop-blur-lg rounded-lg p-8 max-w-md w-full text-center">
                <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-slate-800 mb-4">Page Not Found</h2>
                <p className="text-xl text-slate-600 mb-8">
                    Oops! It seems you&apos;ve wandered into uncharted territory.
                </p>
                <Button asChild className="w-full">
                    <Link href="/">Return to Home</Link>
                </Button>
            </div>
        </div>
    );
}
