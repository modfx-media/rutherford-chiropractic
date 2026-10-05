import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /chronic-neck-pain-with-spinal-decompression/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Say Goodbye to Chronic Neck Pain with Spinal Decompression"

export async function generateMetadata() {
  return metadataWithCMS("/chronic-neck-pain-with-spinal-decompression/");
}

export default function Page() {
  const post = getBlogPost("chronic-neck-pain-with-spinal-decompression")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/chronic-neck-pain-with-spinal-decompression/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
