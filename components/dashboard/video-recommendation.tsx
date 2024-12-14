import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoPlayer from "./video-player";

export function VideoRecommendation({ hasMoodToday }: { hasMoodToday: boolean }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Recommended Video</CardTitle>
                <p className="text-sm text-muted-foreground">
                    {hasMoodToday
                        ? `Based on your mood today, we recommend watching these videos:`
                        : "Select a mood to get personalized video recommendations."}
                </p>
            </CardHeader>
            <CardContent>
                {!hasMoodToday ? (
                    <p className="text-muted-foreground">No video recommendations for your mood.</p>
                ) : (
                    <VideoPlayer hasMoodToday={hasMoodToday} />
                )}
            </CardContent>
        </Card>
    );
}
