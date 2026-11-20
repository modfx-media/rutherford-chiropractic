import type { Metadata } from "next";
import { metadataFor } from "@/app/_lib/content-map";
import { publicPath, cmsPath } from "./path";
import { queryPublishedMetaByPath } from "./queries";
import { resolveRoutedMetadata } from "./resolve-metadata";
import { withCMS } from "./safe";

export { cmsMetadata, readCmsVerbatim, resolveRoutedMetadata, withHomeFallback } from "./resolve-metadata";

export async function metadataWithCMS(
  path: string,
  fallback?: Metadata,
): Promise<Metadata> {
  const hardcoded = fallback ?? (() => {
    try {
      return metadataFor(publicPath(path) ?? path);
    } catch {
      return {};
    }
  })();

  const doc = await withCMS(
    () => queryPublishedMetaByPath(cmsPath(path) ?? path),
    null,
  );
  return resolveRoutedMetadata(path, doc, hardcoded);
}
