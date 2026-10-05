import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /why-your-hip-pain-comes-and-goes-the-spine-stability-connection-no-one-is-talking-about/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Why Your Hip Pain Comes and Goes - The Spine Stability Connection No One Is Talking About"

export async function generateMetadata() {
  return metadataWithCMS("/why-your-hip-pain-comes-and-goes-the-spine-stability-connection-no-one-is-talking-about/");
}

export default function Page() {
  const post = getBlogPost("why-your-hip-pain-comes-and-goes-the-spine-stability-connection-no-one-is-talking-about")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/why-your-hip-pain-comes-and-goes-the-spine-stability-connection-no-one-is-talking-about/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
