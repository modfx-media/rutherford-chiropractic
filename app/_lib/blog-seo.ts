/** Search Console titles and descriptions for the highest-impression posts
 * (July 23–October 22, 2026). Titles are absolute so the layout brand
 * suffix is not added a second time. Copy stays descriptive: no cure or
 * diagnosis claims. */

export type BlogSeo = { title: string; description: string };

const POSTS: Record<string, BlogSeo> = {
  "/i-just-stood-up-and-my-leg-gave-out-what-sciatica-pain-is-really-telling-you/": {
    title: "Sciatica When Your Leg Gives Out | Rutherford",
    description:
      "Your leg gave out when you stood up? This Murfreesboro article describes that sciatica pattern and what a chiropractic visit covers. Call 615-217-0097.",
  },
  "/why-your-back-locks-up-when-you-try-to-stand-straight-and-what-its-really-telling-you/": {
    title: "Back Locks Up When You Stand? | Rutherford",
    description:
      "Back locks up when you try to stand straight? Read what our Murfreesboro team hears often, and how a visit looks at the spine. Call 615-217-0097.",
  },
  "/the-hidden-link-between-lower-back-problems-and-neuropathy-in-your-feet-and-hands-and-why-no-one-told-you-earlier/": {
    title: "Back Trouble and Numb Hands or Feet | Rutherford",
    description:
      "Numbness in the hands or feet sometimes shows up alongside lower-back trouble. See how our Murfreesboro clinic looks at both. Call 615-217-0097.",
  },
  "/why-your-pain-moves-around-one-day-its-your-back-the-next-its-your-leg/": {
    title: "When Back Pain Moves Down the Leg | Rutherford",
    description:
      "Pain in the back one day and the leg the next is a common reason people call. Read how our Murfreesboro team talks through it. Call 615-217-0097.",
  },
  "/why-your-joints-pop-crack-or-click-when-you-move/": {
    title: "Why Joints Pop or Crack When You Move | Rutherford",
    description:
      "Joints that pop, crack, or click when you move are a common question. Learn what those sounds can mean and when to get them checked in Murfreesboro.",
  },
  "/neuropathy-in-young-adults/": {
    title: "Neuropathy in Young Adults: What Shows Up | Rutherford",
    description:
      "Neuropathy is not only an older-adult topic. This Murfreesboro article covers signs younger adults notice and how our clinic approaches care. Call 615-217-0097.",
  },
  "/sciatica-while-driving-seat-setup-posture-treatment/": {
    title: "Sciatica While Driving: Seat Setup | Rutherford",
    description:
      "Sciatica can flare on Murfreesboro drives. This guide covers seat setup, posture breaks, and when to talk with a chiropractor. Call 615-217-0097.",
  },
  "/how-spinal-decompression-can-help-with-arthritis-and-numbness/": {
    title: "Arthritis, Numbness, and Decompression | Rutherford",
    description:
      "Arthritis and numbness sometimes overlap in the spine. Read how spinal decompression fits into care at our Murfreesboro office. Call 615-217-0097.",
  },
  "/how-spinal-decompression-can-help-with-different-types-of-neuropathy/": {
    title: "Decompression and Neuropathy Types | Rutherford",
    description:
      "Different neuropathy patterns can feel different. This Murfreesboro article describes spinal decompression as one non-surgical option to ask about.",
  },
  "/chronic-pain-relief-with-massage-therapy-in-murfreesboro/": {
    title: "Massage for Chronic Pain in Murfreesboro | Rutherford",
    description:
      "Massage therapy in Murfreesboro can sit alongside chiropractic care for people living with ongoing spine or joint pain. Call our office at 615-217-0097.",
  },
};

function normalize(path: string): string {
  const withLead = path.startsWith("/") ? path : `/${path}`;
  return withLead.endsWith("/") ? withLead : `${withLead}/`;
}

export function blogSeoOverride(path: string): BlogSeo | undefined {
  return POSTS[normalize(path)];
}
