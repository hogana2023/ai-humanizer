/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    // Disable server components for simpler build
    appDir: true,
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;
