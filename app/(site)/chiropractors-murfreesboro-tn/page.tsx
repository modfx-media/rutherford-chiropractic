import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /chiropractors-murfreesboro-tn/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Chiropractors Murfreesboro TN"

export async function generateMetadata() {
  return metadataWithCMS("/chiropractors-murfreesboro-tn/");
}

export default function Page() {
  const post = getBlogPost("chiropractors-murfreesboro-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/chiropractors-murfreesboro-tn/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
