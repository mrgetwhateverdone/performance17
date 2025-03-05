/** @type {import("next").NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/performance17" : "",
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/performance17" : "",
  /* config options here */
};

export default nextConfig;
