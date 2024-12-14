import React from "react";
import HeroContent from "./hero-content";
import HeroSection from "./hero-section";

const Hero = ({ children }: { children: React.ReactNode }) => {
    return (
        <HeroSection>
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-blue-500 to-violet-500" />

            <HeroContent>{children}</HeroContent>

            <div className="absolute bottom-0 left-0 right-0 h-24">
                <svg
                    viewBox="0 0 1440 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 w-full h-full"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 100L1440 100L1440 0C1440 0 1140 50 720 50C300 50 0 0 0 0L0 100Z"
                        fill="#E6F7F1"
                    />
                </svg>
            </div>
        </HeroSection>
    );
};

export default Hero;
