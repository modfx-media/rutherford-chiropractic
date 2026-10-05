import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /how-to-recognize-the-early-signs-of-neuropathy/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "How to Recognize the Early Signs of Neuropathy"

export async function generateMetadata() {
  return metadataWithCMS("/how-to-recognize-the-early-signs-of-neuropathy/");
}

export default function Page() {
  const post = getBlogPost("how-to-recognize-the-early-signs-of-neuropathy")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/how-to-recognize-the-early-signs-of-neuropathy/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
