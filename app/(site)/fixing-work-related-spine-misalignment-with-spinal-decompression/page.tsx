import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /fixing-work-related-spine-misalignment-with-spinal-decompression/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Fixing Work-Related Spine Misalignment with Spinal Decompression"

export async function generateMetadata() {
  return metadataWithCMS("/fixing-work-related-spine-misalignment-with-spinal-decompression/");
}

export default function Page() {
  const post = getBlogPost("fixing-work-related-spine-misalignment-with-spinal-decompression")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/fixing-work-related-spine-misalignment-with-spinal-decompression/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
