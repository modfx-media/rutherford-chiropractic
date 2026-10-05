import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /sports-injury-chiropractor-mufreesboro-tn/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Sports Injury Chiropractor Mufreesboro TN"

export async function generateMetadata() {
  return metadataWithCMS("/sports-injury-chiropractor-mufreesboro-tn/");
}

export default function Page() {
  const post = getBlogPost("sports-injury-chiropractor-mufreesboro-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/sports-injury-chiropractor-mufreesboro-tn/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
