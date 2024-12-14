import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary/10 px-4">
            <div className="floating-card backdrop-blur-lg rounded-lg p-8 max-w-md w-full text-center">
                <FileQuestion className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-secondary mb-4">404 - Page Not Found</h1>
                <p className="text-xl text-foreground/90 mb-8">
                    Oops! It seems you&apos;ve wandered into uncharted territory.
                </p>
                <Button asChild className="w-full">
                    <Link href="/">Return to Home</Link>
                </Button>
            </div>
        </div>
    );
}
