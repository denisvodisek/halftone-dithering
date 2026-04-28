import type { MarkShape } from "@/lib/halftone/types";

/** `radius` matches classic halftone: half-size of the mark when fully “on”. */
export function fillHalftoneMark(
  ctx: CanvasRenderingContext2D,
  shape: MarkShape,
  centerX: number,
  centerY: number,
  radius: number,
  fillStyle: string,
) {
  if (radius <= 0.5) {
    return;
  }
  ctx.fillStyle = fillStyle;

  switch (shape) {
    case "Circle":
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      break;

    case "Square": {
      const s = 2 * radius;
      ctx.fillRect(centerX - radius, centerY - radius, s, s);
      break;
    }

    case "Diamond": {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX + radius, centerY);
      ctx.lineTo(centerX, centerY + radius);
      ctx.lineTo(centerX - radius, centerY);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "Triangle": {
      ctx.beginPath();
      for (let i = 0; i < 3; i += 1) {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 3;
        const x = centerX + radius * Math.cos(a);
        const y = centerY + radius * Math.sin(a);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "Plus": {
      const t = Math.max(0.5, radius * 0.32);
      const L = radius * 1.12;
      ctx.fillRect(centerX - t, centerY - L, 2 * t, 2 * L);
      ctx.fillRect(centerX - L, centerY - t, 2 * L, 2 * t);
      break;
    }

    default:
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
  }
}

export function svgHalftoneMark(
  shape: MarkShape,
  centerX: number,
  centerY: number,
  radius: number,
  color: string,
): string {
  if (radius <= 0.5) {
    return "";
  }
  const c = color;

  switch (shape) {
    case "Circle":
      return `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="${c}" />`;

    case "Square": {
      const s = 2 * radius;
      const x = centerX - radius;
      const y = centerY - radius;
      return `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${c}" />`;
    }

    case "Diamond": {
      const pts = [
        [centerX, centerY - radius],
        [centerX + radius, centerY],
        [centerX, centerY + radius],
        [centerX - radius, centerY],
      ];
      return `<polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="${c}" />`;
    }

    case "Triangle": {
      const pts: string[] = [];
      for (let i = 0; i < 3; i += 1) {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 3;
        pts.push(`${centerX + radius * Math.cos(a)},${centerY + radius * Math.sin(a)}`);
      }
      return `<polygon points="${pts.join(" ")}" fill="${c}" />`;
    }

    case "Plus": {
      const t = Math.max(0.5, radius * 0.32);
      const L = radius * 1.12;
      return [
        `<rect x="${centerX - t}" y="${centerY - L}" width="${2 * t}" height="${2 * L}" fill="${c}" />`,
        `<rect x="${centerX - L}" y="${centerY - t}" width="${2 * L}" height="${2 * t}" fill="${c}" />`,
      ].join("");
    }

    default:
      return `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="${c}" />`;
  }
}
