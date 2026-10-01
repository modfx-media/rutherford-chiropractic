import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /signs-of-neuropathy/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Recognizing the Early Warning Signs of Neuropathy That Often Go Unnoticed"

export async function generateMetadata() {
  return metadataWithCMS("/signs-of-neuropathy/");
}

export default function Page() {
  const post = getBlogPost("signs-of-neuropathy")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/signs-of-neuropathy/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
