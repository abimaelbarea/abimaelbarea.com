/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const securityHeaders = [
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
    formats: ["image/avif", "image/webp"],
  },
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
});
