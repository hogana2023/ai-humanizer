// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',

  // <-- ADD THIS BLOCK -->
  webpack(config) {
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      // treat 'webworker-threads' as an empty module
      'webworker-threads': false,
    };
    return config;
  },
};

module.exports = nextConfig;

