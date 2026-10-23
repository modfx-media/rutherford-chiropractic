import type { Metadata } from "next";

/** Set a title that bypasses the root layout template (`%s | Rutherford Spine
 * & Wellness Center`). Passing a plain string would append that suffix and
 * duplicate the brand. */
export function withAbsoluteMeta(
  meta: Metadata,
  title: string,
  description?: string,
): Metadata {
  const desc =
    description ?? (typeof meta.description === "string" ? meta.description : undefined);
  const twitter = meta.twitter && typeof meta.twitter === "object" ? meta.twitter : {};
  const ogDescription =
    desc ??
    (typeof meta.openGraph?.description === "string" ? meta.openGraph.description : undefined);
  const twitterDescription =
    desc ?? (typeof twitter.description === "string" ? twitter.description : undefined);

  return {
    ...meta,
    title: { absolute: title },
    description: desc,
    openGraph: {
      ...meta.openGraph,
      title,
      description: ogDescription,
    },
    twitter: {
      ...twitter,
      title,
      description: twitterDescription,
    },
  };
}
