import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const JournalCard = ({ children, cardTitle }: { children: ReactNode; cardTitle: string }) => {
    return (
        <div className="container py-8">
            <Card className="floating-card max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary">{cardTitle} </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">{children}</CardContent>
            </Card>
        </div>
    );
};

export default JournalCard;
