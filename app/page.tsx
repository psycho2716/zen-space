import Hero from "@/components/hero/hero";
import About from "@/components/layout/about";
import Footer from "@/components/layout/footer";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/components/layout/section-header";
import SectionLayout from "@/components/layout/section-layout";
import SectionCard from "@/components/section-card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Hero>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Unlock a Healthier Mind,
                    <br />
                    One Day at a Time.
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8 text-white/90">
                    Discover your personal sanctuary for mental wellness. Track your mood, explore
                    curated resources, and embrace positivity with daily affirmations and guided
                    journaling.
                </p>

                <div className="mt-8 text-center">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                        <Link href="/auth/sign-in">Start Journey</Link>
                    </Button>
                </div>
            </Hero>
            <MainLayout>
                <SectionLayout>
                    <SectionHeader title="Our Services" />

                    <div className="px-6 flex flex-col md:flex-row flex-wrap gap-8">
                        {services.map((service) => (
                            <SectionCard key={service.title} {...service} />
                        ))}
                    </div>
                </SectionLayout>
            </MainLayout>

            {/* About Section */}
            <About />

            {/* Footer */}
            <Footer />
        </>
    );
}
