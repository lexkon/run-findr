import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      new URL('https://images.unsplash.com/**'),
      new URL('https://*.supabase.co/**')
    ]
  }
};

export default nextConfig;
