import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /neuropathy-in-young-adults/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Neuropathy in Young Adults: Understanding the Hidden Risk Factors"

export async function generateMetadata() {
  return metadataWithCMS("/neuropathy-in-young-adults/");
}

export default function Page() {
  const post = getBlogPost("neuropathy-in-young-adults")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/neuropathy-in-young-adults/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
