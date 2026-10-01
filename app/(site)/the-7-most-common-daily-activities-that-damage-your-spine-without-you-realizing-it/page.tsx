import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /the-7-most-common-daily-activities-that-damage-your-spine-without-you-realizing-it/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "The 7 Most Common Daily Activities That Damage Your Spine Without You Realizing It"

export async function generateMetadata() {
  return metadataWithCMS("/the-7-most-common-daily-activities-that-damage-your-spine-without-you-realizing-it/");
}

export default function Page() {
  const post = getBlogPost("the-7-most-common-daily-activities-that-damage-your-spine-without-you-realizing-it")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/the-7-most-common-daily-activities-that-damage-your-spine-without-you-realizing-it/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
