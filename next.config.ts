import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Depo dışındaki package-lock.json'ı köke saymasın diye.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
