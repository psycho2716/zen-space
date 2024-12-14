import React from "react";
import { SectionContainer } from "./section-container";

const SectionLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SectionContainer>
            <div className="bg-white bg-opacity-75 py-12 rounded-3xl shadow-xl">{children}</div>
        </SectionContainer>
    );
};

export default SectionLayout;
