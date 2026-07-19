import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://res.cloudinary.com/**"),
      new URL("https://avatars.githubusercontent.com/**"),
      new URL("https://raw.githubusercontent.com/**"),
      new URL("https://firebasestorage.googleapis.com/**"),
      new URL("https://*.firebasestorage.app/**"),
    ],
  },
};

export default nextConfig;
