const { headers } = require("next/headers");

/** @type {import('next').NextConfig} */
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src giscus.app;
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

const nextConfig = {
  // your Next.js configuration options here
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "newstrapi.jesusperez.dev", port: "" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
