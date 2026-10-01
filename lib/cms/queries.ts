import { draftMode } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { cmsPath } from "./path";
import { withCMS } from "./safe";
import type { RoutedContent, RoutedDoc } from "./types";

async function findByPath(
  collection: "pages" | "posts",
  path: string,
  draft: boolean,
): Promise<RoutedDoc | null> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection,
    where: { path: { equals: path } },
    limit: 1,
    draft,
    overrideAccess: draft,
    depth: 1,
  });
  return (result.docs[0] as RoutedDoc | undefined) ?? null;
}

export async function queryRoutedContentByPath(
  rawPath: string,
): Promise<RoutedContent | null> {
  if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) return null;
  return withCMS(async () => {
    const path = cmsPath(rawPath);
    if (!path) return null;
    const { isEnabled } = await draftMode();
    const page = await findByPath("pages", path, isEnabled);
    if (page) return { collection: "pages", doc: page };
    const post = await findByPath("posts", path, isEnabled);
    if (post) return { collection: "posts", doc: post };
    return null;
  }, null);
}

export async function queryPublishedMetaByPath(rawPath: string): Promise<RoutedDoc | null> {
  const routed = await queryRoutedContentByPath(rawPath);
  return routed?.doc ?? null;
}
