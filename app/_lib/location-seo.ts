import { getLocationPage } from "./locations";

const SERVICE_TITLES: Record<string, string> = {
  chiropractic: "Chiropractic Care",
  "spinal-decompression": "Spinal Decompression",
  neuropathy: "Neuropathy Care",
  "back-pain-relief": "Back Pain Relief",
  "auto-injuries": "Auto Injury Care",
  "sports-injuries": "Sports Injury Care",
};

/** Absolute title for `/{service}-{city}-tn/` pages. The scraped title
 * already ended in "Chiropractic Murfreesboro TN", and the layout template
 * added the brand again. */
export function locationLandingTitle(path: string): string | null {
  const slug = path.replace(/^\/+|\/+$/g, "");
  const page = getLocationPage(slug);
  if (!page) return null;
  const label = SERVICE_TITLES[page.service] ?? page.service;
  return `${label} in ${page.city} | Rutherford`;
}
