import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /the-hidden-reason-your-lower-back-pain-makes-your-knees-ache-too/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "The Hidden Reason Your Lower Back Pain Makes Your Knees Ache Too"

export async function generateMetadata() {
  return metadataWithCMS("/the-hidden-reason-your-lower-back-pain-makes-your-knees-ache-too/");
}

export default function Page() {
  const post = getBlogPost("the-hidden-reason-your-lower-back-pain-makes-your-knees-ache-too")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/the-hidden-reason-your-lower-back-pain-makes-your-knees-ache-too/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
