import React from "react";
import { Card, CardContent } from "./ui/card";

interface SectionCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const SectionCard = ({ title, description, icon }: SectionCardProps) => {
    return (
        <Card className="relative flex-1 overflow-hidden">
            <CardContent className="p-6 text-center">
                <div className="mb-4 w-12 h-12 rounded-full bg-teal-100 text-teal-500 flex items-center justify-center mx-auto">
                    {icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </CardContent>
        </Card>
    );
};

export default SectionCard;
