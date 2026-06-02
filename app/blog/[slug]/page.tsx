import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { getGuideBySlug } from "@/lib/content/guides";
import { getPostBySlug, getPostSlugs, getRelatedPosts, type PostBlock } from "@/lib/content/posts";
import { SITE_NAME } from "@/lib/site-config";
import { SITE_URL } from "@/lib/site-url";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className={block.lead ? "text-base font-medium text-foreground sm:text-lg" : undefined}>{block.text}</p>
      );
    case "heading":
      return <h2 className="!mt-12 text-xl font-semibold tracking-tight sm:text-2xl">{block.text}</h2>;
    case "subheading":
      return <h3 className="!mt-8 text-lg font-semibold tracking-tight">{block.text}</h3>;
    case "list":
      return (
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="rounded-lg border border-primary/30 bg-primary/5 p-5">
          {block.title ? <p className="text-sm font-semibold text-foreground">{block.title}</p> : null}
          <p className={`text-sm text-muted-foreground ${block.title ? "mt-2" : ""}`}>{block.text}</p>
        </aside>
      );
    case "cta":
      return (
        <aside className="rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-base font-semibold tracking-tight">{block.title}</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{block.text}</p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {block.buttonText}
          </Link>
        </aside>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const guideLinks = (post.guides ?? [])
    .map((guideSlug) => getGuideBySlug(guideSlug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.updatedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-3xl">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link href="/blog" className="underline underline-offset-4">
            Blog
          </Link>
        </nav>

        <header className="mt-6 border-l-2 border-primary/70 pl-5">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">{post.category}</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{post.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{post.description}</p>
          <p className="mt-3 text-xs text-muted-foreground">Updated {post.updatedAt}</p>
        </header>

        <div className="mt-10 space-y-5 text-sm leading-relaxed text-foreground/90 sm:text-base [&_h2]:text-foreground [&_h3]:text-foreground">
          {post.content.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>

        <section className="mt-14 border-t border-border pt-10" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6">
            {post.faq.map((item) => (
              <div key={item.question}>
                <dt className="text-base font-semibold tracking-tight">{item.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {(related.length > 0 || guideLinks.length > 0) && (
          <section className="mt-14 border-t border-border pt-10" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
              Keep reading
            </h2>
            <ul className="mt-6 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="text-sm font-medium text-foreground underline underline-offset-4 sm:text-base"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {guideLinks.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="text-sm font-medium text-foreground underline underline-offset-4 sm:text-base"
                  >
                    {guide.title}
                  </Link>
                  <span className="ml-2 text-xs uppercase tracking-wide text-muted-foreground">Guide</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </SiteShell>
  );
}
