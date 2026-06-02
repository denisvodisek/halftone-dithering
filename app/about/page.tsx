import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { SITE_NAME } from "@/lib/site-config";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "About Halftone Dithering FX",
  description:
    "What Halftone Dithering FX is, how the in-browser halftone and dithering engine works, and the design principles behind the tool.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-3xl">
        <header className="border-l-2 border-primary/70 pl-5">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">About</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">About {SITE_NAME}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            A free, browser-based halftone generator and dithering studio for designers, illustrators, and anyone who
            likes the look of printed dots.
          </p>
        </header>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/90 sm:text-base">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">What this tool does</h3>
            <p>
              {SITE_NAME} turns photos and video into halftone dot art directly in your browser. You can choose between
              classic error-diffusion algorithms — Floyd–Steinberg, Jarvis–Judice–Ninke, Stucki, and Burkes — or switch
              to ordered and noise dithering for a sharper print or comic look. Dot grid size, brightness, contrast,
              gamma, smoothing, and mark shape are all adjustable, and a draggable split preview lets you compare the
              original against the processed result in real time.
            </p>
            <p>
              When a look is dialled in, you can export a production-ready PNG, a scalable SVG made of individual vector
              dots for print and large-format work, or a WebM recording when you are processing motion. Settings can be
              saved as local presets so a repeatable style can be reused across an entire batch or campaign.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Everything runs in your browser</h3>
            <p>
              There is no upload step and no account. Images and video you open are processed locally on your own device
              using the Canvas and WebGL APIs — the files never leave your computer and are never sent to a server. Saved
              presets live in your browser&apos;s local storage, not in a database we control. This keeps the tool fast,
              private, and usable offline once the page has loaded.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Who it is for</h3>
            <p>
              The tool started as a way to get authentic newsprint, risograph, and comic-print textures without bouncing
              between heavy desktop applications. It is built for illustrators making zines and posters, social media
              creators who want a recognisable graphic style, and developers prototyping retro or print-inspired
              interfaces. The{" "}
              <Link href="/guides" className="font-medium underline underline-offset-4">
                guides
              </Link>{" "}
              walk through practical settings for portraits, print styles, and video so you can get a usable result
              quickly.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Questions or feedback</h3>
            <p>
              Suggestions, bug reports, and feature requests are welcome. Head to the{" "}
              <Link href="/contact" className="font-medium underline underline-offset-4">
                contact page
              </Link>{" "}
              to get in touch.
            </p>
          </section>
        </div>
      </article>
    </SiteShell>
  );
}
