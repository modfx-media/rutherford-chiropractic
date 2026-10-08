import type { BlogPostMeta } from "@/app/_lib/blog";
import config from "@payload-config";
import { getPayload } from "payload";
import { featuredImageForDoc } from "./media";
import { publicPath } from "./path";
import { withCMS } from "./safe";
import type { RoutedDoc } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function cmsPostToMeta(doc: RoutedDoc): BlogPostMeta | null {
  const content = isRecord(doc.content) ? doc.content : {};
  const slug = (typeof doc.slug === "string" && doc.slug) || (typeof content.slug === "string" && content.slug) || "";
  const title = (typeof doc.title === "string" && doc.title) || (typeof content.title === "string" && content.title) || "";
  if (!slug || !title) return null;

  const path = publicPath(doc.path) ?? publicPath(`/${slug}`);
  if (!path) return null;

  const publishedAt =
    (typeof doc.publishedAt === "string" && doc.publishedAt) ||
    (typeof content.publishedAt === "string" && content.publishedAt) ||
    doc.updatedAt ||
    null;

  return {
    slug,
    path,
    title,
    category:
      (typeof doc.category === "string" && doc.category) ||
      (typeof content.category === "string" && content.category) ||
      "Chiropractic Care",
    publishedAt,
    featuredImage: featuredImageForDoc(doc),
    excerpt:
      (typeof doc.excerpt === "string" && doc.excerpt) ||
      (typeof content.excerpt === "string" && content.excerpt) ||
      "",
  };
}

async function findPublishedPosts(): Promise<RoutedDoc[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    depth: 1,
    limit: 1000,
    pagination: false,
    overrideAccess: false,
  });
  return result.docs as RoutedDoc[];
}

export function mergeCmsPosts(cmsPosts: BlogPostMeta[], hardcoded: BlogPostMeta[]): BlogPostMeta[] {
  const seenSlugs = new Set(hardcoded.map((post) => post.slug));
  const seenPaths = new Set(hardcoded.map((post) => post.path));
  const merged = [...hardcoded];

  for (const post of cmsPosts) {
    if (seenSlugs.has(post.slug) || seenPaths.has(post.path)) continue;
    seenSlugs.add(post.slug);
    seenPaths.add(post.path);
    merged.push(post);
  }

  return merged.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

/** Published Payload posts for the blog index. Throws if the database is down. */
export async function fetchPublishedCmsPosts(): Promise<BlogPostMeta[]> {
  const docs = await findPublishedPosts();
  return docs.map((doc) => cmsPostToMeta(doc)).filter((post): post is BlogPostMeta => Boolean(post));
}

export async function publishedCmsSitemapEntries(): Promise<
  Array<{ url: string; lastModified?: Date }>
> {
  if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) return [];
  return withCMS(async () => {
    const docs = await findPublishedPosts();
    const { ORIGIN } = await import("@/app/_lib/content-map");
    const entries: Array<{ url: string; lastModified?: Date }> = [];
    for (const doc of docs) {
      if (doc.noIndex || doc.excludeFromSitemap) continue;
      const path = publicPath(doc.path);
      if (!path) continue;
      const url = path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`;
      const stamp = doc.updatedAt || doc.sourceUpdatedAt || doc.publishedAt;
      entries.push({ url, lastModified: stamp ? new Date(stamp) : undefined });
    }
    return entries;
  }, []);
}
