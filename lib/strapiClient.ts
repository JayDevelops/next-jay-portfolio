// lib/strapiClient.ts
import { strapi } from "@strapi/client";

if (!process.env.STRAPI_BASE_URL) {
  throw new Error("Missing STRAPI_BASE_URL in environment variables");
}
if (!process.env.STRAPI_API_TOKEN) {
  throw new Error("Missing STRAPI_API_TOKEN in environment variables");
}

export const strapiClient = strapi({
  baseURL: `${process.env.STRAPI_BASE_URL}/api`,
  auth: process.env.STRAPI_API_TOKEN,
});
