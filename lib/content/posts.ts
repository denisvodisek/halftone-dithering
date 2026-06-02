export type PostBlock =
  | { type: "paragraph"; text: string; lead?: boolean }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title?: string; text: string }
  | { type: "cta"; title: string; text: string; buttonText: string };

export interface PostFaq {
  question: string;
  answer: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  category: string;
  keywords: string[];
  content: PostBlock[];
  faq: PostFaq[];
  /** Slugs of related posts. */
  related: string[];
  /** Optional related guide slugs (from lib/content/guides). */
  guides?: string[];
}

const CTA_DEFAULT = {
  type: "cta" as const,
  title: "Try it on your own image",
  text: "Drop in a photo and tune the dots live. Nothing uploads, nothing is saved.",
  buttonText: "Open the halftone tool",
};

export const posts: Post[] = [
  {
    slug: "how-to-make-a-halftone-effect-without-photoshop",
    title: "How to Make a Halftone Effect Without Photoshop",
    description:
      "You don't need Photoshop to turn a photo into halftone dots. Here's the free, browser-based way to do it in about a minute.",
    updatedAt: "2026-06-02",
    category: "How-to",
    keywords: [
      "halftone effect without photoshop",
      "halftone online free",
      "photo to halftone",
      "halftone generator",
    ],
    content: [
      {
        type: "paragraph",
        lead: true,
        text: "Most halftone tutorials open with 'first, open Photoshop.' If you don't own a $20-a-month subscription just to add some dots to an image, that's a dead end. Good news: you don't need it. You can get a clean halftone in the browser, for free, without installing anything.",
      },
      { type: "heading", text: "The short version" },
      {
        type: "list",
        items: [
          "Open the halftone tool and drop in your image.",
          "Set the dot grid size — smaller for detail, larger for a bold print look.",
          "Push the contrast until the subject reads clearly.",
          "Pick a dither mode (start with Floyd–Steinberg).",
          "Export PNG for web, or SVG if it's going to print.",
        ],
      },
      { ...CTA_DEFAULT },
      { type: "heading", text: "Why skip Photoshop at all" },
      {
        type: "paragraph",
        text: "Photoshop's halftone lives under Filter > Pixelate > Color Halftone, and it works, but it's fiddly. You're setting screen angles in degrees and guessing at a max radius in pixels with no live preview of the final result. For a one-off poster or a social post, that's a lot of friction for a dotted photo.",
      },
      {
        type: "paragraph",
        text: "A dedicated tool skips the guesswork. You see the dots update as you drag a slider, so you stop when it looks right instead of rendering, undoing, and trying again.",
      },
      { type: "heading", text: "Step by step" },
      { type: "subheading", text: "1. Load your image" },
      {
        type: "paragraph",
        text: "Drop a JPG or PNG straight onto the canvas. Everything runs locally in your browser, so a portrait of your client or an unreleased product shot never leaves your machine. High-contrast images with a clear subject convert best.",
      },
      { type: "subheading", text: "2. Set the dot size" },
      {
        type: "paragraph",
        text: "Grid size is the single most important control. A small grid keeps facial features and fine detail. A large grid gives you that chunky screen-print poster look but loses detail. Drag it while watching the split preview and stop where the image still reads at the size you'll actually publish.",
      },
      { type: "subheading", text: "3. Fix the contrast" },
      {
        type: "paragraph",
        text: "Halftone lives and dies on contrast. Flat photos turn to mud. Bump contrast until the lights and darks separate cleanly, then nudge gamma to bring midtones back if the face goes too dark.",
      },
      { type: "subheading", text: "4. Choose how the dots are placed" },
      {
        type: "paragraph",
        text: "Error-diffusion modes like Floyd–Steinberg or Stucki scatter the dots organically and suit photos. Ordered dithering lays down a regular grid that looks more like classic newsprint or comics. Try both — switching is instant.",
      },
      { type: "subheading", text: "5. Export" },
      {
        type: "paragraph",
        text: "PNG gives you exactly what's on screen, which is perfect for posts and thumbnails. SVG saves every dot as a vector shape, so you can scale it to poster size or recolour it in a design app without it going blurry.",
      },
      {
        type: "callout",
        title: "Rule of thumb",
        text: "If it's going on a screen, export PNG. If it's going on paper, fabric, or anything large, export SVG.",
      },
    ],
    faq: [
      {
        question: "Can I make a halftone effect for free?",
        answer:
          "Yes. A browser-based halftone tool does it for free with no signup and no software to install. You load an image, adjust the dot grid and contrast, and export PNG or SVG.",
      },
      {
        question: "Is there a Photoshop alternative for halftone?",
        answer:
          "A dedicated online halftone generator is usually faster than Photoshop for this one job because it shows the dots updating live as you adjust settings, instead of the static dialog Photoshop uses.",
      },
      {
        question: "Will my image be uploaded anywhere?",
        answer:
          "No. The processing happens entirely in your browser using your device's own graphics. The image file is never sent to a server.",
      },
    ],
    related: ["pop-art-halftone-effect", "comic-book-halftone-ben-day-dots"],
    guides: ["best-halftone-settings-for-portraits", "what-is-halftone-and-dithering"],
  },
  {
    slug: "what-is-dithering",
    title: "What Is Dithering? A Plain-English Explanation",
    description:
      "Dithering is how a few colours pretend to be many. Here's what it actually does, why it exists, and where you still see it today.",
    updatedAt: "2026-06-02",
    category: "Explainer",
    keywords: ["what is dithering", "dithering explained", "image dithering", "dither meaning"],
    content: [
      {
        type: "paragraph",
        lead: true,
        text: "Dithering is a trick for showing more colours or shades than you actually have. Instead of a smooth grey, you scatter black and white pixels so that, from a step back, your eye blends them into grey. That's the whole idea. Everything else is detail.",
      },
      { type: "heading", text: "The problem dithering solves" },
      {
        type: "paragraph",
        text: "Imagine you can only print pure black or leave the paper white. No grey ink. How do you show a soft shadow? You can't paint it grey, so you break it into tiny black dots with white gaps between them. Dense dots read as dark, sparse dots read as light. The page never holds a single grey pixel, but your eye sees a gradient anyway.",
      },
      {
        type: "paragraph",
        text: "Old computers had the same problem with colour. A screen limited to 256 colours couldn't show a real photo, so it scattered the colours it did have to fake the ones it didn't. That grainy, speckled look in early GIFs and game art? That's dithering doing its job.",
      },
      { type: "heading", text: "The two families of dithering" },
      { type: "subheading", text: "Error diffusion" },
      {
        type: "paragraph",
        text: "Error-diffusion methods go pixel by pixel. Each pixel gets rounded to the nearest available colour, and the leftover difference — the error — gets pushed onto the neighbouring pixels that haven't been processed yet. Floyd–Steinberg is the famous one. The result looks organic and photographic, with no obvious repeating pattern.",
      },
      { type: "subheading", text: "Ordered dithering" },
      {
        type: "paragraph",
        text: "Ordered dithering compares each pixel against a fixed grid of threshold values, usually a Bayer matrix. Because the grid repeats, the pattern is regular and predictable. It looks more mechanical, which is exactly what you want for comics, posters, and anything that needs to stay stable across video frames.",
      },
      { ...CTA_DEFAULT },
      { type: "heading", text: "Dithering vs halftone — are they the same?" },
      {
        type: "paragraph",
        text: "They're cousins. Halftone specifically uses dots of varying size to fake tone, the way a newspaper does. Dithering is the broader idea of arranging a limited palette to fake colours and shades. In practice they overlap, and a good halftone tool lets you combine both: a dot grid for structure, a dither algorithm for how the tones break up.",
      },
      { type: "heading", text: "Where you still see it" },
      {
        type: "list",
        items: [
          "Newspapers and comic books, the original use case.",
          "Retro and pixel-art games, where the grain is part of the style.",
          "Risograph and screen prints, which can only lay down a few flat inks.",
          "Album covers, posters, and zines that want a printed, analogue feel.",
        ],
      },
    ],
    faq: [
      {
        question: "What does dithering mean?",
        answer:
          "Dithering means arranging a small set of colours or shades in a pattern so that, viewed from a distance, they blend into colours the device can't actually produce. It's how a black-and-white image can appear to have grey tones.",
      },
      {
        question: "Is dithering still used today?",
        answer:
          "Yes. It's used in printing, retro and pixel-art aesthetics, risograph and screen printing, and any situation with a limited colour palette. It's also a deliberate design choice for an analogue, printed look.",
      },
      {
        question: "What's the difference between dithering and halftone?",
        answer:
          "Halftone uses dots of varying size to simulate tone, like newsprint. Dithering is the broader technique of arranging a limited palette to simulate more colours or shades. The two are often combined.",
      },
    ],
    related: ["floyd-steinberg-dithering-explained", "atkinson-dithering-explained"],
    guides: ["what-is-halftone-and-dithering", "error-diffusion-vs-ordered-dithering"],
  },
  {
    slug: "floyd-steinberg-dithering-explained",
    title: "Floyd–Steinberg Dithering, Explained Simply",
    description:
      "The most famous dithering algorithm, in plain terms: how it spreads error, why it looks so natural, and when to use it.",
    updatedAt: "2026-06-02",
    category: "Explainer",
    keywords: [
      "floyd steinberg dithering",
      "floyd steinberg explained",
      "error diffusion dithering",
      "floyd steinberg algorithm",
    ],
    content: [
      {
        type: "paragraph",
        lead: true,
        text: "Floyd–Steinberg is the dithering algorithm you've seen a thousand times without knowing its name. It's the default in most tools because it's fast and it looks good. Here's what it's actually doing under the hood.",
      },
      { type: "heading", text: "The core idea: don't waste the error" },
      {
        type: "paragraph",
        text: "When you reduce an image to fewer colours, every pixel gets rounded to the nearest one it's allowed to use. A pixel that's 60% grey might get rounded down to black. That rounding throws away information. Floyd–Steinberg's insight, from Robert Floyd and Louis Steinberg back in 1976, was simple: don't throw the error away — give it to the neighbours.",
      },
      {
        type: "paragraph",
        text: "So if a pixel was forced darker than it really was, the algorithm makes the pixels next to it a little lighter to compensate. Across the whole image, the errors cancel out and the average tone stays correct. That's why a dithered photo looks right from a distance even though every single pixel is a hard black or white.",
      },
      { type: "heading", text: "How the error gets spread" },
      {
        type: "paragraph",
        text: "Floyd–Steinberg pushes the leftover error onto four neighbouring pixels in fixed proportions: 7/16 to the right, and 3/16, 5/16, and 1/16 to the three pixels below. The numbers aren't magic, they just weight the spread toward pixels the algorithm hasn't reached yet, so nothing gets double-counted.",
      },
      {
        type: "callout",
        text: "You don't need to memorise the weights to use it. What matters: the error moves to nearby pixels, which is why the texture looks scattered and natural instead of gridded.",
      },
      { ...CTA_DEFAULT },
      { type: "heading", text: "When to reach for it" },
      {
        type: "paragraph",
        text: "Floyd–Steinberg is the safe default for photos and anything with smooth gradients — skin, skies, soft lighting. It keeps detail and avoids the rigid look of a fixed pattern. If you want something even smoother, Jarvis–Judice–Ninke and Stucki spread the error wider for calmer gradients at the cost of a slightly softer image.",
      },
      { type: "heading", text: "When to avoid it" },
      {
        type: "paragraph",
        text: "Because the result depends on the exact pixels, error diffusion can shimmer in video. A tiny change between two frames can shift the whole pattern, which reads as crawling texture. For motion, an ordered dither holds steadier. Same goes for clean graphic work where you actually want a visible, regular pattern.",
      },
    ],
    faq: [
      {
        question: "What is Floyd–Steinberg dithering?",
        answer:
          "It's an error-diffusion dithering algorithm from 1976. When a pixel is rounded to the nearest available colour, the rounding error is spread to neighbouring pixels, which keeps the overall tone accurate and produces a natural, scattered texture.",
      },
      {
        question: "Why does Floyd–Steinberg look so natural?",
        answer:
          "Because it carries the rounding error forward to nearby pixels instead of discarding it, the average tone across any area stays correct. There's no repeating grid, so the texture looks organic rather than mechanical.",
      },
      {
        question: "Is Floyd–Steinberg good for video?",
        answer:
          "Not always. Because the pattern depends on exact pixel values, small frame-to-frame changes can make the texture shimmer. Ordered dithering is usually more stable for motion.",
      },
    ],
    related: ["what-is-dithering", "atkinson-dithering-explained"],
    guides: ["error-diffusion-vs-ordered-dithering"],
  },
  {
    slug: "atkinson-dithering-explained",
    title: "Atkinson Dithering: The Classic Mac Look",
    description:
      "The dithering that gave the original Macintosh its crisp, high-contrast images. What makes it different and why people love it.",
    updatedAt: "2026-06-02",
    category: "Explainer",
    keywords: ["atkinson dithering", "classic mac dithering", "1-bit dithering", "bill atkinson dither"],
    content: [
      {
        type: "paragraph",
        lead: true,
        text: "If you've ever seen a black-and-white image from an original Macintosh or a HyperCard stack and thought it looked unusually crisp, that's Atkinson dithering. Bill Atkinson wrote it for early Apple machines, and it has a distinct look that's having a real comeback in design right now.",
      },
      { type: "heading", text: "What makes it different" },
      {
        type: "paragraph",
        text: "Atkinson is an error-diffusion algorithm, like Floyd–Steinberg, but with one key twist: it doesn't pass on all of the error. It spreads only about three-quarters of it and quietly drops the rest. That sounds like a bug, but it's the whole point.",
      },
      {
        type: "paragraph",
        text: "By throwing away some of the error, Atkinson lets highlights blow out to pure white and shadows crush to pure black. You get cleaner whites, punchier blacks, and more local contrast. Detail in the midtones holds up beautifully. The trade-off is that very subtle gradients can lose a little information, but for most images the extra crispness is worth it.",
      },
      { ...CTA_DEFAULT },
      { type: "heading", text: "Why it's popular again" },
      {
        type: "paragraph",
        text: "There's a strong design trend toward 1-bit, early-computer aesthetics — think monochrome UI, brutalist web design, and retro album art. Atkinson sits right in the middle of it. It reads as 'old computer' without looking muddy, which is exactly the vibe a lot of that work is going for.",
      },
      { type: "heading", text: "How to get the look" },
      {
        type: "list",
        items: [
          "Use a monochrome palette — pure black and white is the authentic choice.",
          "Keep contrast high; Atkinson rewards it.",
          "Don't over-smooth. A bit of crunch is the point.",
          "For UI mockups, export at the exact pixel size you'll display so the dots stay sharp.",
        ],
      },
    ],
    faq: [
      {
        question: "What is Atkinson dithering?",
        answer:
          "Atkinson dithering is an error-diffusion algorithm written by Bill Atkinson for early Apple computers. Unlike Floyd–Steinberg, it only passes on part of the rounding error, which produces cleaner highlights and higher contrast.",
      },
      {
        question: "Why does Atkinson dithering look so crisp?",
        answer:
          "Because it discards some of the error instead of spreading all of it, highlights go to pure white and shadows to pure black. That gives more local contrast and a sharper, cleaner result than algorithms that preserve every bit of error.",
      },
      {
        question: "What is Atkinson dithering good for?",
        answer:
          "It suits 1-bit and retro-computer aesthetics, monochrome UI, brutalist design, and high-contrast black-and-white artwork where crispness matters more than perfectly smooth gradients.",
      },
    ],
    related: ["floyd-steinberg-dithering-explained", "what-is-dithering"],
    guides: ["error-diffusion-vs-ordered-dithering"],
  },
  {
    slug: "risograph-effect-online",
    title: "How to Make a Risograph Effect Online",
    description:
      "Get that grainy, two-colour riso print look without a riso machine. The settings that sell the effect, and the export that keeps it.",
    updatedAt: "2026-06-02",
    category: "Style",
    keywords: ["risograph effect", "riso print effect", "risograph online", "riso texture"],
    content: [
      {
        type: "paragraph",
        lead: true,
        text: "Risograph prints have a look people pay good money for: limited spot colours, visible grain, slight misregistration, and a texture that feels handmade. You can fake a convincing version of it digitally, and dithering is the secret ingredient.",
      },
      { type: "heading", text: "Why dithering is the key" },
      {
        type: "paragraph",
        text: "A real riso machine prints one flat ink at a time and can't do smooth gradients. To show a darker area, it lays down more ink dots; for a lighter area, fewer. That's dithering, physically. So if you want the digital version to look real, you can't use a smooth gradient — you have to break the tones into dots the way the machine would.",
      },
      { type: "heading", text: "The settings that work" },
      {
        type: "list",
        items: [
          "Pick a dither mode — ordered dithering gives that even, mechanical riso grain.",
          "Use a tight-to-medium dot grid; riso grain is fine, not chunky.",
          "Limit your palette. One or two flat spot colours is the whole aesthetic.",
          "Keep contrast moderate so the grain stays visible in the midtones.",
        ],
      },
      { ...CTA_DEFAULT },
      { type: "heading", text: "Selling the imperfection" },
      {
        type: "paragraph",
        text: "Real riso isn't clean, and that's why people like it. Don't chase a perfect result. Let the grain sit on top of the image, let the midtones break up, and resist the urge to smooth everything out. A slightly rough output reads as authentic; a flawless one reads as digital.",
      },
      { type: "heading", text: "Exporting for print" },
      {
        type: "paragraph",
        text: "If the piece is actually going to a printer, export SVG so the dots stay crisp at full size and the colours can be separated cleanly. For a riso-style social post or mockup, a high-resolution PNG is fine.",
      },
    ],
    faq: [
      {
        question: "How do I make a risograph effect without a riso machine?",
        answer:
          "Use a dithering tool to break your image into a grainy dot pattern, limit the palette to one or two flat spot colours, and keep the texture slightly rough. Ordered dithering gives the most authentic riso grain.",
      },
      {
        question: "What dithering is best for a riso look?",
        answer:
          "Ordered dithering with a fine-to-medium dot grid mimics the even grain of a real risograph print better than smooth error diffusion.",
      },
      {
        question: "Should I export riso artwork as PNG or SVG?",
        answer:
          "Export SVG if the artwork is going to a real printer, since the dots stay sharp and colours separate cleanly. PNG is fine for social posts and digital mockups.",
      },
    ],
    related: ["comic-book-halftone-ben-day-dots", "halftone-for-screen-printing"],
    guides: ["newspaper-vs-comic-dithering"],
  },
  {
    slug: "comic-book-halftone-ben-day-dots",
    title: "Comic Book Dots (Ben-Day Dots) Made Easy",
    description:
      "The dotted shading in vintage comics has a name: Ben-Day dots. Here's how to recreate that look from any image.",
    updatedAt: "2026-06-02",
    category: "Style",
    keywords: ["ben day dots", "comic book dots", "comic halftone effect", "vintage comic effect"],
    content: [
      {
        type: "paragraph",
        lead: true,
        text: "That dotted shading in old comic books and pulp art has a name: Ben-Day dots, after printer Benjamin Henry Day Jr. Vintage comics used them to add colour and shading cheaply. Today it's pure style, and you can pull it off from any photo or drawing.",
      },
      { type: "heading", text: "What makes it read as 'comic'" },
      {
        type: "paragraph",
        text: "Two things sell the comic look: an even, regular dot pattern, and strong, simple shapes. Comics weren't subtle. Bold outlines, flat areas of tone, and a clearly visible dot screen. If your dots are too fine or your image too detailed, it stops reading as comic and starts reading as a generic halftone.",
      },
      { type: "heading", text: "Getting it right" },
      {
        type: "list",
        items: [
          "Use ordered dithering for the even, printed-grid feel.",
          "Go for a medium dot grid — the dots should be clearly visible.",
          "Crank contrast so the subject separates from the background.",
          "Simplify. Busy backgrounds fight the effect; clean ones let it sing.",
        ],
      },
      { ...CTA_DEFAULT },
      { type: "heading", text: "Colour vs black and white" },
      {
        type: "paragraph",
        text: "Classic comic colour was built in layers: a flat colour base with a black dot screen on top. If you're going for colour, keep the palette limited and let the dots carry the shading. Trying to preserve every tone from a photo usually turns to mud. Less is more here.",
      },
      { type: "heading", text: "Where this look shines" },
      {
        type: "paragraph",
        text: "Ben-Day dots work great for poster art, T-shirt graphics, album covers, and any project that wants a loud, retro-print energy. Export SVG if it's going on fabric or large format so the dots scale without blurring.",
      },
    ],
    faq: [
      {
        question: "What are Ben-Day dots?",
        answer:
          "Ben-Day dots are the small, evenly spaced coloured dots used in vintage comic and pulp printing to create shading and tone cheaply. The technique is named after printer Benjamin Henry Day Jr.",
      },
      {
        question: "How do I make a comic book dot effect?",
        answer:
          "Use ordered dithering with a medium, clearly visible dot grid, push contrast to simplify the image into bold shapes, and keep backgrounds clean. Limit colours if working in colour.",
      },
      {
        question: "What's the difference between Ben-Day dots and a regular halftone?",
        answer:
          "Ben-Day dots are an even, evenly spaced pattern used for flat comic shading, while a photographic halftone varies dot size to reproduce continuous tone. Ben-Day is bolder and more graphic.",
      },
    ],
    related: ["pop-art-halftone-effect", "risograph-effect-online"],
    guides: ["newspaper-vs-comic-dithering"],
  },
  {
    slug: "pop-art-halftone-effect",
    title: "How to Make a Pop Art Halftone Effect",
    description:
      "The bold, dotted, Lichtenstein-style pop art look — how to build it from a photo with the right dots and colours.",
    updatedAt: "2026-06-02",
    category: "Style",
    keywords: ["pop art effect", "lichtenstein halftone", "pop art halftone", "andy warhol effect"],
    content: [
      {
        type: "paragraph",
        lead: true,
        text: "Pop art took commercial printing and blew it up into fine art. Roy Lichtenstein painted comic-book dots by hand; Warhol screen-printed bold flat colour. You can get the same energy from a photo with a halftone tool and a few deliberate choices.",
      },
      { type: "heading", text: "The two pop art moves" },
      {
        type: "subheading", text: "Lichtenstein: big, loud dots" },
      {
        type: "paragraph",
        text: "Lichtenstein's whole thing was making the printing process visible and huge. Go for a large, obvious dot grid and high contrast. The dots should be a feature, not a texture. Pair them with a limited, punchy palette and you're most of the way there.",
      },
      { type: "subheading", text: "Warhol: flat colour blocks" },
      {
        type: "paragraph",
        text: "Warhol's portraits lean on bold flat colours and high contrast more than dots. Crush the image down to a few tones, then push saturated, unexpected colour combinations. A light dot screen on top adds the printed feel without dominating.",
      },
      { ...CTA_DEFAULT },
      { type: "heading", text: "Settings to start with" },
      {
        type: "list",
        items: [
          "Large dot grid for the Lichtenstein look; subtle grid for the Warhol look.",
          "High contrast in both cases — pop art doesn't do muddy.",
          "A small, bold colour palette. Two to four colours is plenty.",
          "A strong, simple subject. Faces and single objects work best.",
        ],
      },
      { type: "heading", text: "Make it a set" },
      {
        type: "paragraph",
        text: "A lot of the pop art feel comes from repetition — the same image in different colourways, side by side. Save your settings as a preset, then run the same photo with different palettes to build a grid of variations. Export SVG if you're printing them big.",
      },
    ],
    faq: [
      {
        question: "How do I make a pop art effect from a photo?",
        answer:
          "Reduce the image to a few high-contrast tones, apply a bold halftone dot pattern, and use a small, saturated colour palette. Large dots give a Lichtenstein look; flat colour blocks give a Warhol look.",
      },
      {
        question: "What is the Lichtenstein dot effect called?",
        answer:
          "Those are Ben-Day dots — the comic-printing technique Lichtenstein enlarged and made central to his paintings. A halftone tool with a large, visible dot grid recreates the effect.",
      },
      {
        question: "How do I make a Warhol-style portrait?",
        answer:
          "Crush the photo to a few flat tones with high contrast, then apply bold, saturated, unexpected colours. Repeat the same image in different colourways for the classic grid layout.",
      },
    ],
    related: ["comic-book-halftone-ben-day-dots", "how-to-make-a-halftone-effect-without-photoshop"],
    guides: ["best-halftone-settings-for-portraits"],
  },
  {
    slug: "halftone-for-screen-printing",
    title: "Halftone for Screen Printing and T-Shirts",
    description:
      "How to prep halftone artwork that actually prints clean on a screen-printing press, with the right dot size and export.",
    updatedAt: "2026-06-02",
    category: "How-to",
    keywords: [
      "halftone for screen printing",
      "halftone t-shirt",
      "screen print halftone",
      "halftone svg print",
    ],
    content: [
      {
        type: "paragraph",
        lead: true,
        text: "Screen printing can't print grey. It lays down flat ink, so any shading or gradient has to be faked with dots. That's exactly what halftone does, which is why getting the dots right is the difference between a clean print and a muddy mess on the shirt.",
      },
      { type: "heading", text: "Dot size is everything" },
      {
        type: "paragraph",
        text: "On a press, dots that are too small fill in and turn to a solid blob, especially on textured fabric. Dots that are too big look crude. The sweet spot depends on your mesh count and the printer, so the safest move is to talk to whoever's printing and ask what dot size and screen they can hold. Then set your grid to match.",
      },
      {
        type: "callout",
        title: "Talk to your printer first",
        text: "Mesh count, ink, and fabric all change what dot size will hold. Five minutes with your printer saves a ruined run.",
      },
      { type: "heading", text: "Why you want SVG, not PNG" },
      {
        type: "paragraph",
        text: "Export SVG. It saves every dot as a real vector shape, so it scales to any shirt size without going blurry, and your printer can work with clean, editable artwork for making the screens. A PNG locks you to one resolution and can soften the dot edges, which is the last thing you want when those edges become physical ink.",
      },
      { ...CTA_DEFAULT },
      { type: "heading", text: "Keep it simple" },
      {
        type: "list",
        items: [
          "High contrast so the design reads from across a room.",
          "Limit colours — each colour is another screen and another pass.",
          "A coarser dot grid holds better on fabric than a fine one.",
          "Test print on the actual fabric before committing to a full run.",
        ],
      },
      { type: "heading", text: "One-colour designs are your friend" },
      {
        type: "paragraph",
        text: "A single-colour halftone — black ink on a light shirt, or white on dark — is cheap to print and almost always looks sharp. If you're new to this, start there. Multi-colour halftone work is doable but every extra colour adds cost and a chance for misregistration.",
      },
    ],
    faq: [
      {
        question: "Can you screen print a halftone?",
        answer:
          "Yes. Screen printing relies on halftone dots to simulate shading, since the press can only lay down flat ink. The key is choosing a dot size your printer's mesh can hold and exporting clean vector artwork.",
      },
      {
        question: "What dot size should I use for screen printing?",
        answer:
          "It depends on your mesh count, ink, and fabric, so ask your printer what they can hold. As a general rule, coarser dots are safer on fabric than fine ones, which can fill in.",
      },
      {
        question: "Should screen print halftones be PNG or SVG?",
        answer:
          "SVG. It keeps each dot as a crisp vector that scales to any size and gives your printer clean, editable artwork for making the screens.",
      },
    ],
    related: ["risograph-effect-online", "comic-book-halftone-ben-day-dots"],
    guides: ["halftone-for-print-dpi-and-svg-export"],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostSlugs(): string[] {
  return posts.map((post) => post.slug);
}

export function getRelatedPosts(post: Post): Post[] {
  return post.related
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => Boolean(p));
}
