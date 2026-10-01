import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /how-spinal-decompression-can-help-with-sciatica-relief/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "How Spinal Decompression Can Help with Sciatica Relief"

export async function generateMetadata() {
  return metadataWithCMS("/how-spinal-decompression-can-help-with-sciatica-relief/");
}

export default function Page() {
  const post = getBlogPost("how-spinal-decompression-can-help-with-sciatica-relief")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/how-spinal-decompression-can-help-with-sciatica-relief/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
