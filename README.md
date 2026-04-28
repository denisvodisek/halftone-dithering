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
NEXT_PUBLIC_SITE_URL=https://halftone.studio
NEXT_PUBLIC_ADSENSE_CLIENT=
NEXT_PUBLIC_AD_SLOT_TOP=
NEXT_PUBLIC_AD_SLOT_INLINE=
NEXT_PUBLIC_AD_SLOT_FOOTER=
```

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
