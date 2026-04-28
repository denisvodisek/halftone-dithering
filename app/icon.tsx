import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Tiny halftone cluster: bright center, softer corners (reads as a dot screen at favicon size). */
export default function Icon() {
  const bg = "#0c0c0c";
  const edge = "#9ca3af";
  const core = "#fafafa";

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          background: bg,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 32,
            height: 32,
            display: "flex",
          }}
        >
          {(
            [
              { left: 6, top: 6, w: 5, h: 5, c: edge },
              { left: 21, top: 6, w: 5, h: 5, c: edge },
              { left: 11, top: 11, w: 10, h: 10, c: core },
              { left: 6, top: 21, w: 5, h: 5, c: edge },
              { left: 21, top: 21, w: 5, h: 5, c: edge },
            ] as const
          ).map((d, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: d.left,
                top: d.top,
                width: d.w,
                height: d.h,
                borderRadius: Math.min(d.w, d.h) / 2,
                background: d.c,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
