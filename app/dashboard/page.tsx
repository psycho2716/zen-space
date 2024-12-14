import { hasMoodForToday } from "@/actions/mood-actions";
import DailyInspiration from "@/components/dashboard/daily-inspiration";
import MoodTracker from "@/components/dashboard/mood-tracker";
import RecentEntries from "@/components/dashboard/recent-entries";
import { VideoRecommendation } from "@/components/dashboard/video-recommendation";
import MainLayout from "@/components/layout/main-layout";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const DashboardPage = async () => {
    const supabase = await createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();
    const hasMoodToday = await hasMoodForToday();

    return (
        <MainLayout className="flex flex-col space-y-5 p-4 pt-20">
            <div className="gradient-banner">
                <div className="px-8 py-12">
                    <h1 className="text-4xl font-bold text-white mb-4 capitalize">
                        Welcome Back {user?.user_metadata.full_name}!
                    </h1>
                    <p className="text-white/90 text-lg">
                        Track your mood, explore curated resources, and embrace positivity with
                        daily affirmations and guided journaling.
                    </p>
                </div>
            </div>

            <DailyInspiration />

            <div className="flex flex-col md:flex-row gap-5">
                <MoodTracker hasMoodToday={hasMoodToday || false} />
                <RecentEntries />
            </div>
            {/* AI Chat Message Card */}
            <VideoRecommendation hasMoodToday={hasMoodToday || false} />
        </MainLayout>
    );
};

export default DashboardPage;
