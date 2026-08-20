import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from any backend (local or EC2)
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

  // Proxy /api/* requests through Vercel to the backend.
  // In production, this eliminates cross-origin issues (no domain/HTTPS needed on EC2).
  // In development, BACKEND_URL defaults to localhost:8000.
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
