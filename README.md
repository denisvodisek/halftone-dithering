# Halftone Dithering FX Platform

Next.js + shadcn UI production platform for halftone image/video processing, local saved configs, split-view inspection, SEO content pages, and ad-slot integration.

## Stack

- Next.js App Router + TypeScript
- shadcn UI preset (`b3lCH2fJ2`) and reusable components
- Tailwind CSS v4

## Features Delivered

- Upload image or video and process in realtime
- Dither algorithms: Jarvis-Judice-Ninke, Stucki, Burkes, Floyd-Steinberg, Ordered, Noise
- Split view inspector (original vs halftone)
- Local saved configs in `localStorage`
- Template packs for instant styles
- Export PNG, SVG, and WebM video
- SEO baseline:
  - metadata and OpenGraph/Twitter tags
  - JSON-LD (`SoftwareApplication` and FAQ)
  - dynamic `sitemap.xml` and `robots.txt`
  - guide pages for organic traffic
- CLS-safe ad placeholders (Google AdSense ready)

## Environment Variables

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SITE_URL=https://halftone-fx.com
NEXT_PUBLIC_ADSENSE_CLIENT=
NEXT_PUBLIC_AD_SLOT_TOP=
NEXT_PUBLIC_AD_SLOT_INLINE=
NEXT_PUBLIC_AD_SLOT_FOOTER=
```

## Canonical Domain (SEO — important)

The site must be indexed under **one** domain: `https://halftone-fx.com` (non-www, https).

- `lib/site-url.ts` defaults `SITE_URL` to `https://halftone-fx.com`, so canonical
  tags, the sitemap, and `robots.txt` are correct even if `NEXT_PUBLIC_SITE_URL`
  is unset. Set the env var anyway to be explicit.
- `next.config.ts` 301-redirects `www.halftone-fx.com` and the
  `halftone-dithering.vercel.app` host to the canonical origin.
- In **Vercel → Settings → Domains**, add both `halftone-fx.com` and
  `www.halftone-fx.com` and set `halftone-fx.com` as **Primary** so the platform
  handles www→non-www and http→https.
- Use a **Domain property** in Google Search Console so all host variants roll up
  into one view. "Page with redirect" and "Alternative page with proper canonical
  tag" are expected once variants are consolidated — they are not errors.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy To Vercel

1. Push repository to GitHub.
2. Import project in Vercel.
3. Add all environment variables from `.env.example`.
4. Deploy production.
5. Verify:
   - `/sitemap.xml`
   - `/robots.txt`
   - Upload + export flow

## Domain Suggestions

- `halftone.studio`
- `halftonefx.com`
- `ditherlab.io`
- `halftone.tools`
