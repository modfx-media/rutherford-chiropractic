/** Contextual service/condition links for blog posts, and the reverse links
 * from those pages back to the posts. Targets are indexable service and
 * condition URLs only — never noindexed audience pages. */

export type TextLink = { href: string; label: string };

export type TopicLinks = {
  before: string;
  links: TextLink[];
  after: string;
};

const RANKING: Record<string, TopicLinks> = {
  "i-just-stood-up-and-my-leg-gave-out-what-sciatica-pain-is-really-telling-you": {
    before: "When a leg gives out as you stand up, our Murfreesboro pages on",
    links: [
      { href: "/sciatica/", label: "sciatica" },
      { href: "/chiropractic/", label: "chiropractic care" },
    ],
    after: " describe what that kind of visit covers.",
  },
  "why-your-back-locks-up-when-you-try-to-stand-straight-and-what-its-really-telling-you": {
    before: "If your back locks when you try to stand straight, start with our pages on",
    links: [
      { href: "/back-pain-relief/", label: "back pain relief" },
      { href: "/chiropractic/", label: "chiropractic care" },
      { href: "/spinal-decompression/", label: "spinal decompression" },
    ],
    after: ".",
  },
  "the-hidden-link-between-lower-back-problems-and-neuropathy-in-your-feet-and-hands-and-why-no-one-told-you-earlier": {
    before: "Numbness in the hands or feet is covered on our",
    links: [
      { href: "/neuropathy/", label: "neuropathy" },
      { href: "/back-pain-relief/", label: "back pain relief" },
    ],
    after: " pages, which describe the care we offer in Murfreesboro.",
  },
  "why-your-pain-moves-around-one-day-its-your-back-the-next-its-your-leg": {
    before: "Pain that shows up in the back one day and the leg the next is discussed on our",
    links: [
      { href: "/sciatica/", label: "sciatica" },
      { href: "/back-pain-relief/", label: "back pain" },
    ],
    after: " pages.",
  },
  "why-your-joints-pop-crack-or-click-when-you-move": {
    before: "Popping or cracking joints are part of what we cover on our",
    links: [
      { href: "/joint-pain/", label: "joint pain" },
      { href: "/chiropractic/", label: "chiropractic" },
    ],
    after: " pages.",
  },
  "neuropathy-in-young-adults": {
    before: "For the care itself, see our",
    links: [
      { href: "/neuropathy/", label: "neuropathy" },
      { href: "/chiropractic/", label: "chiropractic care" },
    ],
    after: " pages. Both describe visits at the Murfreesboro office.",
  },
  "sciatica-while-driving-seat-setup-posture-treatment": {
    before: "Seat setup is only part of the picture. Our",
    links: [
      { href: "/sciatica/", label: "sciatica" },
      { href: "/chiropractic/", label: "chiropractic care" },
    ],
    after: " pages describe the next conversation at our Murfreesboro office.",
  },
  "how-spinal-decompression-can-help-with-arthritis-and-numbness": {
    before: "This topic sits between our pages on",
    links: [
      { href: "/spinal-decompression/", label: "spinal decompression" },
      { href: "/arthritis/", label: "arthritis" },
      { href: "/neuropathy/", label: "neuropathy" },
    ],
    after: ".",
  },
  "how-spinal-decompression-can-help-with-different-types-of-neuropathy": {
    before: "Read how we describe",
    links: [
      { href: "/spinal-decompression/", label: "spinal decompression" },
      { href: "/neuropathy/", label: "neuropathy" },
    ],
    after: " at the Murfreesboro office.",
  },
  "chronic-pain-relief-with-massage-therapy-in-murfreesboro": {
    before: "Massage is one option people ask about alongside",
    links: [
      { href: "/chiropractic/", label: "chiropractic care" },
      { href: "/back-pain-relief/", label: "back pain relief" },
    ],
    after: " at our Murfreesboro office.",
  },
};

const KEYWORDS: Array<{ test: RegExp; links: TextLink[] }> = [
  {
    test: /sciatic/,
    links: [
      { href: "/sciatica/", label: "sciatica" },
      { href: "/chiropractic/", label: "chiropractic care" },
    ],
  },
  {
    test: /neuropath/,
    links: [
      { href: "/neuropathy/", label: "neuropathy" },
      { href: "/chiropractic/", label: "chiropractic care" },
    ],
  },
  {
    test: /decompress/,
    links: [
      { href: "/spinal-decompression/", label: "spinal decompression" },
      { href: "/back-pain-relief/", label: "back pain relief" },
    ],
  },
  {
    test: /whiplash|auto|accident|car-injury/,
    links: [
      { href: "/auto-injuries/", label: "auto injury care" },
      { href: "/whiplash/", label: "whiplash" },
    ],
  },
  {
    test: /sport/,
    links: [
      { href: "/sports-injuries/", label: "sports injury care" },
      { href: "/chiropractic/", label: "chiropractic care" },
    ],
  },
  {
    test: /headache|migraine/,
    links: [
      { href: "/migraines-headaches/", label: "headaches and migraines" },
      { href: "/chiropractic/", label: "chiropractic care" },
    ],
  },
  {
    test: /disc/,
    links: [
      { href: "/herniated-disc/", label: "disc injuries" },
      { href: "/spinal-decompression/", label: "spinal decompression" },
    ],
  },
  {
    test: /joint|arthritis/,
    links: [
      { href: "/joint-pain/", label: "joint pain" },
      { href: "/chiropractic/", label: "chiropractic care" },
    ],
  },
  {
    test: /back|spine|neck/,
    links: [
      { href: "/back-pain-relief/", label: "back pain relief" },
      { href: "/chiropractic/", label: "chiropractic care" },
    ],
  },
];

const DEFAULT_LINKS: TextLink[] = [
  { href: "/chiropractic/", label: "chiropractic care" },
  { href: "/back-pain-relief/", label: "back pain relief" },
];

export function topicLinksForPost(slug: string, title = ""): TopicLinks {
  const ranked = RANKING[slug];
  if (ranked) return ranked;
  const haystack = `${slug} ${title}`.toLowerCase();
  const match = KEYWORDS.find((entry) => entry.test.test(haystack));
  return {
    before: "More about the care we offer in Murfreesboro is on our",
    links: match?.links ?? DEFAULT_LINKS,
    after: " pages.",
  };
}

const READING: Record<string, TextLink[]> = {
  sciatica: [
    {
      href: "/i-just-stood-up-and-my-leg-gave-out-what-sciatica-pain-is-really-telling-you/",
      label: "Leg gave out when you stood up",
    },
    {
      href: "/why-your-pain-moves-around-one-day-its-your-back-the-next-its-your-leg/",
      label: "When back pain moves down the leg",
    },
    {
      href: "/sciatica-while-driving-seat-setup-posture-treatment/",
      label: "Sciatica while driving",
    },
  ],
  "back-pain-relief": [
    {
      href: "/why-your-back-locks-up-when-you-try-to-stand-straight-and-what-its-really-telling-you/",
      label: "Back locks up when you stand",
    },
    {
      href: "/why-your-pain-moves-around-one-day-its-your-back-the-next-its-your-leg/",
      label: "When pain moves from back to leg",
    },
    {
      href: "/chronic-pain-relief-with-massage-therapy-in-murfreesboro/",
      label: "Massage and chronic pain",
    },
  ],
  neuropathy: [
    {
      href: "/the-hidden-link-between-lower-back-problems-and-neuropathy-in-your-feet-and-hands-and-why-no-one-told-you-earlier/",
      label: "Back trouble and numb hands or feet",
    },
    {
      href: "/neuropathy-in-young-adults/",
      label: "Neuropathy in young adults",
    },
    {
      href: "/how-spinal-decompression-can-help-with-different-types-of-neuropathy/",
      label: "Decompression and neuropathy patterns",
    },
  ],
  chiropractic: [
    {
      href: "/why-your-joints-pop-crack-or-click-when-you-move/",
      label: "Why joints pop or crack",
    },
    {
      href: "/i-just-stood-up-and-my-leg-gave-out-what-sciatica-pain-is-really-telling-you/",
      label: "When a leg gives out on standing",
    },
  ],
  "spinal-decompression": [
    {
      href: "/how-spinal-decompression-can-help-with-arthritis-and-numbness/",
      label: "Arthritis, numbness, and decompression",
    },
    {
      href: "/how-spinal-decompression-can-help-with-different-types-of-neuropathy/",
      label: "Decompression and neuropathy types",
    },
  ],
  arthritis: [
    {
      href: "/how-spinal-decompression-can-help-with-arthritis-and-numbness/",
      label: "Arthritis, numbness, and decompression",
    },
  ],
  "joint-pain": [
    {
      href: "/why-your-joints-pop-crack-or-click-when-you-move/",
      label: "Why joints pop, crack, or click",
    },
  ],
};

export function readingForPage(slug: string): TextLink[] {
  return READING[slug] ?? [];
}
