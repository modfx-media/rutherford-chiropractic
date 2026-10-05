import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /neuropathy-pain-during-the-busy-season/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Holiday Relief: Managing Neuropathy Pain During the Busy Season"

export async function generateMetadata() {
  return metadataWithCMS("/neuropathy-pain-during-the-busy-season/");
}

export default function Page() {
  const post = getBlogPost("neuropathy-pain-during-the-busy-season")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/neuropathy-pain-during-the-busy-season/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
