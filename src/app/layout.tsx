import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/Navbar";
import { type ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Tanstack Query demo",
    description: "A demo of Tanstack query and next.js, compared to the standard useEffect and useState hooks.",
};

/**
 * The root layout for the application.
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="flex min-h-screen flex-col p-4 text-blue-gray-200">
                    <SiteNav />
                    {children}
                </main>
            </body>
        </html>
    );
}
