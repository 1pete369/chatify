import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns :[{
      protocol : "https",
      hostname : "goal-grid-media.s3.ap-south-1.amazonaws.com"
    },{
      protocol : "https",
      hostname : "*"
    }]
  }
};

export default nextConfig;
