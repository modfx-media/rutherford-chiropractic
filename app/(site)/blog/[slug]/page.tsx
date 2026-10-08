import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { JsonLdBlocks } from "../../../_lib/JsonLdBlocks"
import type { JsonLd } from "../../../_lib/content-map"
import { RankedBlogPostTemplate } from "../../../_ui/blog/RankedBlogPostTemplate"
import { getPublishedBlogPost, getPublishedBlogSlugs } from "@/lib/ranked/posts"
import { SITE_ORIGIN } from "@/lib/ranked/config"
import { metadataWithCMS } from "@/lib/cms/metadata"
import { queryArticleBySlug } from "@/lib/cms/queries"
import { RenderRoutedContent } from "@/lib/cms/RenderRoutedContent"

export const revalidate = 3600
export const dynamicParams = true

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs().catch(() => [])
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedBlogPost(slug)
  const ranked: Metadata = post
    ? {
        title: post.title,
        description: post.metaDescription,
        alternates: { canonical: `${SITE_ORIGIN}/blog/${post.slug}/` },
        openGraph: {
          title: post.title,
          description: post.metaDescription,
          url: `${SITE_ORIGIN}/blog/${post.slug}/`,
          type: "article",
          images: [post.coverImage],
        },
      }
    : {}

  const article = await queryArticleBySlug(slug, "blog")
  if (article?.doc.path) return metadataWithCMS(article.doc.path, ranked)
  if (!post) return ranked
  return metadataWithCMS(`/blog/${post.slug}/`, ranked)
}

export default async function RankedBlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const article = await queryArticleBySlug(slug, "blog")
  if (article?.collection === "posts") {
    return <RenderRoutedContent routed={article} fallback={null} />
  }

  const post = await getPublishedBlogPost(slug)
  if (!post) notFound()

  const jsonLd: JsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    image: post.coverImage,
    mainEntityOfPage: `${SITE_ORIGIN}/blog/${post.slug}/`,
    author: {
      "@type": "Organization",
      name: "Rutherford Spine & Wellness Center",
    },
  }

  return (
    <>
      <JsonLdBlocks blocks={[jsonLd]} />
      <RankedBlogPostTemplate post={post} />
    </>
  )
}
