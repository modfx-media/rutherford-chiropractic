/**
 * BreadcrumbList JSON-LD matching a visible breadcrumb trail.
 * Pass `path` only for crumbs that are real URLs.
 */

const ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rutherfordchiropractic.com"
).replace(/\/$/, "");

export type BreadcrumbItem = {
  name: string;
  path?: string;
};

function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path === "/") return `${ORIGIN}/`;
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return `${ORIGIN}${withSlash.endsWith("/") ? withSlash : `${withSlash}/`}`;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  if (items.length < 2) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const entry: Record<string, unknown> = {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
      };
      if (item.path) entry.item = absoluteUrl(item.path);
      return entry;
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
