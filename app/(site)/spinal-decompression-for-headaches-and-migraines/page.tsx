import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /spinal-decompression-for-headaches-and-migraines/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Spinal Decompression for Headaches and Migraines: A Natural Path to Relief"

export async function generateMetadata() {
  return metadataWithCMS("/spinal-decompression-for-headaches-and-migraines/");
}

export default function Page() {
  const post = getBlogPost("spinal-decompression-for-headaches-and-migraines")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/spinal-decompression-for-headaches-and-migraines/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
