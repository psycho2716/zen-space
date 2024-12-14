import { Smile, ChartPie, Video, LineChart } from "lucide-react";

export const services = [
    {
        title: "Mood Tracking",
        description: "Log your daily mood and keep track of your emotions over time.",
        icon: <Smile className="w-6 h-6" /> // Replace with a smiley or relevant mood icon
    },
    {
        title: "Mood Visualization",
        description: "View your mood distribution and daily trends using colorful charts.",
        icon: <ChartPie className="w-6 h-6" /> // Pie or chart icon
    },
    {
        title: "Mood Analysis",
        description: "Get insights on your most common moods and identify emotional patterns.",
        icon: <LineChart className="w-6 h-6" /> // Analytics or insights icon
    },
    {
        title: "Video Recommendations",
        description: "Access curated videos to help improve your mood and mental health.",
        icon: <Video className="w-6 h-6" /> // Video player or YouTube icon
    }
];
