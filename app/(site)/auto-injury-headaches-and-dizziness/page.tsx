import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /auto-injury-headaches-and-dizziness/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Auto Injury Headaches and Dizziness: Signs You Need a Chiropractor"

export async function generateMetadata() {
  return metadataWithCMS("/auto-injury-headaches-and-dizziness/");
}

export default function Page() {
  const post = getBlogPost("auto-injury-headaches-and-dizziness")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/auto-injury-headaches-and-dizziness/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
