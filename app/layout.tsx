import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ADSENSE_CLIENT_ID } from "@/lib/adsense";
import { SITE_URL } from "@/lib/site-url";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Halftone Dithering FX",
  title: {
    default: "Halftone Dithering FX — Free Halftone & Dithering Generator",
    template: "%s | Halftone Dithering FX",
  },
  description:
    "Free halftone generator for images and video. Error diffusion, ordered dither, dot shapes (circle, square, triangle, and more), split preview, presets. Export PNG, SVG, WebM.",
  keywords: [
    "halftone generator",
    "halftone effect",
    "dithering tool",
    "image to halftone",
    "video halftone",
    "Floyd Steinberg",
    "SVG halftone",
    "dot pattern",
    "halftone shapes",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Halftone Dithering FX — Free Halftone & Dithering Generator",
    description:
      "Online halftone and dithering for photos and video — multiple algorithms, customizable marks, split preview, PNG / SVG / WebM.",
    url: SITE_URL,
    siteName: "Halftone Dithering FX",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Halftone Dithering FX — Free Halftone Generator",
    description:
      "Browser halftone generator with dither presets, mark shapes, and export to PNG, SVG, or WebM.",
  },
  other: {
    "google-adsense-account": ADSENSE_CLIENT_ID,
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
        <Script
          id="adsbygoogle-js"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
