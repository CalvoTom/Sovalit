import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build autonome (image Docker légère) activé uniquement via le Dockerfile.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  poweredByHeader: false,
  images: {
    // Photos servies par le CDN d'Unsplash, optimisées par Next.js
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
