import Link from "next/link";
import { Sparkles, ImageIcon, Type, Smartphone, Download, Palette, Wand2, Brush, Menu, X } from "lucide-react";
import { useState } from "react";
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const scrollToMobileApp = () => {
        const element = document.getElementById("mobile-app");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-16 w-full items-center justify-between px-6">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="animate-pulse-glow">
                                <Sparkles className="h-5 w-5 text-purple-300 transition-transform group-hover:scale-110" />
                            </div>
                            <span className="font-bold text-xl bg-white bg-clip-text text-transparent">Chitra AI</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <Link href="#features" className="transition-all hover:text-primary hover:scale-105">
                            Features
                        </Link>
                        <Link href="#how-it-works" className="transition-all hover:text-primary hover:scale-105">
                            How it Works
                        </Link>
                        <button
                            onClick={scrollToMobileApp}
                            className="transition-all hover:text-primary hover:scale-105"
                        >
                            Download App
                        </button>
                        <Link href="/delete-me" className="transition-all hover:text-primary hover:scale-105">
                            Delete Me
                        </Link>
                    </nav>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white focus:outline-none"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Nav Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden px-6 pb-4">
                        <nav className="flex flex-col space-y-4 text-sm font-medium text-white">
                            <Link href="#features" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">
                                Features
                            </Link>
                            <Link
                                href="#how-it-works"
                                onClick={() => setIsMenuOpen(false)}
                                className="hover:text-primary"
                            >
                                How it Works
                            </Link>
                            <Link
                                href="#mobile-app"
                                onClick={() => {
                                    scrollToMobileApp();
                                    setIsMenuOpen(false);
                                }}
                                className="hover:text-primary"
                            >
                                Download App
                            </Link>
                            <Link href="/delete-me" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">
                                Delete Me
                            </Link>
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}
