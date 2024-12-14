import MainLayout from "@/components/layout/main-layout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const SuccessPage = async ({ searchParams }: { searchParams: Promise<Record<string, string>> }) => {
    const searchParamsValue = await searchParams;
    const success = searchParamsValue.success;

    return (
        <MainLayout className="min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Success!</h1>
                    <p className="text-xl text-gray-600 mb-6">{success}</p>
                    <div className="w-full h-2 bg-gradient-to-r from-[#00D4FF] to-[#7B2FFE] rounded-full mb-6"></div>
                    <p className="text-gray-600 mb-8">
                        Thank you for using ZenSpace. Your journey to a healthier life starts now!
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00D4FF] to-[#7B2FFE] text-white font-semibold py-3 px-6 rounded-full transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7B2FFE]"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Return to Home
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
};

export default SuccessPage;
