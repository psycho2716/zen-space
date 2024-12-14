import React, { Suspense } from "react";
import { CardHeader } from "../ui/card";
import { CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const MoodHeader = ({ hasMoodToday }: { hasMoodToday: boolean }) => {
    return (
        <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary">Mood Tracker</CardTitle>
            <Suspense fallback={<Skeleton className="h-4 w-24" />}>
                {!hasMoodToday ? (
                    <p className="text-sm text-muted-foreground">How are you feeling today?</p>
                ) : (
                    <p className="text-sm text-muted-foreground">Overall Mood Distribution</p>
                )}
            </Suspense>
        </CardHeader>
    );
};

export default MoodHeader;
