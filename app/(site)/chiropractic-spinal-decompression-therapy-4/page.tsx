import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /chiropractic-spinal-decompression-therapy-4/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Chiropractic Spinal Decompression Therapy"

export async function generateMetadata() {
  return metadataWithCMS("/chiropractic-spinal-decompression-therapy-4/");
}

export default function Page() {
  const post = getBlogPost("chiropractic-spinal-decompression-therapy-4")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/chiropractic-spinal-decompression-therapy-4/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
