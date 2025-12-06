// @ts-nocheck
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
};

module.exports = nextConfig;
