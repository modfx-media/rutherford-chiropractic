import { metadataFor, jsonLdFor } from "../_lib/content-map";
import { JsonLdBlocks } from "../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../_lib/blog";

// Route: /fibromyalgia-relief-options-with-chiropractic-care/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Fibromyalgia Relief Options With Chiropractic Care"

export const metadata = metadataFor("/fibromyalgia-relief-options-with-chiropractic-care/");

export default function Page() {
  const post = getBlogPost("fibromyalgia-relief-options-with-chiropractic-care")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/fibromyalgia-relief-options-with-chiropractic-care/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
