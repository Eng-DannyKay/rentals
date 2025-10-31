import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    domains: [
      "dealerinspire-image-library-prod.s3.us-east-1.amazonaws.com",
      "www.longotoyotaofprosper.com",
      "di-uploads-pod10.dealerinspire.com",
      "hips.hearstapps.com",
      "static.tcimg.net",
    ],
  },
};

export default nextConfig;
