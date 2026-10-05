import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /choosing-spine-doctor-after-sports-injury/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Choosing a Spine Doctor in Murfreesboro After a Sports Injury"

export async function generateMetadata() {
  return metadataWithCMS("/choosing-spine-doctor-after-sports-injury/");
}

export default function Page() {
  const post = getBlogPost("choosing-spine-doctor-after-sports-injury")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/choosing-spine-doctor-after-sports-injury/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
