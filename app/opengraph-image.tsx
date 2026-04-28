import { ImageResponse } from "next/og";

export const alt = "Halftone Dithering FX — free online halftone and dithering generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0c0c",
          backgroundImage: "radial-gradient(circle at 1px 1px, #262626 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 64px",
            borderRadius: 24,
            background: "rgba(10,10,10,0.92)",
            border: "1px solid #2a2a2a",
            boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#fafafa",
              textAlign: "center",
              lineHeight: 1.15,
            }}
          >
            Halftone Dithering FX
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 26,
              fontWeight: 400,
              color: "#a3a3a3",
              textAlign: "center",
              maxWidth: 720,
              lineHeight: 1.35,
            }}
          >
            Free halftone & dithering for images and video — PNG, SVG, WebM
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
