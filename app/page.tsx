"use client";

import { GeometricBackground } from "@/components/utils/landing-page/geometric-background";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/ui/Hero";
import Features from "@/components/ui/Features";
import HowItWorks from "@/components/ui/How-it-works";
import MobileApp from "@/components/ui/Mobile-app";
import CTA from "@/components/ui/CTA";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-screen bg-background text-foreground relative ">
            <GeometricBackground />
            <Header />
            <main className="flex-1 relative z-20 w-full md:w-auto">
                <Hero />
                <Features />
                <HowItWorks />
                <MobileApp />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
