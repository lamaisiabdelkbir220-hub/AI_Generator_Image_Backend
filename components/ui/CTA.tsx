import { Download } from "lucide-react";
import { Button } from "@/components/utils/landing-page/button";
import { ScrollReveal } from "@/components/utils/landing-page/scroll-reveal";

export default function CTA() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/chitra.png')] opacity-5"></div>
            <div className="absolute -inset-[100px] bg-primary/5 animate-morph blur-3xl"></div>
            <div className="container px-4 md:px-6 relative z-10">
                <ScrollReveal>
                    <div className="flex flex-col items-center justify-center space-y-6 text-center">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
                                Ready to Create Amazing Visuals?
                            </h2>
                            <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Join thousands of creators who are already using Chitra AI to bring their ideas to life.
                                Start your creative journey today.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 items-center justify-center md:flex-row w-full px-4 mt-4">
                            <Button
                                size="lg"
                                className="h-12 w-full max-w-xs hover-lift glow-border animate-gradient text-white"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download for iOS (coming soon)
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-[52px] w-full max-w-xs hover-lift border-primary/20 hover:border-primary"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download for Android (coming soon)
                            </Button>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
