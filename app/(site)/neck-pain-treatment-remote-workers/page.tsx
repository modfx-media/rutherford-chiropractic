import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /neck-pain-treatment-remote-workers/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Neck Pain Treatment in Murfreesboro for Desk and Remote Workers"

export async function generateMetadata() {
  return metadataWithCMS("/neck-pain-treatment-remote-workers/");
}

export default function Page() {
  const post = getBlogPost("neck-pain-treatment-remote-workers")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/neck-pain-treatment-remote-workers/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
