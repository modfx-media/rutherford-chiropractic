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
    path: `/${post.slug}/`,
    title: post.title,
    category: categoryFromTitle(post.title),
    publishedAt: post.publishDate ? `${post.publishDate}T12:00:00.000Z` : null,
    featuredImage: post.coverImage
      ? {
          src: post.coverImage,
          alt: post.coverAlt || post.title,
          width: 1200,
          height: 630,
        }
      : null,
    excerpt: post.metaDescription || post.intro,
  }
}

/** Cover from a live Ranked post with this slug or title. Compiled JSON posts are skipped. */
export async function rankedCoverFor(
  slug: string,
  title: string,
): Promise<BlogPostMeta['featuredImage']> {
  const local = new Set(getAllBlogPosts().map((post) => post.slug))
  const titleKey = title.toLowerCase().replace(/[^a-z0-9]+/g, '')
  const posts = await getPublishedBlogPosts()
  const match = posts.find((post) => {
    if (local.has(post.slug) || !post.coverImage) return false
    const sameTitle = titleKey && post.title.toLowerCase().replace(/[^a-z0-9]+/g, '') === titleKey
    return post.slug === slug || sameTitle
  })
  if (!match?.coverImage) return null
  return {
    src: match.coverImage,
    alt: match.coverAlt || title,
    width: 1200,
    height: 630,
  }
}

export async function getPublishedBlogIndexPosts(): Promise<BlogPostMeta[]> {
  const local = getAllBlogPosts()
  const published = await getPublishedBlogPosts()
  const localBySlug = new Map(local.map((p) => [p.slug, p]))

  const seen = new Set<string>()
  const posts: BlogPostMeta[] = []
  for (const p of published) {
    const loc = localBySlug.get(p.slug)
    const meta = loc
      ? {
          ...loc,
          featuredImage:
            loc.featuredImage ??
            (p.coverImage
              ? {
                  src: p.coverImage,
                  alt: p.coverAlt || loc.title,
                  width: 1200,
                  height: 630,
                }
              : null),
        }
      : rankedPostToMeta(p)
    const title = meta.title.toLowerCase().replace(/[^a-z0-9]+/g, '')
    const path = meta.path.replace(/\/+$/, '').replace(/^\/blog\//, '/')
    if (seen.has(meta.slug) || seen.has(path) || (title && seen.has(`title:${title}`))) continue
    seen.add(meta.slug)
    seen.add(path)
    if (title) seen.add(`title:${title}`)
    posts.push(meta)
  }

  const hardcoded = posts.sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
  if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) return hardcoded

  return withCMS(async () => {
    const cmsPosts = await fetchPublishedCmsPosts()
    return mergeCmsPosts(cmsPosts, hardcoded)
  }, hardcoded)
}
