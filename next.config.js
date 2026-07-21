import { createMDX } from "fumadocs-mdx/next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://analytics.jesusperez.dev;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://newstrapi.jesusperez.dev;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src giscus.app;
    frame-ancestors 'none';
    connect-src 'self' https://analytics.jesusperez.dev https://newstrapi.jesusperez.dev;
    upgrade-insecure-requests;
`;

const nextConfig = {
  // your Next.js configuration options here
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "newstrapi.jesusperez.dev", port: "" },
    ],
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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

const withMdx = createMDX({
  configPath: "source.config.ts",
});

export default withMdx(nextConfig);
