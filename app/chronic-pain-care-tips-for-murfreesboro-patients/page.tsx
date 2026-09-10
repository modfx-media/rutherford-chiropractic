import { metadataFor, jsonLdFor } from "../_lib/content-map";
import { JsonLdBlocks } from "../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../_lib/blog";

// Route: /chronic-pain-care-tips-for-murfreesboro-patients/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Chronic Pain Care Tips for Murfreesboro Patients"

export const metadata = metadataFor("/chronic-pain-care-tips-for-murfreesboro-patients/");

export default function Page() {
  const post = getBlogPost("chronic-pain-care-tips-for-murfreesboro-patients")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/chronic-pain-care-tips-for-murfreesboro-patients/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
