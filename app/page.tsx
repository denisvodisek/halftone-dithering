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
        <section
          className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-card to-background px-6 py-10 sm:px-10 sm:py-14"
          aria-labelledby="intro-heading"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-[0.07] [background:radial-gradient(circle,currentColor_1.5px,transparent_1.6px)] [background-size:14px_14px] text-primary"
          />
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Free halftone &amp; dithering studio
          </p>
          <h1
            id="intro-heading"
            className="mt-4 max-w-4xl text-pretty text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl"
          >
            Turn any photo or video into <span className="text-primary">halftone dot art</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Drop in an image, drag a slider, watch the dots appear. Error-diffusion modes — Floyd–Steinberg,
            Jarvis–Judice–Ninke, Stucki, Burkes — or ordered and noise dither for a print or comic look. Live split
            preview, savable presets, and export to PNG, SVG, or WebM.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Floyd–Steinberg", "Ordered dither", "Custom mark shapes", "SVG export", "Video / WebM", "Split preview"].map(
              (pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground/80"
                >
                  {pill}
                </span>
              ),
            )}
          </div>
          <p className="mt-7 text-xs text-muted-foreground">
            Runs entirely in your browser · Your files never leave your device · No signup
          </p>
        </section>
        <HalftoneWorkbench />
      </div>
      <GuidesSection />
      <AdSlot name="Bottom banner ad" slot={process.env.NEXT_PUBLIC_AD_SLOT_INLINE ?? ADSENSE_SLOT_BOTTOM_BANNER} />
    </SiteShell>
  );
}
