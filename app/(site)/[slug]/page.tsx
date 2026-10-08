import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadataWithCMS } from "@/lib/cms/metadata";
import { queryArticleBySlug, queryRoutedContentByPath } from "@/lib/cms/queries";
import { RenderRoutedContent } from "@/lib/cms/RenderRoutedContent";

export const dynamicParams = true;
export const revalidate = 3600;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return metadataWithCMS(`/${slug}/`);
}

/**
 * Root-level CMS articles whose stored path has no designed page.
 * Static routes win over this dynamic segment, so existing URLs stay put.
 * When the doc is stored at `/:slug`, the site layout overlay renders it
 * (this page returns null so the article is not painted twice).
 */
export default async function CmsRootArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug || slug.includes(".")) notFound();

  const exact = await queryRoutedContentByPath(`/${slug}`);
  if (exact?.collection === "posts") return null;

  const article = await queryArticleBySlug(slug, "root");
  if (article?.collection === "posts" && article.doc.path && article.doc.path !== `/${slug}`) {
    return <RenderRoutedContent routed={article} fallback={null} />;
  }

  if (exact) return null;
  notFound();
}
