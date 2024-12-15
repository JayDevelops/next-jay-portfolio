import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/Navigation/Navigation";
import { Toaster } from "@/components/ui/toaster";
import "@code-hike/mdx/dist/index.css";
import { cn } from "@/lib/utils";
import PlausibleProvider from "next-plausible";

const inter = Inter({ subsets: ["latin"] });

const descriptionText: string =
  "Unlock the potential of your business needs with Jesus Perez Arias, " +
  "a seasoned professional software engineer with extensive expertise in crafting exceptional FullStack and Mobile Applications. " +
  "Jesus is open for hire in full-time or freelance opportunities, with his " +
  "rich background spanning three years, Jesus specializes in full-stack technologies, including React, React Native, Next.js, TypeScript, MongoDB, and Node.js. " +
  "Known for strong communication skills in technology topics and educator, Jesus is the ideal person for bringing your visionary projects to life.";

export const metadata: Metadata = {
  title: {
    default: "Jesus Perez Developer Portfolio",
    template: `%s | Jesus Perez Developer Portfolio`,
  },
  description: descriptionText,
  category: "technology",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Developer",
    "Portfolio",
    "MongoDB",
    "SQL",
    "Fullstack",
    "Web Development",
    "Mobile Development",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesus Perez Developer Portfolio",
    description: descriptionText,
    creator: "@jay_develops_",
    images: ["https://jesusperez.dev/og.png"], // Must be an absolute URL
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider
          domain="jesusperez.dev"
          trackOutboundLinks
          trackFileDownloads
          selfHosted
        />
      </head>
      <body
        className={cn(
          "flex flex-col md:flex-row md:mt-2 lg:mx-auto min-h-screen",
          inter.className
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col bg-background max-w-6xl mx-auto">
            <Navigation />
            <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
              {children}
            </main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
