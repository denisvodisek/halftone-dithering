import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { guides } from "@/lib/content/guides";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Halftone And Dithering Guides",
  description:
    "Practical guides for choosing halftone settings, dithering algorithms, dot grids, and export formats for portraits, print-style artwork, and video.",
  alternates: { canonical: `${SITE_URL}/guides` },
};

export default function GuidesPage() {
  return (
    <SiteShell>
      <section className="max-w-3xl border-l-2 border-primary/70 pl-5" aria-labelledby="guides-heading">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">Halftone guides</p>
        <h2 id="guides-heading" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Learn how to tune halftone and dithering effects
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          These guides explain how grid size, contrast, smoothing, and dither algorithms affect real output. Use them
          with the live workbench when you need a repeatable look for portraits, print-style graphics, or motion assets.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3" aria-label="Guide list">
        {guides.map((guide) => (
          <article key={guide.slug} className="flex h-full flex-col border border-border bg-card p-5">
            <h3 className="text-base font-semibold tracking-tight">
              <Link href={`/guides/${guide.slug}`} className="underline-offset-4 hover:underline">
                {guide.title}
              </Link>
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{guide.description}</p>
            <Link
              href={`/guides/${guide.slug}`}
              className="mt-5 text-sm font-medium text-foreground underline underline-offset-4"
            >
              Read the guide
            </Link>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
