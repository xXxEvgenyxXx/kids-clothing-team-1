import type { NextConfig } from "next";

// При сборке для GitHub Pages установите:
//   NEXT_STATIC_EXPORT=true
//   NEXT_BASE_PATH=/<repo-name>/web1
//   NEXT_PUBLIC_BASE_PATH=/<repo-name>/web1
const isStaticExport = process.env.NEXT_STATIC_EXPORT === 'true';
const basePath = process.env.NEXT_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  ...(isStaticExport && { output: 'export' }),
  distDir: 'out',
  basePath,
  assetPrefix: basePath || '/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
