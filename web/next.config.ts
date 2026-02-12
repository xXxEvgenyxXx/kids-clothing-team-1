import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Делает проект статическим
  distDir: 'dist',  // Влияет на .next, но не на next export
};

export default nextConfig;