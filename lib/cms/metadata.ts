import type { Metadata } from "next";
import { blogSeoOverride } from "@/app/_lib/blog-seo";
import { ORIGIN, metadataFor } from "@/app/_lib/content-map";
import { locationLandingTitle } from "@/app/_lib/location-seo";
import { withAbsoluteMeta } from "@/app/_lib/seo/absolute-meta";
import { cmsPath, publicPath } from "./path";
import { queryPublishedMetaByPath } from "./queries";
import { withCMS } from "./safe";
import type { RoutedDoc } from "./types";
import { getServerURL } from "./url";

function mediaUrl(image: unknown): string | undefined {
  if (typeof image === "string" && image) return image;
  if (image && typeof image === "object" && "url" in image) {
    const url = (image as { url?: string | null }).url;
    if (url) return url;
  }
  return undefined;
}

export function cmsMetadata(doc: RoutedDoc, fallback: Metadata = {}): Metadata {
  const path = publicPath(doc.path);
  const origin = getServerURL() || ORIGIN;
  const canonical =
    doc.canonicalUrl ||
    (path ? (path === "/" ? `${origin}/` : `${origin}${path}`) : undefined);
  const title = doc.meta?.title || doc.title || fallback.title;
  const description = doc.meta?.description || fallback.description;
  const image = mediaUrl(doc.meta?.image);
  const robots = {
    index: !doc.noIndex,
    follow: !doc.noFollow,
  };

  return {
    ...fallback,
    title: title ?? fallback.title,
    description: description ?? fallback.description,
    alternates: canonical
      ? { ...fallback.alternates, canonical }
      : fallback.alternates,
    robots,
    openGraph: {
      ...fallback.openGraph,
      title: typeof title === "string" ? title : fallback.openGraph?.title,
      description: typeof description === "string" ? description : fallback.openGraph?.description,
      url: canonical,
      images: image ? [image] : fallback.openGraph?.images,
    },
  };
}

function normalizePath(path: string): string {
  const withLead = path.startsWith("/") ? path : `/${path}`;
  return withLead.endsWith("/") ? withLead : `${withLead}/`;
}

const FIXED_PAGES: Record<string, { title: string; description?: string }> = {
  "/areas-we-serve/": {
    title: "Areas We Serve | Rutherford",
    description:
      "Condition pages for Murfreesboro, Smyrna, Franklin, Nashville, and nearby Tennessee cities. Rutherford Spine & Wellness. Call 615-217-0097.",
  },
  "/sitemap/": {
    title: "Sitemap | Rutherford",
  },
};

/** Code-owned titles win over CMS copies of the old long templates.
 * Editors still control every other page. */
function applyFixedSeo(path: string, meta: Metadata): Metadata {
  const normalized = normalizePath(path);
  const fixed = FIXED_PAGES[normalized];
  if (fixed) return withAbsoluteMeta(meta, fixed.title, fixed.description);
  const blog = blogSeoOverride(normalized);
  if (blog) return withAbsoluteMeta(meta, blog.title, blog.description);
  const locationTitle = locationLandingTitle(normalized);
  if (locationTitle) return withAbsoluteMeta(meta, locationTitle);
  return meta;
}

export async function metadataWithCMS(
  path: string,
  fallback?: Metadata,
): Promise<Metadata> {
  const hardcoded = fallback ?? (() => {
    try {
      return metadataFor(publicPath(path) ?? path);
    } catch {
      return {};
    }
  })();

  const meta = await withCMS(async () => {
    const doc = await queryPublishedMetaByPath(cmsPath(path) ?? path);
    if (!doc) return hardcoded;
    return cmsMetadata(doc, hardcoded);
  }, hardcoded);
  return applyFixedSeo(path, meta);
}
