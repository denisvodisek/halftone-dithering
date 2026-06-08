import Link from "next/link";
import { guides } from "@/lib/content/guides";

export function GuidesSection() {
  return (
    <section id="guides" className="scroll-mt-24 border-t border-foreground/15 pt-12" aria-labelledby="guides-heading">
      <p className="mb-3 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        <span aria-hidden className="size-1.5 rounded-full bg-primary" />
        Field guide
      </p>
      <h2
        id="guides-heading"
        className="max-w-3xl text-balance font-display text-2xl font-bold tracking-tight sm:text-3xl"
      >
        How to tune halftone and dithering for portraits, print, and video
      </h2>
      <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
        Grid size controls how fine your dot screen looks; contrast and gamma shape readability. Error-diffusion methods
        like Floyd–Steinberg or Jarvis–Judice–Ninke spread quantization error across neighbors for smoother gradients,
        while ordered dithering gives a more regular, comic or newsprint feel. Use the split preview while you adjust
        settings so stills and motion stay balanced — then export PNG for pixels, SVG for vectors, or WebM when you are
        working with video.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {guides.map((guide, index) => (
          <article
            key={guide.slug}
            className="group flex flex-col border border-foreground/15 bg-card p-6 transition-colors hover:border-primary/50"
          >
            <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
              <Link href={`/guides/${guide.slug}`} className="underline-offset-4 hover:underline">
                {guide.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guide.description}</p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/90">
              {guide.body.map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-primary" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/guides/${guide.slug}`}
              className="mt-5 inline-flex w-fit items-center gap-1.5 text-xs font-medium uppercase tracking-[0.1em] text-foreground underline-offset-4 transition-colors group-hover:text-primary"
            >
              Read the full guide
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                {"\u2192"}
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
