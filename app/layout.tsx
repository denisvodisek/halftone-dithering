import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://halftone.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Halftone Dithering FX | Image and Video Halftone Studio",
    template: "%s | Halftone Dithering FX",
  },
  description: "Halftone dithering for images and video — presets, split view, PNG / SVG / WebM export.",
  keywords: [
    "halftone generator",
    "dithering tool",
    "image to halftone",
    "video halftone effect",
    "halftone presets",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Halftone Dithering FX",
    description: "Halftone dithering in the browser with presets and split view.",
    url: siteUrl,
    siteName: "Halftone Dithering FX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Halftone Dithering FX",
    description: "Upload images or video and export halftone PNG, SVG, or WebM.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
