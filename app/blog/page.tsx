import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { posts } from "@/lib/content/posts";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Halftone & Dithering Blog — Effects, Tutorials, and Explainers",
  description:
    "How to make halftone and dithering effects: Photoshop alternatives, risograph and comic looks, screen-print prep, and plain-English explainers of the algorithms.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <SiteShell>
      <section className="max-w-3xl border-l-2 border-primary/70 pl-5" aria-labelledby="blog-heading">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">Blog</p>
        <h1 id="blog-heading" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Halftone and dithering, explained and applied
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Practical how-tos for specific looks — risograph, comic dots, pop art, screen printing — and clear
          explainers of the algorithms behind them. Every piece pairs with the live tool so you can try it on your own
          image straight away.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2" aria-label="Articles">
        {sorted.map((post) => (
          <article key={post.slug} className="flex h-full flex-col border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{post.category}</p>
            <h3 className="mt-3 text-base font-semibold tracking-tight">
              <Link href={`/blog/${post.slug}`} className="underline-offset-4 hover:underline">
                {post.title}
              </Link>
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-5 text-sm font-medium text-foreground underline underline-offset-4"
            >
              Read it
            </Link>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
