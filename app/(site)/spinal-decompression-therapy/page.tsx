import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /spinal-decompression-therapy/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Get Relief from Headaches & Migraines with Spinal Decompression Therapy"

export async function generateMetadata() {
  return metadataWithCMS("/spinal-decompression-therapy/");
}

export default function Page() {
  const post = getBlogPost("spinal-decompression-therapy")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/spinal-decompression-therapy/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
