import type { NextConfig } from "next";

// Collapse every non-canonical host into https://halftone-fx.com so Google sees
// one indexable URL per page. http->https is handled by the host automatically.
const DUPLICATE_HOSTS = ["www.halftone-fx.com", "halftone-dithering.vercel.app"];

const nextConfig: NextConfig = {
  async redirects() {
    return DUPLICATE_HOSTS.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://halftone-fx.com/:path*",
      permanent: true,
    }));
  },
};

export default nextConfig;
