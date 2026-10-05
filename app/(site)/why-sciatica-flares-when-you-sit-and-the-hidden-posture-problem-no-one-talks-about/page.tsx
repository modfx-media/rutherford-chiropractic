import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /why-sciatica-flares-when-you-sit-and-the-hidden-posture-problem-no-one-talks-about/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Why Sciatica Flares When You Sit - And The Hidden Posture Problem No One Talks About"

export async function generateMetadata() {
  return metadataWithCMS("/why-sciatica-flares-when-you-sit-and-the-hidden-posture-problem-no-one-talks-about/");
}

export default function Page() {
  const post = getBlogPost("why-sciatica-flares-when-you-sit-and-the-hidden-posture-problem-no-one-talks-about")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/why-sciatica-flares-when-you-sit-and-the-hidden-posture-problem-no-one-talks-about/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
