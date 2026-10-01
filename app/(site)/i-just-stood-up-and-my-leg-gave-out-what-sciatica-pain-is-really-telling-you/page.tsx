import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /i-just-stood-up-and-my-leg-gave-out-what-sciatica-pain-is-really-telling-you/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "I Just Stood Up and My Leg Gave Out: What Sciatica Pain Is Really Telling You"

export async function generateMetadata() {
  return metadataWithCMS("/i-just-stood-up-and-my-leg-gave-out-what-sciatica-pain-is-really-telling-you/");
}

export default function Page() {
  const post = getBlogPost("i-just-stood-up-and-my-leg-gave-out-what-sciatica-pain-is-really-telling-you")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/i-just-stood-up-and-my-leg-gave-out-what-sciatica-pain-is-really-telling-you/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
