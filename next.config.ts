import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/performance17" : "",
  output: "export",
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
