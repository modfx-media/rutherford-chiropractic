export const SITE_ORIGIN = (process.env.SITE_ORIGIN || 'https://rutherfordchiropractic.com').replace(
  /\/$/,
  '',
)

export const DEFAULT_COVER = '/images/blog/default-cover.jpg'
export const DEFAULT_COVER_ALT = 'Rutherford Spine & Wellness Center chiropractic care'

export const DEFAULT_CTA = {
  label: 'Schedule Your Consultation',
  href: '/contact-us/',
}

/** Cover prompt for this brand. No patient faces / medical gore. Theme follows the post title. */
export function coverPrompt(title: string): string {
  return [
    'Editorial photograph, 16:9 landscape, premium chiropractic and wellness photography.',
    `The image must clearly illustrate this article topic: "${title.slice(0, 120)}".`,
    'Calm modern spine clinic aesthetic: treatment table, spine model, posture, physical therapy, or wellness — matching the title.',
    'Natural cinematic lighting, sharp focus, no grain, no watermark.',
    'No text, no letters, no logos, no captions, no readable signage.',
    'No patient faces, no medical gore, no graphic injury, no blood.',
  ].join(' ')
}

/**
 * Slugs with a committed file under /images/blog/covers/.
 * Map only. Do not fs.stat public/ — that packs images into the cron bundle.
 */
const COMMITTED_COVER_FILES: Record<string, string> = {
  "massage-therapy-and-chiropractic-care-for-joint-pain-relief-in-murfreesboro":
    "/images/blog/covers/massage-therapy-and-chiropractic-care-for-joint-pain-relief-in-murfreesboro.jpg",
  "choosing-pain-management-in-murfreesboro-after-failed-back-surgery":
    "/images/blog/covers/choosing-pain-management-in-murfreesboro-after-failed-back-surgery.png",
  "questioning-your-back-pain-relief-plan-in-murfreesboro-tn":
    "/images/blog/covers/questioning-your-back-pain-relief-plan-in-murfreesboro-tn.jpg",
}

export const COMMITTED_COVER_SLUGS: readonly string[] = Object.keys(COMMITTED_COVER_FILES)

export const COMMITTED_COVER_ALTS: Record<string, string> = {
  "massage-therapy-and-chiropractic-care-for-joint-pain-relief-in-murfreesboro":
    "Woman pausing on the edge of a chair, holding a stiff painful knee on a cool autumn morning",
  "choosing-pain-management-in-murfreesboro-after-failed-back-surgery":
    "Anatomical illustration of a spine with lower-back pain highlighted",
  "questioning-your-back-pain-relief-plan-in-murfreesboro-tn":
    "Man sitting on a sofa, holding his lower back",
}

export function committedCoverUrl(slug?: string): string | null {
  if (!slug) return null
  return COMMITTED_COVER_FILES[slug] ?? null
}
