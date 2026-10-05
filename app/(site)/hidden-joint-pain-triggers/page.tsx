import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /hidden-joint-pain-triggers/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Hidden Joint Pain Triggers Active Murfreesboro Residents Overlook"

export async function generateMetadata() {
  return metadataWithCMS("/hidden-joint-pain-triggers/");
}

export default function Page() {
  const post = getBlogPost("hidden-joint-pain-triggers")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/hidden-joint-pain-triggers/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
