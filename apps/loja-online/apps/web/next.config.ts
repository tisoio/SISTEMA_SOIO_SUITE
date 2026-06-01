import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@soio/shared"],
  turbopack: {
    root: "../..",
  },
};

export default nextConfig;
