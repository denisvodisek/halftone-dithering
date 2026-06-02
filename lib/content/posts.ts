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
  {
    slug: "how-to-make-a-halftone-effect-in-gimp",
    title: "How to Make a Halftone Effect in GIMP (and a Faster Way)",
    description:
      "GIMP can do halftone with its Newsprint filter. Here's how, where it gets fiddly, and when it's quicker to skip it.",
    updatedAt: "2026-06-04",
    category: "How-to",
    keywords: ["gimp halftone", "gimp newsprint filter", "halftone in gimp", "gimp dot effect"],
    content: [
      {
        type: "paragraph",
        lead: true,
        text: "GIMP is free, which makes it the go-to when you don't want to pay for Photoshop. It can produce a halftone, but the feature is buried and not obvious if you don't already know its name. Here's the real process, plus an honest note on when it's not worth the trouble.",
      },
      { type: "heading", text: "The filter you're looking for is Newsprint" },
      {
        type: "paragraph",
        text: "GIMP doesn't call it halftone. The relevant filter is Filters > Distorts > Newsprint. It converts your image into a dot screen and lets you set the cell size, the dot shape, and the screen angle. If you've ever wondered why searching 'GIMP halftone' turns up nothing useful, this is why — it's hiding under a different name.",
      },
      { type: "heading", text: "Step by step" },
      {
        type: "list",
        items: [
          "Open your image and, if you want a mono look, desaturate it first (Colors > Desaturate).",
          "Boost contrast with Colors > Brightness-Contrast so the dots have something to work with.",
          "Open Filters > Distorts > Newsprint.",
          "Set the cell size — this is your dot size. Bigger cells, bigger dots.",
          "Choose a spot shape (circle is the classic) and adjust the angle if you want.",
          "Flatten and export as PNG.",
        ],
      },
      { ...CTA_DEFAULT },
      { type: "heading", text: "Where it gets fiddly" },
      {
        type: "paragraph",
        text: "Two things slow you down in GIMP. First, there's no quick before-and-after, so you're applying, undoing, and reapplying to compare settings. Second, Newsprint outputs raster pixels, so if you later need the dots bigger for print, you're stuck re-rendering rather than scaling cleanly. For colour halftones you also have to manage channels yourself, which gets technical fast.",
      },
      { type: "heading", text: "When to skip it" },
      {
        type: "paragraph",
        text: "If you just need a halftone for a post or a poster and you don't already live in GIMP, a browser tool gets you there faster. You see the dots change as you drag, and you can export SVG so the dots stay crisp at any size. GIMP makes more sense when the halftone is one step inside a bigger edit you're already doing there.",
      },
    ],
    faq: [
      {
        question: "Does GIMP have a halftone filter?",
        answer:
          "Yes, but it's called Newsprint, found under Filters > Distorts > Newsprint. It converts an image into a halftone dot screen with adjustable cell size, dot shape, and angle.",
      },
      {
        question: "Why can't I find halftone in GIMP?",
        answer:
          "Because GIMP names the feature 'Newsprint' rather than 'halftone.' Look under Filters > Distorts > Newsprint.",
      },
      {
        question: "Is GIMP or an online tool better for halftone?",
        answer:
          "GIMP works well if you're already editing there, but it has no live preview and exports raster only. An online halftone tool is faster for one-off effects and can export scalable SVG dots for print.",
      },
    ],
    related: ["how-to-make-a-halftone-effect-without-photoshop", "newspaper-photo-effect"],
    guides: ["best-halftone-settings-for-portraits"],
  },
  {
    slug: "halftone-effect-in-procreate",
    title: "Halftone Effect in Procreate: What Works and What Doesn't",
    description:
      "Procreate has halftone built into its brushes and filters, but it has real limits. Here's what's possible and the workaround.",
    updatedAt: "2026-06-04",
    category: "How-to",
    keywords: ["procreate halftone", "halftone procreate", "procreate dot effect", "halftone ipad"],
    content: [
      {
        type: "paragraph",
        lead: true,
        text: "Procreate is brilliant for drawing, and a lot of illustrators want their finished piece to have that printed, dotty texture. The good news: Procreate can do halftone. The catch: it's better at adding halftone texture to art you're drawing than at converting an existing photo into clean dots.",
      },
      { type: "heading", text: "The built-in route: Halftone in Adjustments" },
      {
        type: "paragraph",
        text: "Procreate has a Halftone option under Adjustments. Open Adjustments, choose Halftone, and pick Full Color, Screen Print, or Newspaper. Drag left and right to set the intensity. It's quick and it lives right inside your canvas, which is the main reason to use it.",
      },
      {
        type: "list",
        items: [
          "Adjustments > Halftone, then pick a mode.",
          "Full Color keeps a CMYK-style dot look.",
          "Newspaper gives a mono dot screen.",
          "Drag to set the dot scale, then tap Apply.",
        ],
      },
      { ...CTA_DEFAULT },
      { type: "heading", text: "Where Procreate falls short" },
      {
        type: "paragraph",
        text: "The control is coarse. You're dragging for intensity with limited say over exact dot size, the dither method, or how contrast maps to the dots. For a textured overlay on an illustration that's fine. For converting a photo into a precise, repeatable halftone — the kind you'd put on merch or want to match across a series — it's frustrating. And everything stays raster, so scaling up for print softens the dots.",
      },
      { type: "heading", text: "A clean workaround" },
      {
        type: "paragraph",
        text: "When you need precision, take the image out of Procreate, run it through a dedicated halftone tool where you can dial in the exact dot size and algorithm, then bring the result back in as a layer if you want to keep painting on top. You get tight control over the dots and an SVG export for anything headed to print, without giving up your Procreate workflow.",
      },
    ],
    faq: [
      {
        question: "Does Procreate have a halftone effect?",
        answer:
          "Yes. Procreate has a Halftone option under Adjustments with Full Color, Screen Print, and Newspaper modes. You drag to set the intensity, then apply it to your layer.",
      },
      {
        question: "Why does Procreate halftone look low quality when I scale it?",
        answer:
          "Procreate's halftone is raster, so enlarging it past the canvas resolution softens the dots. For print, generate the halftone as scalable SVG in a dedicated tool instead.",
      },
      {
        question: "Can I convert a photo to halftone in Procreate?",
        answer:
          "You can, but the controls are coarse and aimed at adding texture rather than precise conversion. A dedicated halftone tool gives finer control over dot size and algorithm.",
      },
    ],
    related: ["how-to-make-a-halftone-effect-without-photoshop", "halftone-for-screen-printing"],
    guides: ["halftone-for-print-dpi-and-svg-export"],
  },
  {
    slug: "halftone-effect-in-figma",
    title: "How to Get a Halftone Effect in Figma",
    description:
      "Figma has no native halftone filter. Here are the realistic options for getting dotted artwork into your Figma file.",
    updatedAt: "2026-06-04",
    category: "How-to",
    keywords: ["figma halftone", "halftone in figma", "figma dot effect", "figma image effects"],
    content: [
      {
        type: "paragraph",
        lead: true,
        text: "Short answer: Figma can't make a halftone on its own. There's no built-in halftone or dither filter, and the image adjustments are limited to exposure, contrast, and a few basics. So if you want dotted artwork in a Figma file, you bring it in from somewhere else. Here's how to do that cleanly.",
      },
      { type: "heading", text: "Option 1: Make it elsewhere, paste it in" },
      {
        type: "paragraph",
        text: "The simplest path. Convert your image to halftone in a browser tool, export it, and drop it into Figma. Export PNG if it's sitting at a fixed size in a mockup. If you want it to stay crisp when it's scaled — a hero image, a large banner, an icon — export SVG and paste the vector so Figma keeps the dots sharp at any size.",
      },
      { ...CTA_DEFAULT },
      { type: "heading", text: "Option 2: Plugins" },
      {
        type: "paragraph",
        text: "There are community plugins that attempt halftone and dithering inside Figma. They can work for quick experiments, but they vary in quality, they often rasterise the result, and a heavy dot pattern can bog the canvas down. If you need reliable, repeatable output, generating it outside Figma and importing it is the steadier choice.",
      },
      { type: "heading", text: "Why SVG is the move for UI work" },
      {
        type: "paragraph",
        text: "Figma is a vector tool, so vector halftone fits it naturally. An SVG of dots scales perfectly across breakpoints, can be recoloured with Figma's fill controls, and exports cleanly into a build. For a design system or a marketing site, that flexibility beats a flattened PNG every time.",
      },
    ],
    faq: [
      {
        question: "Does Figma have a halftone filter?",
        answer:
          "No. Figma has no native halftone or dithering filter. You create the halftone in another tool and import it, or use a community plugin.",
      },
      {
        question: "How do I add a halftone image to Figma?",
        answer:
          "Convert your image to halftone in a browser tool, then export and place it in Figma. Use SVG so the dots scale and recolour cleanly, or PNG for a fixed-size mockup.",
      },
      {
        question: "Should I use a Figma plugin for halftone?",
        answer:
          "Plugins are fine for quick tests but vary in quality and often rasterise the output. For reliable, scalable results, generate the halftone externally and import it as SVG.",
      },
    ],
    related: ["how-to-make-a-halftone-effect-without-photoshop", "halftone-effect-in-procreate"],
    guides: ["halftone-for-print-dpi-and-svg-export"],
  },
  {
    slug: "newspaper-photo-effect",
    title: "How to Make a Newspaper Photo Effect",
    description:
      "That gritty old-print look from a photo: the dot screen, the contrast, and the small imperfections that sell it.",
    updatedAt: "2026-06-04",
    category: "Style",
    keywords: ["newspaper photo effect", "newsprint effect", "old newspaper filter", "halftone newspaper"],
    content: [
      {
        type: "paragraph",
        lead: true,
        text: "The newspaper look is one of the most recognisable print effects there is: a coarse dot screen, hard contrast, and that slightly rough, inked-on-cheap-paper feel. It's built on halftone, and the trick to making it convincing is leaning into the imperfection instead of fighting it.",
      },
      { type: "heading", text: "Start in black and white" },
      {
        type: "paragraph",
        text: "Old newsprint was mostly mono. Desaturate first, or use a near-monochrome palette. Colour newspaper printing existed, but the classic look people picture is grey ink on off-white paper, so that's the target.",
      },
      { type: "heading", text: "The settings that read as newsprint" },
      {
        type: "list",
        items: [
          "A tight-to-medium dot grid — newsprint dots are small but clearly there.",
          "High contrast so shadows clump into dots and highlights stay open.",
          "Floyd–Steinberg or Burkes for a natural, photographic break-up.",
          "Keep backgrounds simple so the screen doesn't fight the subject.",
        ],
      },
      { ...CTA_DEFAULT },
      { type: "heading", text: "Don't make it too clean" },
      {
        type: "paragraph",
        text: "This is the part people get wrong. Real newspaper printing was cheap and slightly off — ink spread, registration drifted, paper soaked it up. A flawless, perfectly smooth result reads as digital. Let the midtones break into dots, let the shadows clog a little, and resist the urge to smooth everything. The roughness is the whole point.",
      },
      { type: "heading", text: "Finishing touches" },
      {
        type: "paragraph",
        text: "For an authentic feel, pair the halftone with an off-white or warm-grey background rather than pure white, and keep your type bold and condensed if you're adding headlines. Export PNG for digital use, or SVG if it's going into a real print layout.",
      },
    ],
    faq: [
      {
        question: "How do I make a photo look like a newspaper print?",
        answer:
          "Desaturate the image, push contrast, and apply a tight halftone dot screen with an error-diffusion algorithm like Floyd–Steinberg. Keep it slightly rough and use an off-white background for an authentic feel.",
      },
      {
        question: "What is the newspaper dot effect called?",
        answer:
          "It's a halftone, sometimes called a newsprint screen. Newspapers used halftone dots to reproduce photos with a single grey or black ink.",
      },
      {
        question: "Should a newspaper effect be color or black and white?",
        answer:
          "Black and white, or near-monochrome, gives the classic newsprint look. The recognisable style is grey ink on off-white paper.",
      },
    ],
    related: ["comic-book-halftone-ben-day-dots", "risograph-effect-online"],
    guides: ["newspaper-vs-comic-dithering"],
  },
  {
    slug: "duotone-halftone-effect",
    title: "How to Make a Duotone Halftone Effect",
    description:
      "Combine two-colour duotone with a dot screen for a bold, modern print look. Picking colours and keeping it readable.",
    updatedAt: "2026-06-04",
    category: "Style",
    keywords: ["duotone halftone", "duotone effect", "two color halftone", "duotone dot effect"],
    content: [
      {
        type: "paragraph",
        lead: true,
        text: "Duotone maps an image to two colours — one for the shadows, one for the highlights. Add a halftone dot screen on top and you get a look that feels both modern and printed: think Spotify covers, festival posters, and bold editorial spreads. Here's how to build it.",
      },
      { type: "heading", text: "How duotone and halftone fit together" },
      {
        type: "paragraph",
        text: "On their own, duotone gives you the colour story and halftone gives you the texture. Together, the dots carry the transition between your two colours, which is what makes it look printed rather than like a flat photo filter. The image stops being a photograph and becomes a piece of graphic design.",
      },
      { type: "heading", text: "Choosing your two colours" },
      {
        type: "list",
        items: [
          "Pick a dark shadow colour and a light highlight colour with clear contrast between them.",
          "High contrast between the two keeps the image readable.",
          "Unexpected pairings (e.g. deep purple and acid yellow) read as deliberate and modern.",
          "Tints of a single hue give a subtler, more photographic duotone.",
        ],
      },
      { ...CTA_DEFAULT },
      { type: "heading", text: "Keep the subject readable" },
      {
        type: "paragraph",
        text: "The risk with duotone halftone is mush. If your two colours are too close in brightness, the subject disappears. Push contrast in the source image first so there's a clear separation between light and dark, then apply the colours. The face or focal point should still be obvious at a glance.",
      },
      { type: "heading", text: "Where it shines" },
      {
        type: "paragraph",
        text: "Duotone halftone works beautifully on posters, playlist and album art, event branding, and hero images that need to feel designed. Export SVG if it's going large or to print so the dots and colours stay crisp; PNG is fine for screens.",
      },
    ],
    faq: [
      {
        question: "What is a duotone halftone effect?",
        answer:
          "It's an image mapped to two colours (duotone) with a halftone dot screen applied, so the dots carry the transition between the colours. The result looks like a bold, modern print.",
      },
      {
        question: "How do I choose colours for a duotone?",
        answer:
          "Pick a dark colour for shadows and a light one for highlights, with enough contrast between them to keep the image readable. Unexpected pairings look modern; tints of one hue look subtler.",
      },
      {
        question: "Why does my duotone look muddy?",
        answer:
          "Usually the two colours are too close in brightness, or the source image lacks contrast. Increase contrast before applying the colours so the subject stays clearly separated.",
      },
    ],
    related: ["pop-art-halftone-effect", "risograph-effect-online"],
    guides: ["best-halftone-settings-for-portraits"],
  },
  {
    slug: "dithering-for-pixel-art",
    title: "Dithering for Pixel Art and Retro Game Looks",
    description:
      "How dithering creates shading and gradients in pixel art with a tiny palette, and how to use it without making mud.",
    updatedAt: "2026-06-04",
    category: "Style",
    keywords: ["dithering pixel art", "pixel art dithering", "retro game dithering", "8 bit dithering"],
    content: [
      {
        type: "paragraph",
        lead: true,
        text: "Dithering and pixel art grew up together. When a game console could only show a handful of colours, artists scattered the colours they had to fake shading and gradients. That speckled texture is now a deliberate style, and getting it right is about restraint as much as technique.",
      },
      { type: "heading", text: "Why pixel art needs dithering" },
      {
        type: "paragraph",
        text: "With a tiny palette, a smooth gradient isn't possible — you'd see hard bands where one colour stops and the next begins. Dithering breaks up those bands by mixing pixels from two colours along the transition, so your eye reads a gradient that the palette can't actually produce. It's the same trick newspapers use, just at the scale of individual pixels.",
      },
      { type: "heading", text: "Ordered dithering is your friend here" },
      {
        type: "paragraph",
        text: "For the authentic retro look, ordered (Bayer) dithering usually beats error diffusion. Its regular, repeating pattern matches how old hardware actually did it and reads as intentional. Error diffusion can look too organic and noisy for a clean pixel-art piece, though it has its uses for more painterly work.",
      },
      { ...CTA_DEFAULT },
      { type: "heading", text: "Keep it deliberate, not noisy" },
      {
        type: "list",
        items: [
          "Use a small, fixed palette — the constraint is the style.",
          "Apply dithering in the transitions between tones, not across the whole image.",
          "Keep the dot/pixel scale consistent so it reads as one piece.",
          "Zoom out to check it — dithering that looks busy up close often reads perfectly at normal size.",
        ],
      },
      { type: "heading", text: "Export at the right size" },
      {
        type: "paragraph",
        text: "Pixel art is resolution-sensitive. Export at the exact pixel dimensions you'll display, and scale up by whole numbers (2x, 3x, 4x) with nearest-neighbour so the pixels stay sharp and square. Scaling by odd amounts or with smoothing turns crisp dithering into a blurry mess.",
      },
    ],
    faq: [
      {
        question: "What is dithering in pixel art?",
        answer:
          "It's the technique of mixing pixels from a small palette to fake shading and gradients that the limited colours can't produce on their own. It creates the recognisable speckled retro-game texture.",
      },
      {
        question: "What dithering is best for pixel art?",
        answer:
          "Ordered (Bayer) dithering usually gives the most authentic retro look because its regular pattern matches how old hardware worked. Error diffusion can look too noisy for clean pixel art.",
      },
      {
        question: "How do I keep dithered pixel art sharp when scaling?",
        answer:
          "Export at the exact pixel size, then scale up by whole-number multiples (2x, 3x) using nearest-neighbour. Avoid smoothing or fractional scaling, which blurs the pixels.",
      },
    ],
    related: ["what-is-dithering", "atkinson-dithering-explained"],
    guides: ["error-diffusion-vs-ordered-dithering"],
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
