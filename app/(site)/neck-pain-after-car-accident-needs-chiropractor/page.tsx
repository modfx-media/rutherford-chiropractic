import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /neck-pain-after-car-accident-needs-chiropractor/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "When Neck Pain After a Car Accident Means You Need a Chiropractor"

export async function generateMetadata() {
  return metadataWithCMS("/neck-pain-after-car-accident-needs-chiropractor/");
}

export default function Page() {
  const post = getBlogPost("neck-pain-after-car-accident-needs-chiropractor")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/neck-pain-after-car-accident-needs-chiropractor/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
