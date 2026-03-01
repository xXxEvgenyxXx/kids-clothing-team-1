import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove `output: 'export'` to allow dynamic server routes that read/write
  // local JSON files during development.
  distDir: 'out',
  assetPrefix: "/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
