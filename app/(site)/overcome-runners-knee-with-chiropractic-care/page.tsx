import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /overcome-runners-knee-with-chiropractic-care/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Overcome Runner’s Knee with Chiropractic Care"

export async function generateMetadata() {
  return metadataWithCMS("/overcome-runners-knee-with-chiropractic-care/");
}

export default function Page() {
  const post = getBlogPost("overcome-runners-knee-with-chiropractic-care")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/overcome-runners-knee-with-chiropractic-care/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
