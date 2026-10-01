/** CMS stores paths with a leading slash and no trailing slash (`/chiropractic`). */
export function cmsPath(input: string | null | undefined): string | null {
  if (input == null) return null;
  const trimmed = String(input).trim();
  if (!trimmed || trimmed === "null" || trimmed === "undefined") return null;
  if (trimmed.includes("null") || trimmed.includes("undefined")) return null;
  let value = trimmed.split("?")[0]?.split("#")[0] ?? "";
  if (!value) return null;
  if (!value.startsWith("/")) value = `/${value}`;
  if (value.length > 1 && value.endsWith("/")) value = value.slice(0, -1);
  return value;
}

/** Public URLs keep a trailing slash except the homepage (`/chiropractic/`). */
export function publicPath(input: string | null | undefined): string | null {
  const path = cmsPath(input);
  if (path == null) return null;
  if (path === "/") return "/";
  return `${path}/`;
}

export function emptyToNull<T>(value: T): T | null {
  if (value === "" || value === undefined) return null;
  return value as T | null;
}
