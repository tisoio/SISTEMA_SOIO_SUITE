import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

const nextConfig: NextConfig = {
  transpilePackages: ["@soio/shared"],
  turbopack: {
    root,
  },
};

export default nextConfig;
