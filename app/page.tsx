import { AdSlot } from "@/components/ads/ad-slot";
import { GuidesSection } from "@/components/home/guides-section";
import { HalftoneWorkbench } from "@/components/halftone/workbench";
import { SiteShell } from "@/components/layout/site-shell";

export default function HomePage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Halftone Dithering FX",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Halftone and dithering for images and video — split view, presets, exports.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I upload both image and video files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The workspace supports images and looping video sources with realtime halftone processing.",
        },
      },
      {
        "@type": "Question",
        name: "Can I save and reuse my favorite settings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Save local configs in your browser and reapply them instantly from the style library.",
        },
      },
    ],
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="space-y-2">
        <p className="max-w-2xl text-sm text-muted-foreground">
          Upload an image or video, tweak grid and dithering, use split view to check the result, then export PNG, SVG,
          or WebM. Original halftone idea from{" "}
          <a
            href="https://codepen.io/Mikhail-Bespalov/pen/dPyyZed"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            Mike Bespalov
          </a>
          .
        </p>
      </section>
      <HalftoneWorkbench />
      <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_INLINE ?? "3333333333"} />
      <GuidesSection />
    </SiteShell>
  );
}
