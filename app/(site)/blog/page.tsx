import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { BlogIndexPage } from "../../_ui/blog/BlogIndexPage";
import { getPublishedBlogIndexPosts } from "../../_lib/ranked-blog";
import { metadataWithCMS } from "@/lib/cms/metadata";

export const revalidate = 300

// Route: /blog/
// Category: blog-index (Blog index)
// Source sitemap: post-sitemap.xml
// Live title: "Our Chiropractic Blog | Natural Health & Pain Care Tips"

export async function generateMetadata() {
  return metadataWithCMS("/blog/");
}

export default async function Page() {
  const posts = await getPublishedBlogIndexPosts();
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/blog/")} />
      <BlogIndexPage posts={posts} />
    </>
  );
}
