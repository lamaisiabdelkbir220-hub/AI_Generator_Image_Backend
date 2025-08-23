import { ScrollReveal } from "@/components/utils/landing-page/scroll-reveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/utils/landing-page/card";
import { Badge } from "@/components/utils/landing-page/badge";
import { Palette, Wand2, Brush } from "lucide-react";
import Image from "next/image";

export default function Retouch() {
    return (
        <section id="retouch" className="w-full py-12 md:py-24 lg:py-32 relative">
            <div className="container px-4 md:px-6">
                <ScrollReveal>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <Badge variant="secondary" className="animate-pulse-glow">
                                <Palette className="mr-1 h-3 w-3" />
                                Advanced Retouching
                            </Badge>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-white bg-clip-text text-transparent">
                                Professional Image Retouching
                            </h2>
                            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Perfect your images with AI-powered retouching tools that enhance, restore, and refine
                                your visuals with professional-grade precision.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
                <div className="mx-auto grid max-w-6xl items-start gap-8 py-12 lg:grid-cols-3 lg:gap-12">
                    {[
                        {
                            icon: Wand2,
                            title: "Smart Enhancement",
                            description:
                                "Automatically enhance colors, contrast, and sharpness with AI-powered algorithms.",
                            features: [
                                "Auto color correction",
                                "Noise reduction",
                                "Smart sharpening",
                                "Dynamic range optimization",
                            ],
                            delay: 200,
                        },
                        {
                            icon: Brush,
                            title: "Object Removal",
                            description: "Remove unwanted objects, people, or blemishes seamlessly from your images.",
                            features: [
                                "Content-aware fill",
                                "Background cleanup",
                                "Blemish removal",
                                "Watermark removal",
                            ],
                            delay: 400,
                        },
                        {
                            icon: Palette,
                            title: "Style Transfer",
                            description:
                                "Apply artistic styles and filters to transform the mood and aesthetic of your images.",
                            features: ["Artistic filters", "Mood adjustment", "Color grading", "Vintage effects"],
                            delay: 600,
                        },
                    ].map((item, index) => (
                        <ScrollReveal key={index} delay={item.delay}>
                            <Card className="relative overflow-hidden hover-lift glow-border bg-card/50 backdrop-blur-3xl border-primary/20 h-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <div className="p-2 rounded-lg bg-primary/10 animate-pulse-glow">
                                            <item.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl">{item.title}</CardTitle>
                                    </div>
                                    <CardDescription className="text-gray-400">{item.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2 flex flex-col items-start">
                                        <h4 className="font-semibold text-violet-500">Capabilities:</h4>
                                        <ul className="space-y-2 text-sm text-gray-400">
                                            {item.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-center space-x-2">
                                                    <div className="w-1 h-1 bg-violet-500 rounded-full animate-pulse"></div>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="pt-4">
                                        <div className="relative rounded-lg overflow-hidden">
                                            <Image
                                                src="/chitra-home-square.png?height=150&width=300"
                                                width={300}
                                                height={150}
                                                alt={`${item.title} Example`}
                                                className="object-cover w-full transition-transform hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
