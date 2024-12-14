import React from "react";

const About = () => {
    return (
        <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">
                        About ZenSpace
                    </h2>
                    <p className="text-lg text-white/90 text-center max-w-3xl mx-auto">
                        Our app is designed to help you understand and improve your emotional
                        well-being. Through a combination of insightful tools and curated content,
                        it enables you to track, visualize, and analyze your moods, offering
                        personalized video recommendations to support mental health.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
