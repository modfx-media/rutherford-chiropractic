import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /whiplash-treatment-options-murfreesboro/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Understanding Whiplash Treatment Options in Murfreesboro"

export async function generateMetadata() {
  return metadataWithCMS("/whiplash-treatment-options-murfreesboro/");
}

export default function Page() {
  const post = getBlogPost("whiplash-treatment-options-murfreesboro")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/whiplash-treatment-options-murfreesboro/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
