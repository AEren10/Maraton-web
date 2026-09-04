import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: path.dirname(new URL(import.meta.url).pathname.slice(1)) },
};

export default nextConfig;
