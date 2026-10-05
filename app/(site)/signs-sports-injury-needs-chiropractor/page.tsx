import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /signs-sports-injury-needs-chiropractor/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Signs Your Sports Injury Needs a Chiropractor, Not Just Rest"

export async function generateMetadata() {
  return metadataWithCMS("/signs-sports-injury-needs-chiropractor/");
}

export default function Page() {
  const post = getBlogPost("signs-sports-injury-needs-chiropractor")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/signs-sports-injury-needs-chiropractor/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
