import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL ?? "http://localhost:3004";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@squircle-js/react"],
  async rewrites() {
    return [
      {
        source: "/api/socket.io/:path*",
        destination: `${backendUrl}/socket.io/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
