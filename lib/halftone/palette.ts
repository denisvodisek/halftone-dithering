/** Map normalized brightness 0–1 along a list of hex colors (linear RGB blend). */
export function colorFromPalette(norm: number, palette: string[]): string {
  const colors = palette.filter((c) => /^#[0-9A-Fa-f]{6}$/.test(c));
  if (colors.length === 0) {
    const t = Math.max(0, Math.min(1, norm));
    return `hsl(${t * 360}, 100%, 50%)`;
  }
  if (colors.length === 1) {
    return colors[0];
  }
  const t = Math.max(0, Math.min(1, norm));
  const max = colors.length - 1;
  const pos = t * max;
  const i = Math.min(Math.floor(pos), max - 1);
  const f = pos - i;
  const a = hexToRgb(colors[i]);
  const b = hexToRgb(colors[i + 1]);
  const r = Math.round(a[0] + (b[0] - a[0]) * f);
  const g = Math.round(a[1] + (b[1] - a[1]) * f);
  const bl = Math.round(a[2] + (b[2] - a[2]) * f);
  return `rgb(${r},${g},${bl})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.slice(1);
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
