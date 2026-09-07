import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,

  output: process.env.VERCEL ? undefined : 'standalone',

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.jobscape.dev',
      },
    ],
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `${process.env.INTERNAL_API_URL ?? 'http://localhost:4000/api'}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
