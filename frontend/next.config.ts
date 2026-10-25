import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from the Render backend
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
