import type { BlogPostMeta } from "@/app/_lib/blog";
import type { RoutedDoc } from "./types";

export type ArticleImage = NonNullable<BlogPostMeta["featuredImage"]>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

const LOCALHOST = /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(?=\/|$)/i;
const OPTIMIZED_HOSTS = new Set(["images.unsplash.com", "picsum.photos"]);

/** Remote hosts outside next.config remotePatterns must skip the image optimizer or the photo 400s. */
export function imageUnoptimized(src: string): boolean {
  if (!src.startsWith("http://") && !src.startsWith("https://")) return false;
  try {
    return !OPTIMIZED_HOSTS.has(new URL(src).hostname);
  } catch {
    return true;
  }
}

/** Vercel Blob store origin from BLOB_READ_WRITE_TOKEN, when the token is present. */
export function blobPublicBase(): string | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const storeId = token?.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase();
  if (!storeId) return null;
  return `https://${storeId}.public.blob.vercel-storage.com`;
}

function positiveNumber(value: unknown, fallback: number): number {
  if (typeof value === "number" && value > 0) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (parsed > 0) return parsed;
  }
  return fallback;
}

/**
 * Browser-loadable image URL.
 * Local `/media/...` files stay put. Localhost and `/api/media/file/...` proxies
 * (which 500 on Vercel when the file lives in Blob) become the public blob URL.
 */
export function publicImageSrc(src: string): string {
  let value = src.trim();
  if (!value) return value;
  if (LOCALHOST.test(value)) {
    try {
      const url = new URL(value);
      value = `${url.pathname}${url.search}`;
    } catch {
      return src.trim();
    }
  }
  const file = value.match(/^(?:https?:\/\/[^/]+)?\/api\/media\/file\/([^?#]+)/);
  if (file) {
    const base = blobPublicBase();
    if (base) {
      const encoded = file[1]
        .split("/")
        .map((part) => (part.includes("%") ? part : encodeURIComponent(part)))
        .join("/");
      return `${base}/${encoded}`;
    }
  }
  return value;
}

/** Public URL for a media value. Keeps designed `/media/...` files and blob URLs. */
export function mediaUrl(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return publicImageSrc(value);
  if (typeof value === "number") return null;
  if (!isRecord(value)) return null;
  const url = typeof value.url === "string" ? value.url.trim() : "";
  const src = typeof value.src === "string" ? value.src.trim() : "";
  const thumbnail = typeof value.thumbnailURL === "string" ? value.thumbnailURL.trim() : "";
  const filename = typeof value.filename === "string" ? value.filename.trim() : "";
  const raw = url || src || thumbnail || (filename ? `/api/media/file/${encodeURIComponent(filename)}` : "");
  return raw ? publicImageSrc(raw) : null;
}

export function articleImage(value: unknown, altFallback = ""): ArticleImage | null {
  const src = mediaUrl(value);
  if (!src) return null;
  const record = isRecord(value) ? value : {};
  const alt =
    (typeof record.alt === "string" && record.alt.trim()) || altFallback || "";
  const width = positiveNumber(record.width, 1200);
  const height = positiveNumber(record.height, 630);
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
