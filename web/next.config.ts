import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  assetPrefix: "",
  trailingSlash:true,
  images: {
    unoptimized: true, // запрещает Next.js обрабатывать изображения
  }
};

export default nextConfig;
