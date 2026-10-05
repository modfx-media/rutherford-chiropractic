import type { MetadataRoute } from "next";
import { ORIGIN, ROUTES } from "./_lib/content-map";
import { CONDITIONS } from "./_lib/conditions";
import { PSEO_COMBINATIONS } from "./_lib/pseo/combinations";
import { PSEO_AUDIENCE_COMBINATIONS } from "./_lib/pseo/audience-content";
import { getPublishedBlogSlugs } from "@/lib/ranked/posts";
import { getSitemapOverrides } from "@/lib/cms/sitemap";

/**
 * Emits `/sitemap.xml` containing every URL from the original WordPress
 * page and post sitemaps, plus the new "Conditions" pages (a taxonomy that
 * doesn't exist on the live origin, so it isn't part of `content-map.json`).
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

  const pseo = PSEO_COMBINATIONS.map((combo) => ({
    url: `${ORIGIN}/${combo.conditionSlug}/${combo.neighborhoodSlug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const pseoAudience = PSEO_AUDIENCE_COMBINATIONS.map((combo) => ({
    url: `${ORIGIN}/${combo.conditionSlug}/${combo.neighborhoodSlug}/${combo.audienceSlug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
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

  const entries = [...migrated, ...conditions, ...pseo, ...pseoAudience, ...areasWeServe, ...ranked]
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
