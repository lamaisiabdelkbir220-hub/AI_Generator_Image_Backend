import { ScrollReveal } from "@/components/utils/landing-page/scroll-reveal";
import { Badge } from "@/components/utils/landing-page/badge";

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/20 relative">
            <div className="container px-4 md:px-6">
                <ScrollReveal>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <Badge variant="secondary" className="animate-pulse-glow">
                                Simple Process
                            </Badge>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-white bg-clip-text text-transparent">
                                Create in Three Easy Steps
                            </h2>
                            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Our intuitive interface makes AI image generation accessible to everyone, from creative
                                professionals to casual users.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
                <div className="mx-auto grid max-w-6xl items-start gap-8 py-12 lg:grid-cols-3 lg:gap-12">
                    {[
                        {
                            step: "1",
                            title: "Describe or Upload",
                            description:
                                "Either describe your vision in natural language or upload an existing image you want to transform.",
                            delay: 200,
                        },
                        {
                            step: "2",
                            title: "Customize Settings",
                            description:
                                "Choose your preferred style, resolution, and other parameters to fine-tune the generation process.",
                            delay: 400,
                        },
                        {
                            step: "3",
                            title: "Generate & Download",
                            description:
                                "Watch as our AI creates your unique visual content in seconds, then download in your preferred format.",
                            delay: 600,
                        },
                    ].map((item, index) => (
                        <ScrollReveal key={index} delay={item.delay}>
                            <div className="flex flex-col items-center space-y-4 text-center group hover-lift">
                                <div className="relative">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-violet-400 text-primary-foreground font-bold text-xl animate-pulse-glow group-hover:scale-110 transition-transform">
                                        {item.step}
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping group-hover:animate-none"></div>
                                </div>
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 group-hover:text-foreground text-[17px] transition-colors">
                                    {item.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
