// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',

 // Next 14 uses /app by default; drop the appDir flag entirely
 experimental: {
   serverComponentsExternalPackages: [],
 },

 // Stub out the optional `webworker-threads` so Webpack won’t error
 webpack(config) {
   config.resolve.fallback = {
     ...(config.resolve.fallback || {}),
     'webworker-threads': false,
   };
   return config;
 },
};

module.exports = nextConfig;

