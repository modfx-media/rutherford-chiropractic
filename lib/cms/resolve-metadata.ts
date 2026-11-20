import type { Metadata } from "next";
import { blogSeoOverride } from "@/app/_lib/blog-seo";
import { ORIGIN } from "@/app/_lib/content-map";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/app/_lib/home-meta";
import { withAbsoluteMeta } from "@/app/_lib/seo/absolute-meta";
import { normalizePagePath, resolveIndexableTitle } from "@/app/_lib/seo/page-titles";
import { publicPath } from "./path";
import type { RoutedDoc } from "./types";
import { getServerURL } from "./url";

/** Non-empty Payload SEO field, or undefined when the editor left it blank. */
export function publishedMetaText(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  if (value.trim() === "") return undefined;
  return value;
}

export type CmsVerbatimSeo = {
  title?: string;
  description?: string;
};

const CMS_VERBATIM = Symbol.for("rutherford.cmsVerbatimSeo");

export function readCmsVerbatim(meta: Metadata): CmsVerbatimSeo {
  const record = meta as Metadata & { [CMS_VERBATIM]?: CmsVerbatimSeo };
  return record[CMS_VERBATIM] ?? {};
}

function tagCmsVerbatim(meta: Metadata, verbatim: CmsVerbatimSeo): Metadata {
  if (!verbatim.title && !verbatim.description) return meta;
  Object.defineProperty(meta, CMS_VERBATIM, {
    value: verbatim,
    enumerable: false,
  });
  return meta;
}

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

/**
 * A published `meta.title` or `meta.description` is the document title and
 * social title/description, with no brand suffix, clamp, or code-owned map.
 * An empty field keeps the existing resolver for that field only.
 */
function applyFixedSeo(path: string, meta: Metadata, verbatim: CmsVerbatimSeo): Metadata {
  const normalized = normalizePagePath(path);
  const title = verbatim.title ?? resolveIndexableTitle(normalized, titleString(meta.title));
  const blog = blogSeoOverride(normalized);
  const description = verbatim.description ?? FIXED_DESCRIPTIONS[normalized] ?? blog?.description;
  return tagCmsVerbatim(withAbsoluteMeta(meta, title, description), verbatim);
}

export function resolveRoutedMetadata(
  path: string,
  doc: RoutedDoc | null | undefined,
  fallback: Metadata = {},
): Metadata {
  const meta = doc ? cmsMetadata(doc, fallback) : fallback;
  return applyFixedSeo(path, meta, {
    title: publishedMetaText(doc?.meta?.title),
    description: publishedMetaText(doc?.meta?.description),
  });
}

/**
 * Homepage still forces the audited title and description when Payload left
 * those SEO fields empty. A published value replaces only that field.
 */
export function withHomeFallback(meta: Metadata): Metadata {
  const verbatim = readCmsVerbatim(meta);
  const title = verbatim.title ?? HOME_TITLE;
  const description = verbatim.description ?? HOME_DESCRIPTION;
  return {
    ...meta,
    title: { absolute: title },
    description,
    openGraph: {
      ...meta.openGraph,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      ...(meta.twitter && typeof meta.twitter === "object" ? meta.twitter : {}),
      title,
      description,
    },
  };
}
