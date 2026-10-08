import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { siteApex } from "./lib/cms/url";

/** Yoast files from the old WordPress site. The app never generates these. */
const LEGACY_SITEMAP_PATHS = [
  "/sitemap_index.xml",
  "/page-sitemap.xml",
  "/post-sitemap.xml",
  "/wp-sitemap.xml",
];

const nextConfig: NextConfig = {
  // The live WordPress site indexes every URL with a trailing slash
  // (e.g. /chiropractic/, /back-pain-relief-nashville-tn/). Preserve that
  // shape 1:1 so we don't force 301s on every existing SERP entry.
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com", pathname: "/**" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com", pathname: "/**" },
    ],
  },
  outputFileTracingExcludes: {
    "*": ["./public/images/**", "./public/**/*.mp4", "./public/**/*.webm"],
  },
  outputFileTracingIncludes: {
    "/*": [
      "./node_modules/sharp/**/*",
      "./node_modules/@img/sharp-linux-x64/**/*",
      "./node_modules/@img/sharp-libvips-linux-x64/**/*",
    ],
  },
  serverExternalPackages: [
    "pg",
    "@payloadcms/db-vercel-postgres",
    "@neondatabase/serverless",
    "@vercel/postgres",
  ],
  async redirects() {
    const origin = `https://${siteApex()}`;
    const wwwHost = `www.${siteApex()}`;
    const apexHost = siteApex();
    const permanent = { statusCode: 301 as const };

    const legacySitemaps = LEGACY_SITEMAP_PATHS.flatMap((source) => [
      { source, destination: `${origin}/sitemap.xml`, ...permanent },
      { source: `${source}/`, destination: `${origin}/sitemap.xml`, ...permanent },
    ]);

    return [
      { source: "/home.html", destination: `${origin}/`, ...permanent },
      { source: "/home.html/", destination: `${origin}/`, ...permanent },
      ...legacySitemaps,
      {
        source: "/sitemap.xml",
        has: [{ type: "host", value: wwwHost }],
        destination: `${origin}/sitemap.xml`,
        ...permanent,
      },
      {
        source: "/robots.txt",
        has: [{ type: "host", value: wwwHost }],
        destination: `${origin}/robots.txt`,
        ...permanent,
      },
      {
        source: "/sitemap.xml",
        has: [
          { type: "host", value: apexHost },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: `${origin}/sitemap.xml`,
        ...permanent,
      },
      {
        source: "/robots.txt",
        has: [
          { type: "host", value: apexHost },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: `${origin}/robots.txt`,
        ...permanent,
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
