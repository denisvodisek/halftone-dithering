export interface Guide {
  slug: string;
  title: string;
  description: string;
  body: string[];
}

export const guides: Guide[] = [
  {
    slug: "best-halftone-settings-for-portraits",
    title: "Best Halftone Settings For Portraits",
    description:
      "Dial in flattering halftone portraits with smoother transitions, strong contrast control, and subtle texture.",
    body: [
      "Start with a medium grid size (16-24) to preserve facial features while keeping print character.",
      "Use slight smoothing (0.5-1.5) to reduce harsh skin artifacts.",
      "Try Jarvis-Judice-Ninke or Stucki for balanced detail and less aggressive noise.",
      "If you want graphic editorial style, use Burkes with higher contrast.",
    ],
  },
  {
    slug: "newspaper-vs-comic-dithering",
    title: "Newspaper Vs Comic Dithering",
    description:
      "Understand the visual differences between classic newsprint, comic-print, and posterized halftone treatments.",
    body: [
      "Newspaper style favors tighter grids and monochrome ink for authentic print texture.",
      "Comic style benefits from ordered dithering and cleaner edges.",
      "Posterized looks use stronger contrast and selective multicolor dots.",
      "Save each look into your local config library to compare quickly.",
    ],
  },
  {
    slug: "video-to-halftone-workflow",
    title: "Video To Halftone Workflow",
    description:
      "Process motion content with stable halftone settings and export clean WebM loops for creative campaigns.",
    body: [
      "Upload high-contrast clips for cleaner dot transitions between frames.",
      "Use split view while tuning grid size so detail remains readable in motion.",
      "Keep smoothing moderate to avoid flicker on high-frequency textures.",
      "Export WebM for animation pipelines and PNG/SVG for still assets.",
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
