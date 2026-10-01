import { getPayload } from "payload";
import config from "@payload-config";
import { ORIGIN } from "@/app/_lib/content-map";
import { cmsPath, publicPath } from "./path";
import { withCMS } from "./safe";

export type SitemapOverride = {
  exclude: boolean;
  lastModified?: Date;
};

export async function getSitemapOverrides(): Promise<Map<string, SitemapOverride>> {
  if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) return new Map();
  return withCMS(async () => {
    const payload = await getPayload({ config });
    const map = new Map<string, SitemapOverride>();

    for (const collection of ["pages", "posts"] as const) {
      const result = await payload.find({
        collection,
        where: { _status: { equals: "published" } },
        depth: 0,
        limit: 10000,
        pagination: false,
        overrideAccess: false,
      });

      for (const doc of result.docs as Array<{
        path?: string | null;
        noIndex?: boolean | null;
        excludeFromSitemap?: boolean | null;
        updatedAt?: string | null;
        sourceUpdatedAt?: string | null;
      }>) {
        const path = publicPath(cmsPath(doc.path));
        if (!path) continue;
        const url = path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`;
        const stamp = doc.updatedAt || doc.sourceUpdatedAt;
        map.set(url, {
          exclude: Boolean(doc.noIndex || doc.excludeFromSitemap),
          lastModified: stamp ? new Date(stamp) : undefined,
        });
      }
    }

    return map;
  }, new Map());
}
