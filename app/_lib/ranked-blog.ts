import { getAllBlogPosts, type BlogPostMeta } from './blog'
import { fetchPublishedCmsPosts, mergeCmsPosts } from '@/lib/cms/posts'
import { withCMS } from '@/lib/cms/safe'
import { getPublishedBlogPosts, type BlogPostData } from '@/lib/ranked/posts'

function categoryFromTitle(title: string): string {
  const t = title.toLowerCase()
  if (/sciatic/.test(t)) return 'Sciatica'
  if (/neuropath/.test(t)) return 'Neuropathy'
  if (/sport/.test(t)) return 'Sports Injuries'
  if (/decompress/.test(t)) return 'Spinal Decompression'
  if (/massage/.test(t)) return 'Massage Therapy'
  if (/whiplash|auto injury|car accident/.test(t)) return 'Auto Injury'
  if (/headache|migraine/.test(t)) return 'Headaches'
  if (/neck/.test(t)) return 'Neck Pain'
  if (/back|spine/.test(t)) return 'Back Pain'
  return 'Chiropractic Care'
}

export function rankedPostToMeta(post: BlogPostData): BlogPostMeta {
  return {
    slug: post.slug,
    path: `/blog/${post.slug}/`,
    title: post.title,
    category: categoryFromTitle(post.title),
    publishedAt: `${post.publishDate}T12:00:00.000Z`,
    featuredImage: {
      src: post.coverImage,
      alt: post.coverAlt || post.title,
      width: 1200,
      height: 630,
    },
    excerpt: post.metaDescription || post.intro,
  }
}

export async function getPublishedBlogIndexPosts(): Promise<BlogPostMeta[]> {
  const local = getAllBlogPosts()
  const published = await getPublishedBlogPosts()
  const localBySlug = new Map(local.map((p) => [p.slug, p]))

  const posts = published.map((p) => {
    const loc = localBySlug.get(p.slug)
    if (!loc) return rankedPostToMeta(p)
    return {
      ...loc,
      publishedAt: p.publishDate ? `${p.publishDate}T12:00:00.000Z` : loc.publishedAt,
      featuredImage:
        loc.featuredImage && p.coverImage && p.coverImage !== loc.featuredImage.src
          ? { ...loc.featuredImage, src: p.coverImage, alt: p.coverAlt || loc.featuredImage.alt }
          : loc.featuredImage,
    }
  })

  const hardcoded = posts.sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
  if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) return hardcoded

  return withCMS(async () => {
    const cmsPosts = await fetchPublishedCmsPosts()
    return mergeCmsPosts(cmsPosts, hardcoded)
  }, hardcoded)
}
