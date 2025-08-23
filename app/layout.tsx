import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Chitra AI - Transform Ideas into Stunning Visuals",
    description:
        "AI-powered text-to-image and image-to-image generation. Create unique visual content in seconds with Chitra AI's cutting-edge technology.",
    keywords: [
        "AI image generation",
        "AI",
        "image generation",
        "text-to-image",
        "image-to-image",
        "artificial intelligence",
        "visual content",
        "creative tools",
    ],
    authors: [
        {
            name: "Chitra AI Team",
            url: "https://chitra.ai",
        },
        {
            name: "Gautam Suthar",
            url: "https://gautamsuthar.in",
        },
        {
            name: "Jaydeep Suthar",
            url: "https://github.com/jaydeepsuthar",
        },
    ],
    creator: "Chitra AI Team",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
        </html>
    );
}
