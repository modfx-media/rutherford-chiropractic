import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /spinal-disc-pain-vs-muscle-strain/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Recognizing Spinal Disc Pain vs. Muscle Strain in Murfreesboro"

export async function generateMetadata() {
  return metadataWithCMS("/spinal-disc-pain-vs-muscle-strain/");
}

export default function Page() {
  const post = getBlogPost("spinal-disc-pain-vs-muscle-strain")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/spinal-disc-pain-vs-muscle-strain/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
