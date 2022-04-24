/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
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
});
