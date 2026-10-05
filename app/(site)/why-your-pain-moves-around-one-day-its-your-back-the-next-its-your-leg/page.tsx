import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /why-your-pain-moves-around-one-day-its-your-back-the-next-its-your-leg/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Why Your Pain Moves Around - One Day It’s Your Back, The Next It’s Your Leg"

export async function generateMetadata() {
  return metadataWithCMS("/why-your-pain-moves-around-one-day-its-your-back-the-next-its-your-leg/");
}

export default function Page() {
  const post = getBlogPost("why-your-pain-moves-around-one-day-its-your-back-the-next-its-your-leg")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/why-your-pain-moves-around-one-day-its-your-back-the-next-its-your-leg/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
