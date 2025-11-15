import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '900mb', // Adjust based on your script size
    },
  },
};

export default nextConfig;
