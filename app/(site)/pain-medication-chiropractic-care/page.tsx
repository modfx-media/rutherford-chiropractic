import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /pain-medication-chiropractic-care/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Reducing Reliance on Pain Medication: Chiropractic Care and Safe Tapering"

export async function generateMetadata() {
  return metadataWithCMS("/pain-medication-chiropractic-care/");
}

export default function Page() {
  const post = getBlogPost("pain-medication-chiropractic-care")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/pain-medication-chiropractic-care/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
