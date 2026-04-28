export type DitherType =
  | "None"
  | "FloydSteinberg"
  | "JarvisJudiceNinke"
  | "Stucki"
  | "Burkes"
  | "Ordered"
  | "Noise";

export type SourceType = "image" | "video";

export const DEFAULT_MULTICOLOR_PALETTE = ["#e63946", "#f4a261", "#2a9d8f", "#264653", "#e9c46a"];

export interface HalftoneSettings {
  gridSize: number;
  brightness: number;
  contrast: number;
  gamma: number;
  smoothing: number;
  ditherType: DitherType;
  backgroundColor: string;
  dotColor: string;
  multicolor: boolean;
  /** When multicolor is on, dots are tinted by blending along this list (dark → light). */
  multicolorPalette: string[];
}

export interface HalftoneRenderResult {
  width: number;
  height: number;
  grid: number;
  numRows: number;
  numCols: number;
  cellValues: Float32Array;
}

export interface SavedPreset {
  id: string;
  name: string;
  settings: HalftoneSettings;
  createdAt: string;
}

export const DEFAULT_SETTINGS: HalftoneSettings = {
  gridSize: 20,
  brightness: 20,
  contrast: 0,
  gamma: 1,
  smoothing: 0,
  ditherType: "None",
  backgroundColor: "#ffffff",
  dotColor: "#000000",
  multicolor: false,
  multicolorPalette: [...DEFAULT_MULTICOLOR_PALETTE],
};

/** Merge partial/legacy saved settings with current defaults (e.g. missing palette). */
export function normalizeHalftoneSettings(partial: Partial<HalftoneSettings>): HalftoneSettings {
  const merged = { ...DEFAULT_SETTINGS, ...partial };
  if (!merged.multicolorPalette?.length) {
    merged.multicolorPalette = [...DEFAULT_MULTICOLOR_PALETTE];
  }
  return merged;
}

export const TEMPLATE_PACKS: Array<{ name: string; settings: HalftoneSettings }> = [
  {
    name: "Newspaper",
    settings: {
      ...DEFAULT_SETTINGS,
      gridSize: 10,
      contrast: 18,
      smoothing: 0.5,
      ditherType: "FloydSteinberg",
    },
  },
  {
    name: "Comic Print",
    settings: {
      ...DEFAULT_SETTINGS,
      gridSize: 18,
      brightness: 10,
      contrast: 24,
      ditherType: "Ordered",
      dotColor: "#141414",
    },
  },
  {
    name: "CMYK Poster",
    settings: {
      ...DEFAULT_SETTINGS,
      gridSize: 14,
      brightness: 12,
      contrast: 28,
      multicolor: true,
      multicolorPalette: ["#0066cc", "#ffcc00", "#e60023", "#111111"],
      ditherType: "Noise",
    },
  },
  {
    name: "Posterized Pop",
    settings: {
      ...DEFAULT_SETTINGS,
      gridSize: 26,
      brightness: 25,
      contrast: 35,
      gamma: 1.2,
      ditherType: "Burkes",
      backgroundColor: "#fff2cc",
      dotColor: "#230f0f",
    },
  },
];
