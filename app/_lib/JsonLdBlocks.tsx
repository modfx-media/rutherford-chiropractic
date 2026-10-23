import type { JsonLd } from "./content-map";
import { ORGANIZATION_ID, WEBSITE_ID } from "./schema-ids";

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

const LEGACY_MARKERS = [
  "#person",
  "palashseo",
  '"name":"Palash"',
  "Chiropractic Murfreesboro TN",
  "/?s=",
  '"HealthClub"',
];

/** Rank Math / Yoast graphs: fake Person+Organization, Article by Palash,
 * site-search action, and the HealthClub block copied from WordPress. */
function isLegacyBlock(block: JsonLd): boolean {
  const serialized = JSON.stringify(block);
  return LEGACY_MARKERS.some((marker) => serialized.includes(marker));
}

/** Nested copies of #website / #organization carried a second name
 * ("Rutherford Chiropractic"). Point them at the single sitewide nodes. */
function collapseEntityRefs(value: unknown, nested: boolean): unknown {
  if (Array.isArray(value)) return value.map((item) => collapseEntityRefs(item, true));
  if (!value || typeof value !== "object") return value;
  const node = value as Record<string, unknown>;
  const type = node["@type"];
  const types = Array.isArray(type) ? type : type ? [type] : [];
  const id = node["@id"];
  if (nested && id === WEBSITE_ID && types.includes("WebSite")) {
    return { "@id": WEBSITE_ID };
  }
  if (nested && id === ORGANIZATION_ID) {
    return { "@id": ORGANIZATION_ID };
  }
  const next: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(node)) {
    next[key] = collapseEntityRefs(child, true);
  }
  return next;
}

/**
 * Renders JSON-LD blocks migrated from WordPress, minus the Rank Math graph
 * (Article by Palash, Person/Organization "Chiropractic Murfreesboro TN",
 * and the `/?s=` SearchAction). BreadcrumbList nodes are removed because
 * pages with a visible breadcrumb emit a matching list from BreadcrumbSchema.
 * The layout emits the one Chiropractor and the one WebSite.
 */
export function JsonLdBlocks({ blocks }: { blocks: JsonLd[] }) {
  if (!blocks?.length) return null;
  const cleaned = blocks.flatMap((block) => {
    if (isLegacyBlock(block)) return [];
    const next = withoutBreadcrumbs(collapseEntityRefs(block, false));
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
