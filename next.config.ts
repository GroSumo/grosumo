import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Send the bare domain to the canonical www host, keeping the path.
  // (If the site is on Vercel, the same redirect can be set under Project → Domains instead; either works.)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "grosumo.com" }],
        destination: "https://www.grosumo.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
