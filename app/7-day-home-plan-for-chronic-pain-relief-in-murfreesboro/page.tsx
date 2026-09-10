import { metadataFor, jsonLdFor } from "../_lib/content-map";
import { JsonLdBlocks } from "../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../_lib/blog";

// Route: /7-day-home-plan-for-chronic-pain-relief-in-murfreesboro/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "7-Day Home Plan for Chronic Pain Relief in Murfreesboro"

export const metadata = metadataFor("/7-day-home-plan-for-chronic-pain-relief-in-murfreesboro/");

export default function Page() {
  const post = getBlogPost("7-day-home-plan-for-chronic-pain-relief-in-murfreesboro")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/7-day-home-plan-for-chronic-pain-relief-in-murfreesboro/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
