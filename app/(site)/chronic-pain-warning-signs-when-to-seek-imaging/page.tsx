import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /chronic-pain-warning-signs-when-to-seek-imaging/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Chronic Pain Red Flags in Murfreesboro: When Chiropractors Should Refer"

export async function generateMetadata() {
  return metadataWithCMS("/chronic-pain-warning-signs-when-to-seek-imaging/");
}

export default function Page() {
  const post = getBlogPost("chronic-pain-warning-signs-when-to-seek-imaging")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/chronic-pain-warning-signs-when-to-seek-imaging/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
