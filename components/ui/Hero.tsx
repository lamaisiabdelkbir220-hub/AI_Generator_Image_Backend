import { ScrollReveal } from "@/components/utils/landing-page/scroll-reveal";
import { Badge } from "@/components/utils/landing-page/badge";
import { Sparkles, Download } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/utils/landing-page/button";

export default function Hero() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-8 text-center">
                    <div className="space-y-6 animate-fade-in-up">
                        <Badge variant="secondary" className="mb-4 animate-pulse-glow hover-lift">
                            <Sparkles className="mr-1 h-3 w-3" />
                            AI-Powered Image Generation
                        </Badge>

                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl lg:leading-none">
                            Transform Ideas into
                            <span className="block bg-gradient-to-r from-purple-500 via-violet-400 to-purple-500 bg-clip-text text-transparent">
                                Stunning Visuals
                            </span>
                        </h1>

                        <p
                            className="mx-auto max-w-[700px] text-gray-400 md:text-xl animate-fade-in-up"
                            style={{ animationDelay: "0.2s" }}
                        >
                            Chitra AI brings your imagination to life with cutting-edge text-to-image and image-to-image
                            generation. Create unique visual content in seconds, whether you're starting from scratch or
                            transforming existing images.
                        </p>
                    </div>

                    {/* Download Buttons */}
                    <div
                        className="flex flex-row justify-center items-center gap-4 animate-fade-in-up"
                        style={{ animationDelay: "0.4s" }}
                    >
                        <Button
                            size="lg"
                            className="h-12 md:w-52 w-44 px-0 flex justify-center items-center hover-lift glow-border animate-gradient text-white gap-2"
                        >
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Download for iOS</span>
                            <span className="inline sm:hidden">iOS</span>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="h-[52px] md:w-52 w-44 px-0 flex justify-center items-center hover-lift border-primary/20 hover:glow-border hover:animate-gradient text-white gap-2"
                        >
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Download for Android</span>
                            <span className="inline sm:hidden">Android</span>
                        </Button>
                    </div>

                    <ScrollReveal delay={600}>
                        <div className="w-full max-w-5xl mt-16">
                            <div className="relative animate-float rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-3xl p-6 hover-lift shimmer-effect">
                                <Image
                                    src="/chitra.png?height=800&width=350"
                                    width={900}
                                    height={500}
                                    alt="Chitra AI Interface Preview"
                                    className="rounded-xl object-cover w-full "
                                />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
