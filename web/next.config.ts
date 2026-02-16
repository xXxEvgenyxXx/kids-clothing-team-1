import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  assetPrefix: "./kids-clothing-team-1/web/",
  trailingSlash:true,
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
