import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /regain-grip-find-relief-from-hand-numbness-neuropathy/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Regain Grip: Find Relief From Hand Numbness & Neuropathy"

export async function generateMetadata() {
  return metadataWithCMS("/regain-grip-find-relief-from-hand-numbness-neuropathy/");
}

export default function Page() {
  const post = getBlogPost("regain-grip-find-relief-from-hand-numbness-neuropathy")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/regain-grip-find-relief-from-hand-numbness-neuropathy/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
