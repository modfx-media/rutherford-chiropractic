import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /find-your-pain-driver-before-choosing-a-treatment/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Chronic Pain Relief in Murfreesboro: Self-Assessment to Find the Cause"

export async function generateMetadata() {
  return metadataWithCMS("/find-your-pain-driver-before-choosing-a-treatment/");
}

export default function Page() {
  const post = getBlogPost("find-your-pain-driver-before-choosing-a-treatment")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/find-your-pain-driver-before-choosing-a-treatment/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
