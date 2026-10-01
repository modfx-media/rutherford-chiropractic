import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /when-touch-hurts-coping-with-extreme-sensitivity-from-neuropathy-42/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "When Touch Hurts: Coping with Extreme Sensitivity from Neuropathy"

export async function generateMetadata() {
  return metadataWithCMS("/when-touch-hurts-coping-with-extreme-sensitivity-from-neuropathy-42/");
}

export default function Page() {
  const post = getBlogPost("when-touch-hurts-coping-with-extreme-sensitivity-from-neuropathy-42")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/when-touch-hurts-coping-with-extreme-sensitivity-from-neuropathy-42/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
