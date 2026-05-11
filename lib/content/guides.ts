export interface Guide {
  slug: string;
  title: string;
  description: string;
  body: string[];
  updatedAt: string;
  sections: {
    heading: string;
    paragraphs: string[];
    tips?: string[];
  }[];
}

export const guides: Guide[] = [
  {
    slug: "best-halftone-settings-for-portraits",
    title: "Best Halftone Settings For Portraits",
    description:
      "Dial in flattering halftone portraits with smoother transitions, strong contrast control, and subtle texture.",
    updatedAt: "2026-05-11",
    body: [
      "Start with a medium grid size (16-24) to preserve facial features while keeping print character.",
      "Use slight smoothing (0.5-1.5) to reduce harsh skin artifacts.",
      "Try Jarvis-Judice-Ninke or Stucki for balanced detail and less aggressive noise.",
      "If you want graphic editorial style, use Burkes with higher contrast.",
    ],
    sections: [
      {
        heading: "Choose a dot grid that still respects facial structure",
        paragraphs: [
          "Portraits usually fail when the grid is either too fine to read as halftone or too coarse to hold eyes, lips, and hair edges. Start around 16-24 pixels on typical web images, then move in small steps while watching the split preview. A tighter grid keeps more likeness; a wider grid gives a stronger poster or screen-print result.",
          "For close-up faces, protect the eye line first. If the pupils and brow shape collapse into the same dot cluster, reduce grid size or lower contrast before changing algorithms. For full-body or environmental portraits, you can often push the grid larger because the overall silhouette carries more of the image.",
        ],
        tips: [
          "Use a medium grid for profile photos and a larger grid for graphic editorial treatments.",
          "Check the preview at the final display size, not only zoomed in.",
          "Keep enough negative space around the face so the dot pattern does not overpower the subject.",
        ],
      },
      {
        heading: "Use diffusion for skin and ordered dither for graphic style",
        paragraphs: [
          "Jarvis-Judice-Ninke and Stucki spread error farther than Floyd-Steinberg, so gradients on cheeks and backgrounds often look calmer. They are useful when you want the portrait to remain flattering while still showing a visible dither texture. Burkes can feel sharper and punchier, especially on high-contrast black-and-white images.",
          "Ordered dithering is better when the goal is a controlled print pattern rather than photographic smoothness. It gives a more regular structure that works well for comic panels, zines, album art, and posters. If ordered dither makes skin look too mechanical, reduce contrast or increase smoothing slightly.",
        ],
      },
      {
        heading: "Balance contrast, gamma, and smoothing before export",
        paragraphs: [
          "Contrast should define the portrait, not crush it. Increase contrast until the main features are readable, then adjust gamma to recover midtones. A small amount of smoothing can remove noisy skin artifacts, but too much smoothing can erase freckles, eyelashes, and fabric texture.",
          "Before exporting, compare the processed output against the original with the split line across the most important feature. Export PNG for web posts, SVG when you need scalable dots for print or vector editing, and save the settings as a local preset if you expect to process a series with the same lighting.",
        ],
        tips: [
          "Raise contrast in small increments after choosing the algorithm.",
          "Use SVG for posters, stickers, or large-format print work.",
          "Save one gentle preset and one high-impact preset for the same portrait batch.",
        ],
      },
    ],
  },
  {
    slug: "newspaper-vs-comic-dithering",
    title: "Newspaper Vs Comic Dithering",
    description:
      "Understand the visual differences between classic newsprint, comic-print, and posterized halftone treatments.",
    updatedAt: "2026-05-11",
    body: [
      "Newspaper style favors tighter grids and monochrome ink for authentic print texture.",
      "Comic style benefits from ordered dithering and cleaner edges.",
      "Posterized looks use stronger contrast and selective multicolor dots.",
      "Save each look into your local config library to compare quickly.",
    ],
    sections: [
      {
        heading: "Newspaper halftone favors texture and tonal compression",
        paragraphs: [
          "A newspaper-inspired look is built around economy: limited tones, visible dots, and a screen that feels mechanical without becoming perfectly clean. Use a tighter grid and lower saturation when you want the image to read like ink on porous paper. Floyd-Steinberg or Burkes can work well when the source image already has clear lights and shadows.",
          "The most convincing newsprint settings usually leave a little imperfection. Do not chase perfectly smooth gradients. Let shadows break into dot clusters and let highlights stay mostly open so the result has the roughness of printed reproduction.",
        ],
        tips: [
          "Use monochrome or near-monochrome palettes for classic newspaper character.",
          "Avoid excessive sharpening before upload because it can create noisy dot edges.",
          "Keep backgrounds simple so the screen pattern does not compete with the subject.",
        ],
      },
      {
        heading: "Comic dithering needs cleaner shapes and stronger silhouettes",
        paragraphs: [
          "Comic-style images benefit from crisp edges, readable contours, and a pattern that supports the drawing instead of hiding it. Ordered dithering is often the best starting point because the matrix produces a regular visual rhythm. Raise contrast enough that the subject separates clearly from the background, then tune grid size to match the line weight of the artwork.",
          "For color comic treatments, think in layers. A simple black dot pattern over a limited color base usually reads better than trying to preserve every tone from the original. If the image becomes muddy, reduce the number of competing details rather than adding more contrast.",
        ],
      },
      {
        heading: "Choose the export based on where the artwork will live",
        paragraphs: [
          "For social posts, PNG is usually the quickest output because it preserves the exact preview pixels. For posters, shirts, stickers, or risograph-style experiments, SVG gives you editable dot shapes that can be recolored or scaled in a design tool. If you are building a motion loop, test a short clip first so you can catch flicker before exporting the full video.",
          "A useful workflow is to save separate presets for newspaper, comic, and poster treatments, then apply each preset to the same source image. Comparing the three outputs side by side makes it easier to see whether the project needs grit, clean graphic rhythm, or bold simplified shapes.",
        ],
        tips: [
          "Choose PNG for fixed-size publishing.",
          "Choose SVG when dots need to remain editable.",
          "Choose WebM for short animated halftone loops.",
        ],
      },
    ],
  },
  {
    slug: "video-to-halftone-workflow",
    title: "Video To Halftone Workflow",
    description:
      "Process motion content with stable halftone settings and export clean WebM loops for creative campaigns.",
    updatedAt: "2026-05-11",
    body: [
      "Upload high-contrast clips for cleaner dot transitions between frames.",
      "Use split view while tuning grid size so detail remains readable in motion.",
      "Keep smoothing moderate to avoid flicker on high-frequency textures.",
      "Export WebM for animation pipelines and PNG/SVG for still assets.",
    ],
    sections: [
      {
        heading: "Start with footage that has clear motion and simple lighting",
        paragraphs: [
          "Halftone video works best when the clip has a strong subject, readable contrast, and limited camera shake. Busy textures can shimmer because small changes between frames alter the dot pattern. Before changing tool settings, trim to a representative section and preview the most detailed moment in the clip.",
          "If the source footage is flat, increase contrast enough to separate foreground and background before pushing grid size. If the footage already has harsh highlights, lower contrast or adjust gamma so bright areas do not disappear into blank space.",
        ],
        tips: [
          "Use short test exports before processing a full sequence.",
          "Avoid clips with heavy compression artifacts when possible.",
          "Keep the subject large enough that the dot grid can describe its movement.",
        ],
      },
      {
        heading: "Tune for temporal stability, not just one perfect frame",
        paragraphs: [
          "A still frame can look excellent while the moving result flickers. Watch the preview for edges that crawl, backgrounds that pulse, or fine texture that changes too quickly. Moderate smoothing can make motion more stable, but excessive smoothing can make the video feel soft and disconnected from the source.",
          "Ordered dither gives predictable structure, which can be helpful for graphic loops. Error diffusion can look more organic, but it may produce more frame-to-frame texture movement. The right choice depends on whether the project needs clean motion graphics or a rougher analog print effect.",
        ],
      },
      {
        heading: "Export and reuse settings deliberately",
        paragraphs: [
          "Export WebM when you need a browser-friendly animation or a quick creative preview. For campaigns that also need static thumbnails, pause on a strong frame and export PNG or SVG with the same settings. Keeping the same preset across still and motion assets helps the final set feel consistent.",
          "Save a local preset once the loop is stable. If you process multiple clips from the same shoot, reuse that preset first, then make only small adjustments for exposure differences. This keeps the dot size, mark shape, and contrast language consistent across the whole series.",
        ],
        tips: [
          "Use the split preview while the clip is moving, not only while paused.",
          "Export a still frame for thumbnails after the video look is approved.",
          "Keep one preset per campaign so related assets share the same visual system.",
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuideSlugs() {
  return guides.map((guide) => guide.slug);
}
