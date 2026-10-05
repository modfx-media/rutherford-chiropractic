import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /neuropathy-treatment-without-drugs/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Inside Neuropathy Treatment in Murfreesboro Without Drugs"

export async function generateMetadata() {
  return metadataWithCMS("/neuropathy-treatment-without-drugs/");
}

export default function Page() {
  const post = getBlogPost("neuropathy-treatment-without-drugs")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/neuropathy-treatment-without-drugs/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
