import { Card } from "@/components/ui/card";
import MoodHeader from "./mood-header";
import { getMoodTrends } from "@/actions/mood-actions";
import MoodContent from "./mood-content";
import { TrendProps } from "@/types/type";

export default async function MoodTracker({ hasMoodToday }: { hasMoodToday: boolean }) {
    const trends = await getMoodTrends();

    return (
        <Card className="floating-card flex-1 lg:basis-[30%]">
            <MoodHeader hasMoodToday={hasMoodToday || false} />
            <MoodContent hasMoodToday={hasMoodToday || false} trends={trends as TrendProps} />
        </Card>
    );
}
