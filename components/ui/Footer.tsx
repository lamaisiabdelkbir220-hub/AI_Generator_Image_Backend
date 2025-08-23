import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6 border-t border-border/40 bg-card/20 backdrop-blur-3xl relative z-20">
            <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <p className="text-xs text-gray-400">© 2024 Chitra AI. All rights reserved.</p>
            </div>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link
                    href="/terms-of-service"
                    className="text-xs hover:underline underline-offset-4 hover:text-primary transition-colors"
                >
                    Terms of Service
                </Link>
                <Link
                    href="/privacy-policy"
                    className="text-xs hover:underline underline-offset-4 hover:text-primary transition-colors"
                >
                    Privacy Policy
                </Link>
                <Link
                    href="/delete-me"
                    className="text-xs hover:underline underline-offset-4 hover:text-primary transition-colors"
                >
                    Delete Account
                </Link>
            </nav>
        </footer>
    );
}
