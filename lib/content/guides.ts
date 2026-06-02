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
  {
    slug: "what-is-halftone-and-dithering",
    title: "What Is Halftone And Dithering?",
    description:
      "A beginner-friendly explanation of halftone and dithering — what they are, why they exist, and how they differ.",
    updatedAt: "2026-06-02",
    body: [
      "Halftone reproduces continuous tone using dots of varying size or spacing.",
      "Dithering simulates extra colors or shades by arranging a limited palette.",
      "Both techniques trade smooth gradients for structured, printable patterns.",
      "Understanding the difference helps you pick the right look for your project.",
    ],
    sections: [
      {
        heading: "Halftone: simulating shades with dots",
        paragraphs: [
          "Halftone is a printing technique that recreates smooth gradients using a pattern of dots. Because traditional presses can only lay down solid ink or no ink, they fake the appearance of grey or lighter tones by varying the size and spacing of tiny dots. Larger, denser dots read as darker areas; smaller, sparser dots read as lighter areas. From a normal viewing distance your eye blends the pattern back into a continuous tone.",
          "This is why newspapers, comics, and screen-printed posters have that characteristic dotted texture. The same idea powers the halftone effect in this tool: instead of preserving every pixel, the image is sampled on a grid and each cell is drawn as a mark whose size reflects the brightness of that region.",
        ],
        tips: [
          "Smaller grid sizes preserve more detail; larger grids create a bolder, more graphic look.",
          "Halftone reads best when the source image has clear contrast between light and dark areas.",
        ],
      },
      {
        heading: "Dithering: faking colors with a limited palette",
        paragraphs: [
          "Dithering solves a related problem: how to represent many shades or colors when only a few are available. Instead of using a single flat color for an area, dithering scatters pixels from a small palette so that, viewed together, they approximate the original tone. This is how early computers displayed photographic images on screens limited to 16 or 256 colors, and why retro game art has that recognisable grainy texture.",
          "Error-diffusion dithering — including Floyd–Steinberg, Jarvis–Judice–Ninke, Stucki, and Burkes — works by pushing the rounding error from each pixel into its neighbours, which produces organic, photographic-looking results. Ordered dithering instead uses a fixed matrix, giving a regular, screen-like pattern that is more predictable and often better for graphic or animated work.",
        ],
        tips: [
          "Use error diffusion for natural photos and smooth gradients.",
          "Use ordered dithering when you want a clean, repeatable pattern or are processing video.",
        ],
      },
      {
        heading: "How they work together in this tool",
        paragraphs: [
          "In practice, halftone and dithering overlap. Both reduce a rich image down to a structured pattern, and both rely on your eye to blend that pattern back into tone. This tool lets you combine a halftone dot grid with different dithering algorithms and mark shapes, so you can move smoothly between a clean comic-print look and a grittier, photographic dither.",
          "The best way to understand the difference is to experiment. Load an image, switch between error-diffusion and ordered modes, and adjust the grid size while watching the split preview. You will quickly develop an intuition for which combination gives the texture you want.",
        ],
      },
    ],
  },
  {
    slug: "error-diffusion-vs-ordered-dithering",
    title: "Error Diffusion Vs Ordered Dithering",
    description:
      "When to reach for Floyd–Steinberg and friends versus ordered (Bayer-style) dithering, with practical trade-offs.",
    updatedAt: "2026-06-02",
    body: [
      "Error diffusion spreads rounding error to neighbouring pixels for organic results.",
      "Ordered dithering uses a fixed matrix for a regular, predictable pattern.",
      "Error diffusion suits photos; ordered suits graphic and animated work.",
      "Your choice affects detail, stability, and print character.",
    ],
    sections: [
      {
        heading: "How error diffusion works",
        paragraphs: [
          "Error-diffusion algorithms process the image pixel by pixel. When a pixel is rounded to the nearest available value, the leftover difference — the error — is distributed to nearby pixels that have not been processed yet. Floyd–Steinberg spreads that error to four neighbours, while Jarvis–Judice–Ninke and Stucki spread it across a wider area, which tends to produce smoother gradients with less visible structure.",
          "The advantage is organic, photographic detail with no obvious repeating pattern. The trade-off is that the result depends on the exact pixels, so small changes between video frames can cause the texture to shift or shimmer.",
        ],
        tips: [
          "Floyd–Steinberg is a fast, balanced default.",
          "Jarvis–Judice–Ninke and Stucki give smoother gradients at the cost of a softer look.",
        ],
      },
      {
        heading: "How ordered dithering works",
        paragraphs: [
          "Ordered dithering compares each pixel against a value from a fixed threshold matrix (often called a Bayer matrix). Because the matrix is the same everywhere, the resulting pattern is regular and repeatable. This gives a clean, screen-printed or retro look and, importantly, stays stable from frame to frame in video because it does not depend on neighbouring pixels.",
          "The downside is that ordered dithering can look mechanical on photographic subjects, especially skin and subtle gradients. Raising contrast or adjusting the grid size usually helps it read as a deliberate graphic style rather than a limitation.",
        ],
        tips: [
          "Choose ordered dithering for comic, poster, and risograph-style work.",
          "Prefer ordered dithering for video to minimise flicker between frames.",
        ],
      },
      {
        heading: "Choosing between them",
        paragraphs: [
          "There is no universally correct option — it depends on the result you want. If you are converting a portrait or a richly detailed photo and want it to feel natural, start with error diffusion. If you want a controlled, graphic pattern, are working with flat illustration, or are exporting motion, start with ordered dithering.",
          "Because switching modes in the workbench is instant, the fastest way to decide is to try both on your actual image and compare them in the split preview at the size you intend to publish.",
        ],
      },
    ],
  },
  {
    slug: "halftone-for-print-dpi-and-svg-export",
    title: "Halftone For Print: DPI And SVG Export",
    description:
      "Prepare halftone artwork for physical print — understand resolution, dot size, and when to export SVG instead of PNG.",
    updatedAt: "2026-06-02",
    body: [
      "Print needs higher resolution than screen, so plan dot size accordingly.",
      "SVG keeps dots as crisp vector shapes that scale to any size.",
      "PNG is fine for fixed-size or screen-first output.",
      "Match dot density to the final print size, not the on-screen preview.",
    ],
    sections: [
      {
        heading: "Why print resolution changes your settings",
        paragraphs: [
          "A halftone that looks perfect on screen can disappoint in print if the dots end up too small or too dense at the final size. Screens are typically around 72–96 pixels per inch, while print is usually prepared at 300 DPI or higher. That means the same dot grid will appear physically much smaller on paper. Plan your dot size around the printed dimensions and viewing distance — a poster seen from across a room can carry a much coarser grid than a postcard held in the hand.",
          "If you are unsure, export a small test at the intended print size and check it before committing to a full run. It is far cheaper to adjust grid size now than to reprint later.",
        ],
        tips: [
          "Decide the final physical size first, then choose a grid that reads well at that size.",
          "Coarser grids suit large-format work; finer grids suit small, close-up pieces.",
        ],
      },
      {
        heading: "When to export SVG",
        paragraphs: [
          "SVG export saves each halftone dot as an individual vector shape rather than as fixed pixels. Because vectors are resolution-independent, the dots stay perfectly crisp at any size, which is ideal for posters, stickers, apparel, and large-format print. SVG output is also editable: you can open it in a vector design tool to recolour dots, adjust spacing, or combine it with other artwork.",
          "The trade-off is file size and complexity. An image with a very fine grid can contain tens of thousands of individual shapes, which can make the SVG heavy and slow to open. If you need a fine grid at a small size, a high-resolution PNG is often the more practical choice.",
        ],
        tips: [
          "Use SVG for scalable, editable, print-ready dots.",
          "Use a coarser grid when exporting SVG to keep the file manageable.",
        ],
      },
      {
        heading: "When PNG is the better choice",
        paragraphs: [
          "PNG exports the exact pixels you see in the preview, which makes it the simplest and most predictable option for screen-first work, social posts, and any case where the output size is fixed. For print, a PNG exported at a high enough resolution for your target DPI will reproduce well, especially for photographic dither where vector dots are not required.",
          "A reliable workflow is to finalise the look in the workbench, export SVG when you need scalability or editability, and export a high-resolution PNG when you need a quick, fixed-size asset. Saving the settings as a preset means you can produce both from identical parameters.",
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
