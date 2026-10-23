import { titleForPath } from "./seo/page-titles";

/** Search Console descriptions for the highest-impression posts
 * (July 23–October 22, 2026). Titles live in `page-titles.ts` so the
 * sitemap sweep and these posts cannot drift apart. Copy stays
 * descriptive: no cure or diagnosis claims. */

export type BlogSeo = { title: string; description: string };

const DESCRIPTIONS: Record<string, string> = {
  "/i-just-stood-up-and-my-leg-gave-out-what-sciatica-pain-is-really-telling-you/":
    "Your leg gave out when you stood up? This Murfreesboro article describes that sciatica pattern and what a chiropractic visit covers. Call 615-217-0097.",
  "/why-your-back-locks-up-when-you-try-to-stand-straight-and-what-its-really-telling-you/":
    "Back locks up when you try to stand straight? Read what our Murfreesboro team hears often, and how a visit looks at the spine. Call 615-217-0097.",
  "/the-hidden-link-between-lower-back-problems-and-neuropathy-in-your-feet-and-hands-and-why-no-one-told-you-earlier/":
    "Numbness in the hands or feet sometimes shows up alongside lower-back trouble. See how our Murfreesboro clinic looks at both. Call 615-217-0097.",
  "/why-your-pain-moves-around-one-day-its-your-back-the-next-its-your-leg/":
    "Pain in the back one day and the leg the next is a common reason people call. Read how our Murfreesboro team talks through it. Call 615-217-0097.",
  "/why-your-joints-pop-crack-or-click-when-you-move/":
    "Joints that pop, crack, or click when you move are a common question. Learn what those sounds can mean and when to get them checked in Murfreesboro.",
  "/neuropathy-in-young-adults/":
    "Neuropathy is not only an older-adult topic. This Murfreesboro article covers signs younger adults notice and how our clinic approaches care. Call 615-217-0097.",
  "/sciatica-while-driving-seat-setup-posture-treatment/":
    "Sciatica can flare on Murfreesboro drives. This guide covers seat setup, posture breaks, and when to talk with a chiropractor. Call 615-217-0097.",
  "/how-spinal-decompression-can-help-with-arthritis-and-numbness/":
    "Arthritis and numbness sometimes overlap in the spine. Read how spinal decompression fits into care at our Murfreesboro office. Call 615-217-0097.",
  "/how-spinal-decompression-can-help-with-different-types-of-neuropathy/":
    "Different neuropathy patterns can feel different. This Murfreesboro article describes spinal decompression as one non-surgical option to ask about.",
  "/chronic-pain-relief-with-massage-therapy-in-murfreesboro/":
    "Massage therapy in Murfreesboro can sit alongside chiropractic care for people living with ongoing spine or joint pain. Call our office at 615-217-0097.",
};

function normalize(path: string): string {
  const withLead = path.startsWith("/") ? path : `/${path}`;
  return withLead.endsWith("/") ? withLead : `${withLead}/`;
}

export function blogSeoOverride(path: string): BlogSeo | undefined {
  const key = normalize(path);
  const description = DESCRIPTIONS[key];
  const title = titleForPath(key);
  if (!description || !title) return undefined;
  return { title, description };
}
