import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getPublishedBlogPost } from "@/lib/ranked/posts"
import { rankedCoverFor } from "../../../_lib/ranked-blog"
import { SITE_ORIGIN } from "@/lib/ranked/config"
import { metadataWithCMS } from "@/lib/cms/metadata"
import { featuredImageForDoc } from "@/lib/cms/media"
import { queryArticleBySlug } from "@/lib/cms/queries"
import { RenderRoutedContent } from "@/lib/cms/RenderRoutedContent"
import type { RoutedContent } from "@/lib/cms/types"

// Empty generateStaticParams plus draftMode() prerendered this route as a
// static 500 for every slug. Render on demand so a post appears the day it
// is scheduled, without a redeploy.
export const dynamic = "force-dynamic"

type PageProps = { params: Promise<{ slug: string }> }

async function withRankedCover(routed: RoutedContent): Promise<RoutedContent> {
  if (featuredImageForDoc(routed.doc)) return routed
  const cover = await rankedCoverFor(routed.doc.slug || "", routed.doc.title || "").catch(() => null)
  if (!cover) return routed
  return { ...routed, doc: { ...routed.doc, featuredImage: cover } }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await queryArticleBySlug(slug, "blog")
  if (article?.doc.path) return metadataWithCMS(article.doc.path)

  const post = await getPublishedBlogPost(slug)
  if (!post) return {}
  const url = `${SITE_ORIGIN}/${post.slug}/`
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url,
      type: "article",
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  }
}

export default async function RankedBlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const article = await queryArticleBySlug(slug, "blog")
  if (article?.collection === "posts") {
    return <RenderRoutedContent routed={await withRankedCover(article)} fallback={null} />
  }

  const post = await getPublishedBlogPost(slug)
  if (!post) notFound()

  // Articles live at /{slug}/. Keep /blog/{slug}/ working as an alias.
  redirect(`/${post.slug}/`)
}
