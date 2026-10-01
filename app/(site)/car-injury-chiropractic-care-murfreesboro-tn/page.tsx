import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /car-injury-chiropractic-care-murfreesboro-tn/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Car Injury Chiropractic Care Murfreesboro TN"

export async function generateMetadata() {
  return metadataWithCMS("/car-injury-chiropractic-care-murfreesboro-tn/");
}

export default function Page() {
  const post = getBlogPost("car-injury-chiropractic-care-murfreesboro-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/car-injury-chiropractic-care-murfreesboro-tn/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
