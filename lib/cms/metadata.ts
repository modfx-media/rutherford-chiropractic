import type { Metadata } from "next";
import { blogSeoOverride } from "@/app/_lib/blog-seo";
import { ORIGIN, metadataFor } from "@/app/_lib/content-map";
import { withAbsoluteMeta } from "@/app/_lib/seo/absolute-meta";
import { normalizePagePath, resolveIndexableTitle } from "@/app/_lib/seo/page-titles";
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

function titleString(title: Metadata["title"]): string | undefined {
  if (typeof title === "string") return title;
  if (title && typeof title === "object" && "absolute" in title && typeof title.absolute === "string") {
    return title.absolute;
  }
  return undefined;
}

const FIXED_DESCRIPTIONS: Record<string, string> = {
  "/areas-we-serve/":
    "Condition pages for Murfreesboro, Smyrna, Franklin, Nashville, and nearby Tennessee cities. Rutherford Spine & Wellness. Call 615-217-0097.",
};

/** Code-owned titles win over CMS copies of the old long templates.
 * Every indexable path gets one absolute title: brand once, at most 60 characters. */
function applyFixedSeo(path: string, meta: Metadata): Metadata {
  const normalized = normalizePagePath(path);
  const title = resolveIndexableTitle(normalized, titleString(meta.title));
  const blog = blogSeoOverride(normalized);
  const description = FIXED_DESCRIPTIONS[normalized] ?? blog?.description;
  return withAbsoluteMeta(meta, title, description);
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
