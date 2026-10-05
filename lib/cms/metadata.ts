import type { Metadata } from "next";
import { ORIGIN, metadataFor } from "@/app/_lib/content-map";
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

  return withCMS(async () => {
    const doc = await queryPublishedMetaByPath(cmsPath(path) ?? path);
    if (!doc) return hardcoded;
    return cmsMetadata(doc, hardcoded);
  }, hardcoded);
}
