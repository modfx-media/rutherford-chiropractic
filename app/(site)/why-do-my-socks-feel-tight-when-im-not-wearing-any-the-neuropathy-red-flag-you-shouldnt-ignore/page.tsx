import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /why-do-my-socks-feel-tight-when-im-not-wearing-any-the-neuropathy-red-flag-you-shouldnt-ignore/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Why Do My Socks Feel Tight When I’m Not Wearing Any? The Neuropathy Red Flag You Shouldn’t Ignore"

export async function generateMetadata() {
  return metadataWithCMS("/why-do-my-socks-feel-tight-when-im-not-wearing-any-the-neuropathy-red-flag-you-shouldnt-ignore/");
}

export default function Page() {
  const post = getBlogPost("why-do-my-socks-feel-tight-when-im-not-wearing-any-the-neuropathy-red-flag-you-shouldnt-ignore")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/why-do-my-socks-feel-tight-when-im-not-wearing-any-the-neuropathy-red-flag-you-shouldnt-ignore/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
