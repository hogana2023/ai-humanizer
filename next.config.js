/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // This tells Next.js that the app directory is in src/
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
