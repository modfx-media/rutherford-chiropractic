import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /chiropractic-care-for-disc-injuries/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Chiropractic Care for Disc Injuries"

export async function generateMetadata() {
  return metadataWithCMS("/chiropractic-care-for-disc-injuries/");
}

export default function Page() {
  const post = getBlogPost("chiropractic-care-for-disc-injuries")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/chiropractic-care-for-disc-injuries/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
