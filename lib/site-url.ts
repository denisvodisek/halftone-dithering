/** Canonical production origin. Single source of truth for the indexable domain. */
export const CANONICAL_SITE_URL = "https://halftone-fx.com";

/** Site origin with no trailing slash. Used for metadata, sitemap, and robots. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return CANONICAL_SITE_URL;
}

export const SITE_URL = getSiteUrl();
