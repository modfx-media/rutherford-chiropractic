import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /sciatica-while-driving-seat-setup-posture-treatment/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Sciatica While Driving in Murfreesboro: Seat Setup, Posture, Treatment"

export async function generateMetadata() {
  return metadataWithCMS("/sciatica-while-driving-seat-setup-posture-treatment/");
}

export default function Page() {
  const post = getBlogPost("sciatica-while-driving-seat-setup-posture-treatment")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/sciatica-while-driving-seat-setup-posture-treatment/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
