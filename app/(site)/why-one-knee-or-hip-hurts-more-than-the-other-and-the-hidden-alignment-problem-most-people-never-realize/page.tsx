import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /why-one-knee-or-hip-hurts-more-than-the-other-and-the-hidden-alignment-problem-most-people-never-realize/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Why One Knee or Hip Hurts More Than the Other and the Hidden Alignment Problem Most People Never Realize"

export async function generateMetadata() {
  return metadataWithCMS("/why-one-knee-or-hip-hurts-more-than-the-other-and-the-hidden-alignment-problem-most-people-never-realize/");
}

export default function Page() {
  const post = getBlogPost("why-one-knee-or-hip-hurts-more-than-the-other-and-the-hidden-alignment-problem-most-people-never-realize")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/why-one-knee-or-hip-hurts-more-than-the-other-and-the-hidden-alignment-problem-most-people-never-realize/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
