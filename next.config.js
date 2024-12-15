import { withPlausibleProxy } from "next-plausible";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your Next.js configuration options here
};

module.exports = withPlausibleProxy()(nextConfig);
