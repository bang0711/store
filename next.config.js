/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["thumbs.gfycat.com"],
  },
};

module.exports = nextConfig;
