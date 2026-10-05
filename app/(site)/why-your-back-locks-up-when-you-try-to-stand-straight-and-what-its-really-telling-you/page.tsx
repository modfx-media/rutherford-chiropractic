import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /why-your-back-locks-up-when-you-try-to-stand-straight-and-what-its-really-telling-you/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Why Your Back Locks Up When You Try to Stand Straight - And What It’s Really Telling You"

export async function generateMetadata() {
  return metadataWithCMS("/why-your-back-locks-up-when-you-try-to-stand-straight-and-what-its-really-telling-you/");
}

export default function Page() {
  const post = getBlogPost("why-your-back-locks-up-when-you-try-to-stand-straight-and-what-its-really-telling-you")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/why-your-back-locks-up-when-you-try-to-stand-straight-and-what-its-really-telling-you/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
