import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Same halftone cluster as favicon, scaled for apple-touch-icon. */
export default function AppleIcon() {
  const bg = "#0c0c0c";
  const edge = "#9ca3af";
  const core = "#fafafa";
  const k = 180 / 32;

  const dot = (left: number, top: number, w: number, h: number, c: string, key: number) => {
    const pw = Math.round(w * k);
    const ph = Math.round(h * k);
    return (
      <div
        key={key}
        style={{
          position: "absolute",
          left: Math.round(left * k),
          top: Math.round(top * k),
          width: pw,
          height: ph,
          borderRadius: Math.min(pw, ph) / 2,
          background: c,
        }}
      />
    );
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          background: bg,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 180,
            height: 180,
            display: "flex",
          }}
        >
          {dot(6, 6, 5, 5, edge, 0)}
          {dot(21, 6, 5, 5, edge, 1)}
          {dot(11, 11, 10, 10, core, 2)}
          {dot(6, 21, 5, 5, edge, 3)}
          {dot(21, 21, 5, 5, edge, 4)}
        </div>
      </div>
    ),
    { ...size },
  );
}
