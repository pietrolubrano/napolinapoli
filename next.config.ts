import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ubixbfsaksemukbx.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "www.tripadvisor.it",
      },
    ],
  },
};

export default nextConfig;
