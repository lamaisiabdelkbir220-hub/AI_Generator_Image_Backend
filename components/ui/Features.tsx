import { ScrollReveal } from "@/components/utils/landing-page/scroll-reveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/utils/landing-page/card";
import { Badge } from "@/components/utils/landing-page/badge";
import { Type, ImageIcon } from "lucide-react";
import Image from "next/image";

export default function Features() {
    return (
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/20 relative">
            <div className="container px-4 md:px-6">
                <ScrollReveal>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <Badge variant="secondary" className="animate-pulse-glow">
                                Core Features
                            </Badge>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-white bg-clip-text text-transparent">
                                Powerful AI Generation Capabilities
                            </h2>
                            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Experience the future of visual content creation with our advanced AI models designed
                                for both beginners and professionals.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
                <div className="mx-auto grid max-w-6xl items-start gap-8 py-12 lg:grid-cols-2 lg:gap-12">
                    <ScrollReveal delay={200}>
                        <Card className="relative overflow-hidden hover-lift glow-border bg-card/50 backdrop-blur-3xl border-primary/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <div className="p-2 rounded-lg bg-primary/10 animate-pulse-glow">
                                        <Type className="h-6 w-6 text-violet-500" />
                                    </div>
                                    <CardTitle className="text-xl">Text-to-Image Generation</CardTitle>
                                </div>
                                <CardDescription className="text-gray-400">
                                    Transform your written descriptions into stunning visual artwork with our advanced
                                    AI models.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 flex flex-col items-start">
                                    <h4 className="font-semibold text-violet-500">Key Features:</h4>
                                    <ul className="space-y-2 text-sm text-gray-400">
                                        <li className="flex items-center space-x-2">
                                            <div className="w-1 h-1 bg-violet-500 rounded-full animate-pulse"></div>
                                            <span>Natural language processing for detailed prompts</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <div className="w-1 h-1 bg-violet-500 rounded-full animate-pulse"></div>
                                            <span>Multiple art styles and genres</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <div className="w-1 h-1 bg-violet-500 rounded-full animate-pulse"></div>
                                            <span>High-resolution output up to 4K</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <div className="w-1 h-1 bg-violet-500 rounded-full animate-pulse"></div>
                                            <span>Batch generation capabilities</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="pt-4">
                                    <div className="relative rounded-lg overflow-hidden">
                                        <Image
                                            src="/chitra-home-square.png?height=200&width=350"
                                            width={350}
                                            height={200}
                                            alt="Text-to-Image Example"
                                            className="object-cover w-full transition-transform hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    <ScrollReveal delay={400}>
                        <Card className="relative overflow-hidden hover-lift glow-border bg-card/50 backdrop-blur-3xl border-primary/20">
                            <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent"></div>
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <div className="p-2 rounded-lg bg-primary/10 animate-pulse-glow">
                                        <ImageIcon className="h-6 w-6 text-violet-500" />
                                    </div>
                                    <CardTitle className="text-xl">Image-to-Image Transformation</CardTitle>
                                </div>
                                <CardDescription className="text-gray-400">
                                    Upload existing images and transform them into new artistic creations while
                                    preserving key elements.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 flex flex-col items-start">
                                    <h4 className="font-semibold text-violet-500">Key Features:</h4>
                                    <ul className="space-y-2 text-sm text-gray-400">
                                        <li className="flex items-center space-x-2">
                                            <div className="w-1 h-1 bg-violet-500 rounded-full animate-pulse"></div>
                                            <span>Style transfer and artistic filters</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <div className="w-1 h-1 bg-violet-500 rounded-full animate-pulse"></div>
                                            <span>Content-aware modifications</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <div className="w-1 h-1 bg-violet-500 rounded-full animate-pulse"></div>
                                            <span>Preserve or modify specific elements</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <div className="w-1 h-1 bg-violet-500 rounded-full animate-pulse"></div>
                                            <span>Multiple transformation options</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="pt-4">
                                    <div className="relative rounded-lg overflow-hidden">
                                        <Image
                                            src="/chitra-home-square.png?height=200&width=350"
                                            width={350}
                                            height={200}
                                            alt="Image-to-Image Example"
                                            className="object-cover w-full transition-transform hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
