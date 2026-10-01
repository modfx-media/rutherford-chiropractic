import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /what-causes-neuropathy/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "What Causes Neuropathy?"

export async function generateMetadata() {
  return metadataWithCMS("/what-causes-neuropathy/");
}

export default function Page() {
  const post = getBlogPost("what-causes-neuropathy")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/what-causes-neuropathy/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
