import type { MetadataRoute } from "next";
import { ORIGIN, ROUTES } from "./_lib/content-map";
import { CONDITIONS } from "./_lib/conditions";
import { PSEO_COMBINATIONS } from "./_lib/pseo/combinations";
import { getCustomPseoContent } from "./_lib/pseo/city-content";
import { getPublishedBlogSlugs } from "@/lib/ranked/posts";
import { publishedCmsSitemapEntries } from "@/lib/cms/posts";
import { getSitemapOverrides } from "@/lib/cms/sitemap";

/**
 * Single indexable sitemap at `/sitemap.xml`.
 * Migrated WordPress page and post URLs stay here (they are real pages, not
 * the old Yoast sitemap files). Condition × neighborhood URLs are included
 * only when they have hand-written city copy. Fragment-only neighborhood
 * pages and the audience cartesian product are noindex and omitted.
 * `lastModified` for migrated routes is taken from Yoast's original
 * `<lastmod>` timestamp so we don't reset freshness signals on migration.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const migrated = ROUTES.map((r) => {
    const url = `${ORIGIN}${r.path}`;
    const lastModified = r.lastmod ? new Date(r.lastmod) : undefined;
    const priority =
      r.category === "home"
        ? 1
        : r.category === "core-service"
          ? 0.9
          : r.category === "utility"
            ? 0.6
            : r.category === "blog-index"
              ? 0.7
              : r.category === "location-landing"
                ? 0.7
                : 0.5;
    const changeFrequency =
      r.category === "blog-post"
        ? ("monthly" as const)
        : r.category === "home"
          ? ("weekly" as const)
          : ("monthly" as const);
    return { url, lastModified, changeFrequency, priority };
  });

  const conditions = CONDITIONS.map((c) => ({
    url: `${ORIGIN}/${c.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const pseo = PSEO_COMBINATIONS.filter((combo) =>
    getCustomPseoContent(combo.conditionSlug, combo.neighborhoodSlug),
  ).map((combo) => ({
    url: `${ORIGIN}/${combo.conditionSlug}/${combo.neighborhoodSlug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const areasWeServe = [
    {
      url: `${ORIGIN}/areas-we-serve/`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${ORIGIN}/sitemap/`,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
  ];

  const rankedSlugs = await getPublishedBlogSlugs().catch(() => [])
  const ranked = rankedSlugs.map((slug) => ({
    url: `${ORIGIN}/blog/${slug}/`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  const entries = [...migrated, ...conditions, ...pseo, ...areasWeServe, ...ranked]
  const seen = new Set(entries.map((entry) => entry.url))
  const cmsPosts = await publishedCmsSitemapEntries()
  for (const post of cmsPosts) {
    if (seen.has(post.url)) continue
    seen.add(post.url)
    entries.push({
      url: post.url,
      lastModified: post.lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })
  }
  const overrides = await getSitemapOverrides()

  return entries.flatMap((entry) => {
    const override = overrides.get(entry.url)
    if (override?.exclude) return []
    const lastModified =
      override?.lastModified ??
      ("lastModified" in entry ? entry.lastModified : undefined)
    return [
      {
        ...entry,
        lastModified,
      },
    ]
  })
}
