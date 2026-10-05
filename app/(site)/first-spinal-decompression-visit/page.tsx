import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /first-spinal-decompression-visit/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "First Spinal Decompression Visit in Murfreesboro: What to Expect"

export async function generateMetadata() {
  return metadataWithCMS("/first-spinal-decompression-visit/");
}

export default function Page() {
  const post = getBlogPost("first-spinal-decompression-visit")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/first-spinal-decompression-visit/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
