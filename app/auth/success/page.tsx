import MainLayout from "@/components/layout/main-layout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const SuccessPage = async ({ searchParams }: { searchParams: Promise<Record<string, string>> }) => {
    const searchParamsValue = await searchParams;
    const success = searchParamsValue.success;

    console.log(success);

    return (
        <MainLayout className="min-h-screen flex flex-col items-center pt-20 justify-center">
            <h1>{success}</h1>
            <Link href="/" className="flex gap-2">
                <ArrowLeft /> Return back
            </Link>
        </MainLayout>
    );
};

export default SuccessPage;
