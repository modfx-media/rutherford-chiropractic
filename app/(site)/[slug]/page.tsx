import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RankedBlogPostTemplate } from "../../_ui/blog/RankedBlogPostTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";
import { queryArticleBySlug, queryRoutedContentByPath } from "@/lib/cms/queries";
import { RenderRoutedContent } from "@/lib/cms/RenderRoutedContent";
import { getPublishedBlogPost } from "@/lib/ranked/posts";
import { rankedCoverFor } from "../../_lib/ranked-blog";
import { featuredImageForDoc } from "@/lib/cms/media";
import { SITE_ORIGIN } from "@/lib/ranked/config";
import { resolveIndexableTitle } from "../../_lib/seo/page-titles";
import { withAbsoluteMeta } from "../../_lib/seo/absolute-meta";
import type { RoutedContent } from "@/lib/cms/types";

export const dynamicParams = true;
export const revalidate = 300;

type PageProps = { params: Promise<{ slug: string }> };

async function withRankedCover(routed: RoutedContent): Promise<RoutedContent> {
  if (featuredImageForDoc(routed.doc)) return routed;
  const cover = await rankedCoverFor(routed.doc.slug || "", routed.doc.title || "").catch(() => null);
  if (!cover) return routed;
  return { ...routed, doc: { ...routed.doc, featuredImage: cover } };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await queryArticleBySlug(slug, "root");
  if (article?.doc.path) return metadataWithCMS(article.doc.path);

  const post = await getPublishedBlogPost(slug);
  if (post) {
    const url = `${SITE_ORIGIN}/${post.slug}/`;
    const title = resolveIndexableTitle(`/${post.slug}/`, post.title);
    return withAbsoluteMeta(
      {
        description: post.metaDescription,
        alternates: { canonical: url },
        openGraph: {
          url,
          type: "article",
          images: post.coverImage ? [post.coverImage] : undefined,
        },
      },
      title,
      post.metaDescription,
    );
  }

  return metadataWithCMS(`/${slug}/`);
}

/**
 * Root-level CMS articles whose stored path has no designed page.
 * Static routes win over this dynamic segment, so existing URLs stay put.
 * When the doc is stored at `/:slug`, this page renders it. The layout does
 * not paint posts again.
 */
export default async function CmsRootArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug || slug.includes(".")) notFound();

  const exact = await queryRoutedContentByPath(`/${slug}`);
  if (exact?.collection === "posts") {
    return <RenderRoutedContent routed={await withRankedCover(exact)} fallback={null} />;
  }

  const article = await queryArticleBySlug(slug, "root");
  if (article?.collection === "posts" && article.doc.path && article.doc.path !== `/${slug}`) {
    return <RenderRoutedContent routed={await withRankedCover(article)} fallback={null} />;
  }

  if (exact) return null;

  const ranked = await getPublishedBlogPost(slug);
  if (ranked) {
    return <RankedBlogPostTemplate post={ranked} />;
  }

  notFound();
}
