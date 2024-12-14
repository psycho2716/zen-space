"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";

// Register components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

interface CenterTextPlugin {
    centerText: {
        display: boolean;
        title: string;
        subtitle: string;
    };
}

// Custom plugin for center text
ChartJS.register({
    id: "centerText",
    beforeDraw(chart) {
        const { width, height, ctx } = chart;
        const centerText = (chart.config?.options?.plugins as CenterTextPlugin).centerText;

        if (centerText?.display) {
            const textX = width / 2;
            const textY = height / 2;

            ctx.save();
            ctx.font = "16px Inter";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";
            ctx.fillText(centerText.title, textX, textY - 10);
            ctx.font = "bold 18px Inter";
            ctx.fillText(centerText.subtitle, textX, textY + 10);
            ctx.restore();
        }
    }
});

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { moods } from "@/data/moods";
import { CardContent } from "../ui/card";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { FormAlert } from "../ui/form-alert";
import useSupabaseMood from "@/hooks/useSupabaseMood";
import Loader from "../ui/loader";
import { Pie } from "react-chartjs-2";
import { TrendProps } from "@/types/type";
import useMoodStore from "@/store/mood.store";

const MoodContent = ({ hasMoodToday, trends }: { hasMoodToday: boolean; trends: TrendProps }) => {
    const { status, handleInsertMood } = useSupabaseMood();

    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [notes, setNotes] = useState<string>("");

    const setSelectedMoodStored = useMoodStore((state) => state.setSelectedMood);

    const handleMoodSelect = (mood: string) => {
        setSelectedMood(mood);
        setSelectedMoodStored(mood);
    };

    const mostCommonMood =
        trends?.moodCounts &&
        Object.keys(trends.moodCounts).find(
            (mood) => trends.moodCounts[mood] === Math.max(...Object.values(trends.moodCounts))
        );

    const handleCreateMood = async () => {
        await handleInsertMood({ mood: selectedMood!, notes });
    };

    return (
        <CardContent className="space-y-4">
            {status?.state !== "idle" && (
                <FormAlert type={status?.state} message={status?.message} timeout={3000} />
            )}

            {!hasMoodToday ? (
                <>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        <Input type="hidden" name="mood" value={selectedMood ? selectedMood : ""} />

                        {moods.map((mood) => (
                            <Button
                                key={mood.name}
                                variant="outline"
                                className={cn(
                                    "h-16 relative transition-all duration-300 hover:bg-muted/70 border-2 hover:border-primary/50",
                                    selectedMood === mood.name && `gradient-${mood.name} border-2`
                                )}
                                onClick={() => handleMoodSelect(mood.name)}
                            >
                                {selectedMood === mood.name && (
                                    <span
                                        className={cn(
                                            "absolute inset-0 border-2 rounded-md bg-gradient-to-r opacity-20",
                                            `gradient-${mood.name}`
                                        )}
                                    />
                                )}
                                <span className="text-xl mr-2">{mood.emoji}</span>
                                <span
                                    className={cn(
                                        "transition-colors duration-300 capitalize",
                                        selectedMood === mood.name &&
                                            "bg-gradient-to-r bg-clip-text text-transparent",
                                        selectedMood === mood.name && `gradient-${mood.name}`
                                    )}
                                >
                                    {mood.name}
                                </span>
                            </Button>
                        ))}
                    </div>
                    <Textarea
                        placeholder="Add any notes about your mood today (optional)"
                        value={notes}
                        name="notes"
                        onChange={(e) => setNotes(e.target.value)}
                        className="min-h-[100px] resize-none mb-7"
                    />
                    <Button
                        onClick={handleCreateMood}
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                    >
                        {status?.state === "loading" ? <Loader /> : "Submit"}
                    </Button>
                </>
            ) : status?.state === "loading" ? (
                <div>Loading mood trends...</div>
            ) : (
                trends && (
                    <>
                        <div className="flex flex-col items-center justify-center gap-4 mb-6">
                            <Pie
                                data={{
                                    labels: Object.keys(trends.moodCounts),
                                    datasets: [
                                        {
                                            label: "Mood Distribution",
                                            data: Object.values(trends.moodCounts),
                                            backgroundColor: Object.keys(trends.moodCounts).map(
                                                (mood) =>
                                                    moods.find((m) => m.name === mood)?.color ||
                                                    "#CCCCCC" // Fallback to gray
                                            ),
                                            borderColor: "transparent", // No border color
                                            borderWidth: 0, // No border width
                                            hoverOffset: 0, // Disable "popping out" on hover
                                            order: 999 // Ensure the dataset index renders on top
                                        }
                                    ]
                                }}
                            />
                            <div className="w-3/5 h-3/5 flex flex-col justify-center items-center">
                                <h4 className="text-foreground font-normal">Most Common</h4>
                                <span className="capitalize text-slate-800/80">
                                    {mostCommonMood}
                                </span>
                            </div>
                        </div>
                    </>
                )
            )}
        </CardContent>
    );
};

export const MoodContentSkeleton = () => {
    return (
        <CardContent className="space-y-4">
            <Skeleton className="grid grid-cols-2 gap-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </Skeleton>
            <Skeleton className="min-h-[100px] resize-none" />
            <Skeleton className="w-full h-10" />
        </CardContent>
    );
};

export default MoodContent;
