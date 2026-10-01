import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /how-neuropathy-affects-your-sleep/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "How Neuropathy Affects Your Sleep and Tips for Better Rest"

export async function generateMetadata() {
  return metadataWithCMS("/how-neuropathy-affects-your-sleep/");
}

export default function Page() {
  const post = getBlogPost("how-neuropathy-affects-your-sleep")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/how-neuropathy-affects-your-sleep/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
