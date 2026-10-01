import { cmsPath, publicPath } from "./path";

/**
 * Live preview / admin preview URL. Returns null when path or slug is missing
 * so Payload never opens `/null`.
 */
export function previewFromPath(
  path?: unknown,
  slug?: unknown,
): string | null {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return null;

  const fromPath = typeof path === "string" ? cmsPath(path) : null;
  const fromSlug =
    typeof slug === "string" && slug.trim() && slug !== "home"
      ? cmsPath(`/${slug}`)
      : slug === "home"
        ? "/"
        : null;
  const resolved = fromPath ?? fromSlug;
  if (!resolved) return null;

  const dest = publicPath(resolved);
  if (!dest) return null;

  return `/next/preview?path=${encodeURIComponent(dest)}&previewSecret=${encodeURIComponent(secret)}`;
}
