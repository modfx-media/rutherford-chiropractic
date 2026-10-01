import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /preventing-summer-sports-injuries/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Preventing Summer Sports Injuries in Murfreesboro: Warm-Ups and Prehab"

export async function generateMetadata() {
  return metadataWithCMS("/preventing-summer-sports-injuries/");
}

export default function Page() {
  const post = getBlogPost("preventing-summer-sports-injuries")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/preventing-summer-sports-injuries/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
