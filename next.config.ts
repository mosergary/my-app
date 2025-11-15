import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '200mb', // Adjust based on your script size
    },
  },
};

export default nextConfig;
