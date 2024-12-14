import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/navbar";
import { ThemeProvider } from "@/providers/theme.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "zenSpace",
    description: "Your mental well being is our priority"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} bg-primary/10`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
