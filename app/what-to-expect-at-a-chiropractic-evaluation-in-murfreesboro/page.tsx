import { metadataFor, jsonLdFor } from "../_lib/content-map";
import { JsonLdBlocks } from "../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../_lib/blog";

// Route: /what-to-expect-at-a-chiropractic-evaluation-in-murfreesboro/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "What to Expect at a Chiropractic Evaluation in Murfreesboro"

export const metadata = metadataFor("/what-to-expect-at-a-chiropractic-evaluation-in-murfreesboro/");

export default function Page() {
  const post = getBlogPost("what-to-expect-at-a-chiropractic-evaluation-in-murfreesboro")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/what-to-expect-at-a-chiropractic-evaluation-in-murfreesboro/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
