import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Used by the c-card-9 / c-carousel-3 example components (placeholder photos).
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
