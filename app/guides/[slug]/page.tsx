import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { getGuideBySlug, getGuideSlugs } from "@/lib/content/guides";
import { SITE_URL } from "@/lib/site-url";

interface GuideSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuideSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {};
  }

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `${SITE_URL}/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${SITE_URL}/guides/${guide.slug}`,
      type: "article",
    },
  };
}

export default async function GuideSlugPage({ params }: GuideSlugPageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    datePublished: guide.updatedAt,
    mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
  };

  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-3xl">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <Link href="/guides" className="text-sm text-muted-foreground underline underline-offset-4">
          Back to guides
        </Link>
        <header className="mt-6 border-l-2 border-primary/70 pl-5">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">Halftone guide</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{guide.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{guide.description}</p>
          <p className="mt-3 text-xs text-muted-foreground">Updated {guide.updatedAt}</p>
        </header>

        <div className="mt-10 space-y-10">
          {guide.sections.map((section, index) => (
            <section key={section.heading} aria-labelledby={`${guide.slug}-section-${index + 1}`}>
              <h3 id={`${guide.slug}-section-${index + 1}`} className="text-lg font-semibold tracking-tight">
                {section.heading}
              </h3>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.tips ? (
                <ul className="mt-5 list-inside list-disc space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {section.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </SiteShell>
  );
}
