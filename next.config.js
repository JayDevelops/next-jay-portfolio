/** @type {import('next').NextConfig} */
const nextConfig = {
  // your Next.js configuration options here
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "newstrapi.jesusperez.dev", port: "" },
    ],
  },
};

module.exports = nextConfig;
