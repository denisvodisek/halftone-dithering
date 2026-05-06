import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/ad-slot";
import { GuidesSection } from "@/components/home/guides-section";
import { HalftoneWorkbench } from "@/components/halftone/workbench";
import { SiteShell } from "@/components/layout/site-shell";
import { ADSENSE_SLOT_BOTTOM_BANNER } from "@/lib/adsense";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: {
    absolute:
      "Free Halftone Generator & Dithering Tool — Images, Video, SVG & WebM | Halftone Dithering FX",
  },
  description:
    "Create halftone art from photos and video in your browser. Floyd–Steinberg, Jarvis, Stucki, Burkes, ordered dither, customizable mark shapes, split preview, presets. Export PNG, SVG, or WebM — no signup.",
  keywords: [
    "halftone generator",
    "halftone effect online",
    "image dithering tool",
    "dot screen generator",
    "Floyd Steinberg dithering",
    "error diffusion",
    "ordered dithering",
    "video halftone",
    "halftone SVG export",
    "photo to halftone",
    "halftone shapes",
    "square halftone",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Halftone Dithering FX — Free Online Halftone & Dithering Generator",
    description:
      "Turn images and video into halftone artwork. Classic dither algorithms, mark shapes, live split preview, PNG / SVG / WebM export.",
    url: SITE_URL,
    type: "website",
    locale: "en_US",
    siteName: "Halftone Dithering FX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Halftone Dithering FX — Online Halftone Generator",
    description:
      "Halftone marks, error diffusion, and dither presets in the browser. Export PNG, SVG, or halftone video.",
  },
};

export default function HomePage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Halftone Dithering FX",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online halftone generator and dithering tool for images and video. Error diffusion and ordered dither, customizable mark shapes, split preview, local presets, PNG SVG and WebM export.",
    url: SITE_URL,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best halftone dithering algorithm for photos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For natural gradients on portraits and photos, Jarvis–Judice–Ninke or Stucki error diffusion often looks smoother than Floyd–Steinberg. For a sharper newsprint or comic look, try Burkes or ordered (Bayer-style) dithering with a tighter dot grid.",
        },
      },
      {
        "@type": "Question",
        name: "Can I export halftone as SVG?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Export SVG to get vector circles for each dot so you can scale for print or further edit in design tools.",
        },
      },
      {
        "@type": "Question",
        name: "Does it work with video?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Upload a video file to preview halftone in real time and export a WebM recording of the processed output.",
        },
      },
      {
        "@type": "Question",
        name: "Can I save my halftone presets?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Save configurations in your browser and reload them from the preset list; template packs give one-click starting points.",
        },
      },
    ],
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="space-y-6">
        <section className="border-l-2 border-primary/70 pl-5" aria-labelledby="intro-heading">
          <div className="space-y-4">
            <h2
              id="intro-heading"
              className="max-w-3xl text-pretty text-lg font-semibold leading-snug tracking-tight sm:text-xl"
            >
              Turn photos and video into halftone dot art — free in your browser
            </h2>
            <div className="max-w-3xl space-y-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                <strong className="font-medium text-foreground">Halftone Dithering FX</strong> is an online halftone
                generator and image dithering tool. Upload a picture or MP4/WebM clip, set your dot grid, brightness,
                and contrast, then choose classic{" "}
                <span className="text-foreground/90">error-diffusion</span> modes — Floyd–Steinberg,
                Jarvis–Judice–Ninke, Stucki, or Burkes — or switch to <span className="text-foreground/90">ordered</span>{" "}
                and <span className="text-foreground/90">noise</span> dither for a print or comic look.
              </p>
              <p>
                Compare before and after with a <span className="text-foreground/90">draggable split line</span> on the
                preview, save looks as local presets, and export production-ready{" "}
                <span className="text-foreground/90">PNG</span>, scalable <span className="text-foreground/90">SVG</span>{" "}
                halftone dots, or <span className="text-foreground/90">WebM</span> when you are processing motion — no
                account required.
              </p>
            </div>
          </div>
        </section>
        <HalftoneWorkbench />
      </div>
      <AdSlot name="Bottom banner ad" slot={process.env.NEXT_PUBLIC_AD_SLOT_INLINE ?? ADSENSE_SLOT_BOTTOM_BANNER} />
      <GuidesSection />
    </SiteShell>
  );
}
