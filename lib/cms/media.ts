import type { BlogPostMeta } from "@/app/_lib/blog";
import type { RoutedDoc } from "./types";

export type ArticleImage = NonNullable<BlogPostMeta["featuredImage"]>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/** Public URL for a media value. Keeps designed `/media/...` files and blob URLs. */
export function mediaUrl(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (!isRecord(value)) return null;
  const url = typeof value.url === "string" ? value.url.trim() : "";
  const src = typeof value.src === "string" ? value.src.trim() : "";
  return url || src || null;
}

export function articleImage(value: unknown, altFallback = ""): ArticleImage | null {
  const src = mediaUrl(value);
  if (!src) return null;
  const record = isRecord(value) ? value : {};
  const alt =
    (typeof record.alt === "string" && record.alt.trim()) || altFallback || "";
  const width = typeof record.width === "number" && record.width > 0 ? record.width : 1200;
  const height = typeof record.height === "number" && record.height > 0 ? record.height : 630;
  return { src, alt, width, height };
}

export function featuredImageForDoc(doc: RoutedDoc): ArticleImage | null {
  const alt = doc.title || "";
  const content = isRecord(doc.content) ? doc.content : {};
  return (
    articleImage(doc.featuredImage, alt) ||
    articleImage(content.featuredImage, alt) ||
    articleImage(doc.meta?.image, alt)
  );
}
