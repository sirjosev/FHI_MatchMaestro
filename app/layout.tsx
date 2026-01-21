import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter for clean, modern look
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AI Match Scoring",
    description: "Next-Gen Match Scoring & Scheduling",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={cn(inter.className, "antialiased min-h-screen bg-background")}>
                <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
                {children}
            </body>
        </html>
    );
}
