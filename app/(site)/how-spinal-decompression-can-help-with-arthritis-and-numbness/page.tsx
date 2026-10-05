import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /how-spinal-decompression-can-help-with-arthritis-and-numbness/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "How Spinal Decompression Can Help with Arthritis and Numbness"

export async function generateMetadata() {
  return metadataWithCMS("/how-spinal-decompression-can-help-with-arthritis-and-numbness/");
}

export default function Page() {
  const post = getBlogPost("how-spinal-decompression-can-help-with-arthritis-and-numbness")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/how-spinal-decompression-can-help-with-arthritis-and-numbness/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
