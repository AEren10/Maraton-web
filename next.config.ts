import type { NextConfig } from "next";

const GUVENLIK = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  // Depo dışındaki package-lock.json'ı köke saymasın diye.
  turbopack: { root: process.cwd() },
  async headers() {
    return [{ source: "/:yol*", headers: GUVENLIK }];
  },
};

export default nextConfig;
