import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://orderflow-api-831973953542.northamerica-south1.run.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
