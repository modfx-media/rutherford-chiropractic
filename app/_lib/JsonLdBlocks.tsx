import type { JsonLd } from "./content-map";

function isBreadcrumbList(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const type = (value as { "@type"?: unknown })["@type"];
  return type === "BreadcrumbList" || (Array.isArray(type) && type.includes("BreadcrumbList"));
}

/** Drop scraped Yoast breadcrumb nodes. Visible trails emit their own list. */
function withoutBreadcrumbs(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.filter((item) => !isBreadcrumbList(item)).map(withoutBreadcrumbs);
  }
  if (!value || typeof value !== "object") return value;
  if (isBreadcrumbList(value)) return undefined;
  const next: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (key === "breadcrumb") continue;
    const cleaned = withoutBreadcrumbs(child);
    if (cleaned !== undefined) next[key] = cleaned;
  }
  return next;
}

/**
 * Renders JSON-LD schema blocks migrated from the WordPress origin.
 * BreadcrumbList nodes are removed here because pages with a visible
 * breadcrumb emit a matching list from `BreadcrumbSchema`.
 */
export function JsonLdBlocks({ blocks }: { blocks: JsonLd[] }) {
  if (!blocks?.length) return null;
  const cleaned = blocks.flatMap((block) => {
    const next = withoutBreadcrumbs(block);
    if (!next || typeof next !== "object") return [];
    if (isBreadcrumbList(next)) return [];
    return [next as JsonLd];
  });
  if (!cleaned.length) return null;
  return (
    <>
      {cleaned.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
