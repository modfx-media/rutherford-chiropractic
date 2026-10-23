import { ORGANIZATION_ID, SCHEMA_ORIGIN, WEBSITE_ID } from "../../_lib/schema-ids";

function absolutePage(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SCHEMA_ORIGIN}${path.endsWith("/") ? path : `${path}/`}`;
}

/** File URLs must not gain a trailing slash (`featured.jpg/`). */
export function schemaAssetUrl(pathOrUrl: string): string {
  const trimmed = pathOrUrl.trim();
  const stripFileSlash = (value: string) => value.replace(/(\.[a-z0-9]{2,5})\/+(?=(?:[?#]|$))/gi, "$1");
  if (/^https?:\/\//i.test(trimmed)) return stripFileSlash(trimmed);
  const path = stripFileSlash(trimmed.startsWith("/") ? trimmed : `/${trimmed}`);
  return `${SCHEMA_ORIGIN}${path}`;
}

/** One BlogPosting per article. Author is the clinic, not the old WordPress user. */
export function BlogPostingSchema({
  headline,
  description,
  path,
  datePublished,
  image,
}: {
  headline: string;
  description?: string;
  path: string;
  datePublished?: string | null;
  image?: string | null;
}) {
  const url = absolutePage(path);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline,
    mainEntityOfPage: url,
    url,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
  if (description) data.description = description;
  if (datePublished) {
    data.datePublished = datePublished;
    data.dateModified = datePublished;
  }
  if (image) data.image = schemaAssetUrl(image);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
