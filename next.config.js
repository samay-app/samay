/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["./styles"],
  },
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
