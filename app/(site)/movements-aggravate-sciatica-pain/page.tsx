import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogPostTemplate } from "../../_ui/blog/BlogPostTemplate";
import { getBlogPost } from "../../_lib/blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /movements-aggravate-sciatica-pain/
// Category: blog-post (Blog post)
// Source sitemap: post-sitemap.xml
// Live title: "Everyday Movements That Quietly Aggravate Sciatica Pain"

export async function generateMetadata() {
  return metadataWithCMS("/movements-aggravate-sciatica-pain/");
}

export default function Page() {
  const post = getBlogPost("movements-aggravate-sciatica-pain")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/movements-aggravate-sciatica-pain/")} />
      <BlogPostTemplate post={post} />
    </>
  );
}
