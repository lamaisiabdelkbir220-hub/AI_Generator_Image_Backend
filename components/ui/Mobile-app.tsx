import Image from "next/image";
import { Badge } from "@/components/utils/landing-page/badge";
import { Smartphone, Download } from "lucide-react";
import { ScrollReveal } from "@/components/utils/landing-page/scroll-reveal";
import { Button } from "@/components/utils/landing-page/button";

export default function MobileApp() {
    return (
        <section id="mobile-app" className="w-full py-12 md:py-24 lg:py-32 relative">
            <div className="container px-4 md:px-6">
                <div className="grid items-center gap-8 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                    <ScrollReveal>
                        <div className="flex flex-col items-center md:items-start justify-center space-y-6">
                            <div className="space-y-4">
                                <Badge variant="secondary" className="animate-pulse-glow">
                                    <Smartphone className="mr-1 h-3 w-3" />
                                    Mobile App
                                </Badge>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-white bg-clip-text text-transparent">
                                    Create on the Go
                                </h2>
                                <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Take Chitra AI with you anywhere. Our mobile app brings the full power of AI image
                                    generation to your smartphone, with an intuitive touch interface designed for mobile
                                    creativity.
                                </p>
                            </div>
                            <ul className="md:grid gap-3 hidden py-4">
                                {[
                                    "Offline generation capabilities",
                                    "Cloud sync across devices",
                                    "Social sharing features",
                                    "Camera integration",
                                ].map((feature, index) => (
                                    <li key={index} className="hidden md:flex items-center gap-3 group">
                                        <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse group-hover:scale-150 transition-transform" />
                                        <span className="text-sm  group-hover:text-primary transition-colors">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-col items-center w-full gap-3 px-4 mt-4">
                                {/* iOS Button */}
                                <Button
                                    size="lg"
                                    className="h-12 w-full max-w-xs hover-lift glow-border animate-gradient text-white"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download for iOS (coming soon)
                                </Button>

                                {/* Android Button */}
                                <Button
                                    size="lg"
                                    className="h-12 w-full max-w-xs border border-white/10 hover:border-white/30"
                                    variant="outline"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download for Android (coming soon)
                                </Button>
                            </div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={300}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-violet-400/20 rounded-2xl blur-3xl animate-pulse"></div>
                            <Image
                                src="/chitra-home.png?height=600&width=400"
                                width={400}
                                height={600}
                                alt="Chitra AI Mobile App"
                                className="mx-auto aspect-[2/3] overflow-hidden rounded-2xl object-cover hover-lift animate-float relative z-10"
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
