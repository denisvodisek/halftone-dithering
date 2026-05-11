import Link from "next/link";
import { guides } from "@/lib/content/guides";

export function GuidesSection() {
  return (
    <section id="guides" className="scroll-mt-24 border-t border-border pt-12" aria-labelledby="guides-heading">
      <h2 id="guides-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
        How to tune halftone and dithering for portraits, print, and video
      </h2>
      <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
        Grid size controls how fine your dot screen looks; contrast and gamma shape readability. Error-diffusion methods
        like Floyd–Steinberg or Jarvis–Judice–Ninke spread quantization error across neighbors for smoother gradients,
        while ordered dithering gives a more regular, comic or newsprint feel. Use the split preview while you adjust
        settings so stills and motion stay balanced — then export PNG for pixels, SVG for vectors, or WebM when you are
        working with video.
      </p>
      <div className="mt-10 space-y-10">
        {guides.map((guide) => (
          <article key={guide.slug} className="max-w-3xl border-l-2 border-primary/30 pl-5">
            <h3 className="text-base font-semibold tracking-tight">
              <Link href={`/guides/${guide.slug}`} className="underline-offset-4 hover:underline">
                {guide.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guide.description}</p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-foreground/95">
              {guide.body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <Link
              href={`/guides/${guide.slug}`}
              className="mt-4 inline-flex text-sm font-medium text-foreground underline underline-offset-4"
            >
              Read the full guide
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
