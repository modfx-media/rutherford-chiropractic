import { DEFAULT_COVER, DEFAULT_COVER_ALT, DEFAULT_CTA } from './config'
import type { BlogPostData } from './types'

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, ' ')
    .trim()
}

function stripTags(html: string): string {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
}

function isSeoMetaLine(text: string): boolean {
  return /^(meta\s*title|meta\s*description|seo title|focus keyword)\s*:/i.test(text.trim())
}

function htmlChunkToPlain(html: string): string {
  const withLinks = html.replace(
    /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
    (_m, href: string, inner: string) => {
      const label = stripTags(inner)
      if (!label) return ''
      return `[${label}](${href})`
    },
  )
  return stripTags(withLinks)
}

function usableParas(parts: string[]): string[] {
  return parts.map(htmlChunkToPlain).filter((p) => p.length > 1 && !isSeoMetaLine(p))
}

export function slugFromTitle(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return slug || 'ranked-article'
}

function metaFromPlain(text: string, fallbackTitle: string): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return fallbackTitle.slice(0, 155)
  if (clean.length <= 155) return clean
  const cut = clean.slice(0, 152)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : 152).trim()}…`
}

export function htmlToBlogPost(input: {
  title: string
  html: string | null
  description: string | null
  publishDate: string
  slug: string
  coverImage: string | null
}): BlogPostData | null {
  const html = (input.html ?? '').trim()
  if (!html) return null

  const headingSplit = html.split(/<(h[1-6])[^>]*>/i)
  const sections: { heading: string; body: string[] }[] = []
  let intro = ''
  const titleNorm = input.title.replace(/\s+/g, ' ').trim().toLowerCase()

  if (headingSplit.length === 1) {
    const paras = usableParas(html.split(/<\/p>/i))
    if (paras.length === 0) return null
    intro = paras[0]
    sections.push({
      heading: input.title,
      body: paras.slice(1, 40).length ? paras.slice(1, 40) : paras,
    })
  } else {
    const preface = htmlChunkToPlain(headingSplit[0])
    if (preface && !isSeoMetaLine(preface)) intro = preface

    for (let i = 1; i < headingSplit.length; i += 2) {
      const tag = (headingSplit[i] ?? '').toLowerCase()
      const rest = headingSplit[i + 1] ?? ''
      const close = rest.indexOf('</')
      const headingHtml = close >= 0 ? rest.slice(0, close) : rest
      const heading = stripTags(headingHtml)
      const bodyHtml = close >= 0 ? rest.slice(rest.indexOf('>', close) + 1) : ''
      const paras = usableParas(bodyHtml.split(/<\/p>|<li>/i))

      const headingIsTitle =
        tag === 'h1' && heading.replace(/\s+/g, ' ').trim().toLowerCase() === titleNorm

      if (headingIsTitle) {
        if (!intro && paras[0]) intro = paras[0]
        if (paras.length > 1) {
          sections.push({ heading: input.title, body: paras.slice(1) })
        }
        continue
      }

      if (!heading && paras.length === 0) continue
      sections.push({
        heading: heading || input.title,
        body: paras.length ? paras : [htmlChunkToPlain(bodyHtml) || heading],
      })
    }
  }

  const usable = sections.filter((s) => s.body.some((p) => p.length > 8 && !isSeoMetaLine(p)))
  if (usable.length === 0) return null

  if (!intro || isSeoMetaLine(intro)) {
    intro = usable[0].body.find((p) => !isSeoMetaLine(p)) ?? input.description ?? input.title
  }

  return {
    slug: input.slug,
    title: input.title,
    metaDescription: metaFromPlain(input.description || intro, input.title),
    h1: input.title,
    publishDate: input.publishDate,
    coverImage: input.coverImage || DEFAULT_COVER,
    coverAlt: input.coverImage ? input.title : DEFAULT_COVER_ALT,
    intro,
    sections: usable,
    cta: DEFAULT_CTA,
  }
}

export function isBlogContentType(contentType: string | null): boolean {
  const type = (contentType ?? '').trim().toLowerCase()
  if (!type) return true
  return type.includes('blog')
}

/** Calendar day in America/New_York (`YYYY-MM-DD`). */
export function todayInNewYork(now = new Date()): string {
  return now.toLocaleDateString('en-CA', { timeZone: 'America/New_York' })
}

/**
 * Scheduled day used for both the live check and the date shown on the post.
 * Date-only values (and UTC-midnight date stamps) stay on that calendar day.
 * Timestamps use the New York calendar day so a post is not held until the next UTC date.
 */
export function scheduledCalendarDay(scheduledDate: string): string {
  const raw = scheduledDate.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw
  if (/^\d{4}-\d{2}-\d{2}T00:00:00(?:\.000)?(?:Z|\+00:00)$/.test(raw)) return raw.slice(0, 10)
  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) return raw.slice(0, 10)
  return todayInNewYork(parsed)
}

export function isRankedPostLive(
  status: string,
  scheduledDate: string | null = null,
  now = new Date(),
): boolean {
  const s = status.trim().toLowerCase()
  if (s === 'revising' || s === 'cancelled' || s === 'canceled') return false
  if (!scheduledDate) return true
  return scheduledCalendarDay(scheduledDate) <= todayInNewYork(now)
}

export function publishDateFromRanked(scheduledDate: string | null, fallback: string): string {
  if (scheduledDate) return scheduledCalendarDay(scheduledDate)
  return scheduledCalendarDay(fallback)
}
