/** Site origin with no trailing slash. Used for metadata, sitemap, and robots. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return "https://halftone-dithering.vercel.app";
}

export const SITE_URL = getSiteUrl();
