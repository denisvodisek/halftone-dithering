import { applyDithering } from "@/lib/halftone/ditherers";
import { colorFromPalette } from "@/lib/halftone/palette";
import type { HalftoneRenderResult, HalftoneSettings } from "@/lib/halftone/types";

interface DrawHalftoneOptions {
  source: CanvasImageSource;
  targetCanvas: HTMLCanvasElement;
  settings: HalftoneSettings;
  scaleFactor?: number;
  minExportWidth?: number;
  minExportHeight?: number;
  /** Cap longest side for fast preview (exports should omit this). */
  maxLongSide?: number;
}

function applyBoxBlur(cellValues: Float32Array, numRows: number, numCols: number, strength: number) {
  let result = new Float32Array(cellValues);
  const passes = Math.floor(strength);

  for (let pass = 0; pass < passes; pass += 1) {
    const temp = new Float32Array(result.length);
    for (let row = 0; row < numRows; row += 1) {
      for (let col = 0; col < numCols; col += 1) {
        let sum = 0;
        let count = 0;
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            const r = row + dy;
            const c = col + dx;
            if (r >= 0 && r < numRows && c >= 0 && c < numCols) {
              sum += result[r * numCols + c];
              count += 1;
            }
          }
        }
        temp[row * numCols + col] = sum / count;
      }
    }
    result = temp;
  }

  const fractional = strength - Math.floor(strength);
  if (fractional > 0) {
    for (let i = 0; i < result.length; i += 1) {
      result[i] = cellValues[i] * (1 - fractional) + result[i] * fractional;
    }
  }

  return result;
}

function getDotColor(settings: HalftoneSettings, brightnessValue: number) {
  if (settings.multicolor) {
    return colorFromPalette(brightnessValue / 255, settings.multicolorPalette);
  }
  return settings.dotColor;
}

function getSourceDimensions(source: CanvasImageSource) {
  if (source instanceof HTMLVideoElement) {
    return { width: source.videoWidth, height: source.videoHeight };
  }
  if (source instanceof HTMLImageElement) {
    return { width: source.naturalWidth || source.width, height: source.naturalHeight || source.height };
  }
  if (source instanceof HTMLCanvasElement) {
    return { width: source.width, height: source.height };
  }
  if (source instanceof ImageBitmap) {
    return { width: source.width, height: source.height };
  }
  return { width: 0, height: 0 };
}

export function drawHalftone({
  source,
  targetCanvas,
  settings,
  scaleFactor = 1,
  minExportWidth = 0,
  minExportHeight = 0,
  maxLongSide,
}: DrawHalftoneOptions): HalftoneRenderResult | null {
  const sourceDimensions = getSourceDimensions(source);
  if (!sourceDimensions.width || !sourceDimensions.height) {
    return null;
  }

  let scaledWidth = Math.max(Math.round(sourceDimensions.width * scaleFactor), minExportWidth);
  let scaledHeight = Math.max(Math.round(sourceDimensions.height * scaleFactor), minExportHeight);

  if (maxLongSide && maxLongSide > 0) {
    const long = Math.max(scaledWidth, scaledHeight);
    if (long > maxLongSide) {
      const factor = maxLongSide / long;
      scaledWidth = Math.max(1, Math.round(scaledWidth * factor));
      scaledHeight = Math.max(1, Math.round(scaledHeight * factor));
    }
  }

  targetCanvas.width = scaledWidth;
  targetCanvas.height = scaledHeight;

  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = scaledWidth;
  tempCanvas.height = scaledHeight;
  const tempCtx = tempCanvas.getContext("2d");
  if (!tempCtx) {
    return null;
  }

  tempCtx.drawImage(source, 0, 0, scaledWidth, scaledHeight);
  const imageData = tempCtx.getImageData(0, 0, scaledWidth, scaledHeight);
  const { data } = imageData;

  const contrastFactor =
    (259 * (settings.contrast + 255)) / Math.max(1, 255 * (259 - settings.contrast));
  const grayData = new Float32Array(scaledWidth * scaledHeight);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    let gray = 0.299 * r + 0.587 * g + 0.114 * b;
    gray = contrastFactor * (gray - 128) + 128 + settings.brightness;
    gray = Math.max(0, Math.min(255, gray));
    gray = 255 * Math.pow(gray / 255, 1 / Math.max(settings.gamma, 0.1));
    grayData[i / 4] = gray;
  }

  const grid = Math.max(2, Math.round(settings.gridSize * scaleFactor));
  const numCols = Math.ceil(scaledWidth / grid);
  const numRows = Math.ceil(scaledHeight / grid);
  let cellValues = new Float32Array(numRows * numCols);

  for (let row = 0; row < numRows; row += 1) {
    for (let col = 0; col < numCols; col += 1) {
      const startY = row * grid;
      const startX = col * grid;
      const endY = Math.min(startY + grid, scaledHeight);
      const endX = Math.min(startX + grid, scaledWidth);

      let sum = 0;
      let count = 0;

      for (let y = startY; y < endY; y += 1) {
        for (let x = startX; x < endX; x += 1) {
          sum += grayData[y * scaledWidth + x];
          count += 1;
        }
      }

      cellValues[row * numCols + col] = sum / Math.max(1, count);
    }
  }

  if (settings.smoothing > 0) {
    cellValues = applyBoxBlur(cellValues, numRows, numCols, settings.smoothing);
  }

  applyDithering(settings.ditherType, cellValues, numRows, numCols);

  const ctx = targetCanvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  ctx.fillStyle = settings.backgroundColor;
  ctx.fillRect(0, 0, scaledWidth, scaledHeight);

  for (let row = 0; row < numRows; row += 1) {
    for (let col = 0; col < numCols; col += 1) {
      const brightnessValue = cellValues[row * numCols + col];
      const normalized = brightnessValue / 255;
      const radius = (grid / 2) * (1 - normalized);
      if (radius <= 0.5) {
        continue;
      }
      const centerX = col * grid + grid / 2;
      const centerY = row * grid + grid / 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = getDotColor(settings, brightnessValue);
      ctx.fill();
    }
  }

  return {
    width: scaledWidth,
    height: scaledHeight,
    grid,
    numCols,
    numRows,
    cellValues,
  };
}

export function generateSvg(
  result: HalftoneRenderResult,
  settings: HalftoneSettings,
  exportName = "Halftone Dithering FX",
) {
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${result.width}" height="${result.height}" viewBox="0 0 ${result.width} ${result.height}">`;
  svg += `<title>${exportName}</title>`;
  svg += `<rect width="100%" height="100%" fill="${settings.backgroundColor}" />`;

  for (let row = 0; row < result.numRows; row += 1) {
    for (let col = 0; col < result.numCols; col += 1) {
      const brightnessValue = result.cellValues[row * result.numCols + col];
      const normalized = brightnessValue / 255;
      const radius = (result.grid / 2) * (1 - normalized);
      if (radius <= 0.5) {
        continue;
      }
      const centerX = col * result.grid + result.grid / 2;
      const centerY = row * result.grid + result.grid / 2;
      const color = settings.multicolor
        ? colorFromPalette(brightnessValue / 255, settings.multicolorPalette)
        : settings.dotColor;
      svg += `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="${color}" />`;
    }
  }

  svg += "</svg>";
  return svg;
}
