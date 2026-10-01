import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /back-pain-chiropractor-murfreesboro-tn/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Back Pain Chiropractor Murfreesboro TN"

export async function generateMetadata() {
  return metadataWithCMS("/back-pain-chiropractor-murfreesboro-tn/");
}

export default function Page() {
  const post = getBlogPost("back-pain-chiropractor-murfreesboro-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/back-pain-chiropractor-murfreesboro-tn/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
