import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { JsonLdBlocks } from "../../../_lib/JsonLdBlocks"
import type { JsonLd } from "../../../_lib/content-map"
import { RankedBlogPostTemplate } from "../../../_ui/blog/RankedBlogPostTemplate"
import { getPublishedBlogPost, getPublishedBlogSlugs } from "@/lib/ranked/posts"
import { SITE_ORIGIN } from "@/lib/ranked/config"
import { metadataWithCMS } from "@/lib/cms/metadata"

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
  if (!post) return {}
  const url = `${SITE_ORIGIN}/blog/${post.slug}/`
  return metadataWithCMS(`/blog/${post.slug}/`, {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url,
      type: "article",
      images: [post.coverImage],
    },
  })
}

export default async function RankedBlogPostPage({ params }: PageProps) {
  const { slug } = await params
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
