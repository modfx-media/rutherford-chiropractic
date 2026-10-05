import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /restless-nights-how-neuropathy-leg-pain-disrupts-sleep-what-you-can-do-about-it-9/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Restless Nights: How Neuropathy Leg Pain Disrupts Sleep & What You Can Do About It"

export async function generateMetadata() {
  return metadataWithCMS("/restless-nights-how-neuropathy-leg-pain-disrupts-sleep-what-you-can-do-about-it-9/");
}

export default function Page() {
  const post = getBlogPost("restless-nights-how-neuropathy-leg-pain-disrupts-sleep-what-you-can-do-about-it-9")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/restless-nights-how-neuropathy-leg-pain-disrupts-sleep-what-you-can-do-about-it-9/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
