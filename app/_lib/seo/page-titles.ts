import { getAllLocationSlugs } from "../locations";
import { locationLandingTitle } from "../location-seo";
import { PSEO_COMBINATIONS } from "../pseo/combinations";
import { getCustomPseoContent } from "../pseo/city-content";
import { getPseoCondition } from "../pseo/conditions";
import { getNeighborhood } from "../pseo/neighborhoods";
import { pseoTitle } from "../pseo/titles";

/**
 * Absolute document titles for indexable pages.
 *
 * The root layout template is "%s | Rutherford Spine & Wellness Center".
 * Any title that already names the clinic gets that suffix a second time
 * and runs past 60 characters. These strings include the brand once
 * (" | Rutherford") and are applied with `title: { absolute }` so the
 * template cannot append again.
 *
 * Pillar pages use a different wording than the matching
 * `/{service}-{city}-tn/` landing page so the two titles stay unique
 * (for example "Chiropractic Clinic…" vs "Chiropractic Care in Murfreesboro").
 */

export const TITLE_BRAND = " | Rutherford";
export const TITLE_MAX = 60;

const BRAND = TITLE_BRAND;

function brand(head: string): string {
  return `${head}${BRAND}`;
}

export const PAGE_TITLES: Record<string, string> = {
  "/": brand("Chiropractor in Murfreesboro, TN"),
  "/contact-us/": brand("Contact Us in Murfreesboro"),
  "/financing/": brand("Financing Options in Murfreesboro"),
  "/new-patients/": brand("New Patients in Murfreesboro"),
  "/new-patient-forms/": brand("New Patient Forms"),
  "/blog/": brand("Chiropractic Blog in Murfreesboro"),
  "/areas-we-serve/": brand("Areas We Serve"),
  "/sitemap/": brand("Sitemap"),

  "/sports-injuries/": brand("Sports Injury Treatment in Murfreesboro"),
  "/auto-injuries/": brand("Auto Injury Treatment in Murfreesboro"),
  "/back-pain-relief/": brand("Back Pain Treatment in Murfreesboro"),
  "/neuropathy/": brand("Neuropathy Treatment in Murfreesboro"),
  "/spinal-decompression/": brand("Spinal Decompression Therapy in Murfreesboro"),
  "/chiropractic/": brand("Chiropractic Clinic in Murfreesboro"),

  "/sciatica/": brand("Sciatica Treatment in Murfreesboro"),
  "/herniated-disc/": brand("Herniated Disc Care in Murfreesboro"),
  "/migraines-headaches/": brand("Migraine & Headache Relief in Murfreesboro"),
  "/whiplash/": brand("Whiplash Treatment in Murfreesboro"),
  "/arthritis/": brand("Arthritis & Numbness Care in Murfreesboro"),
  "/degenerative-disc-disease/": brand("Degenerative Disc Care in Murfreesboro"),
  "/joint-pain/": brand("Joint Pain Relief in Murfreesboro"),

  "/what-to-expect-at-a-chiropractic-evaluation-in-murfreesboro/": brand(
    "Chiropractic Evaluation in Murfreesboro",
  ),
  "/fibromyalgia-relief-options-with-chiropractic-care/": brand(
    "Fibromyalgia Relief With Chiropractic",
  ),
  "/7-day-home-plan-for-chronic-pain-relief-in-murfreesboro/": brand(
    "7-Day Home Plan for Chronic Pain",
  ),
  "/chronic-pain-care-tips-for-murfreesboro-patients/": brand(
    "Chronic Pain Tips for Murfreesboro",
  ),
  "/chronic-spine-pain-relief-with-rehab-care-in-murfreesboro/": brand(
    "Chronic Spine Pain and Rehab Care",
  ),
  "/chronic-pain-relief-with-massage-therapy-in-murfreesboro/": brand(
    "Massage for Chronic Pain in Murfreesboro",
  ),
  "/find-your-pain-driver-before-choosing-a-treatment/": brand(
    "Find Your Pain Driver First",
  ),
  "/chronic-pain-warning-signs-when-to-seek-imaging/": brand(
    "When Chronic Pain Needs Imaging",
  ),
  "/neuropathy-treatment-without-drugs/": brand("Drug-Free Neuropathy Care Options"),
  "/pain-medication-chiropractic-care/": brand("Pain Medication and Chiropractic Care"),
  "/first-spinal-decompression-visit/": brand("Your First Spinal Decompression Visit"),
  "/sciatica-while-driving-seat-setup-posture-treatment/": brand(
    "Sciatica While Driving: Seat Setup",
  ),
  "/movements-aggravate-sciatica-pain/": brand("Habits That Make Sciatica Feel Worse"),
  "/spinal-disc-pain-vs-muscle-strain/": brand("Disc Pain vs Muscle Strain"),
  "/everyday-habits-quietly-damage-spine/": brand("Daily Habits That Stress Your Spine"),
  "/preventing-summer-sports-injuries/": brand("Summer Sports Injury Prevention Tips"),
  "/auto-injury-headaches-and-dizziness/": brand("Headaches After an Auto Injury"),
  "/why-your-pain-moves-around-one-day-its-your-back-the-next-its-your-leg/": brand(
    "When Back Pain Moves Down the Leg",
  ),
  "/why-your-hip-pain-comes-and-goes-the-spine-stability-connection-no-one-is-talking-about/":
    brand("Hip Pain That Comes and Goes"),
  "/why-your-back-locks-up-when-you-try-to-stand-straight-and-what-its-really-telling-you/":
    brand("Back Locks Up When You Stand?"),
  "/why-spinal-decompression-may-be-the-missing-link-in-your-pain-relief-journey/": brand(
    "Where Spinal Decompression Fits In",
  ),
  "/why-sciatica-flares-when-you-sit-and-the-hidden-posture-problem-no-one-talks-about/":
    brand("Why Sciatica Flares When You Sit"),
  "/why-one-knee-or-hip-hurts-more-than-the-other-and-the-hidden-alignment-problem-most-people-never-realize/":
    brand("When One Knee or Hip Hurts More"),
  "/why-do-my-socks-feel-tight-when-im-not-wearing-any-the-neuropathy-red-flag-you-shouldnt-ignore/":
    brand("Tight Socks Feeling and Neuropathy"),
  "/the-hidden-link-between-lower-back-problems-and-neuropathy-in-your-feet-and-hands-and-why-no-one-told-you-earlier/":
    brand("Back Trouble and Numb Hands or Feet"),
  "/the-7-most-common-daily-activities-that-damage-your-spine-without-you-realizing-it/":
    brand("Daily Activities That Stress the Spine"),
  "/stop-losing-sleep-the-real-reason-your-shoulder-pain-wont-let-you-rest/": brand(
    "Shoulder Pain That Disturbs Sleep",
  ),
  "/spinal-decompression-therapy/": brand("Headache Relief and Decompression"),
  "/spinal-decompression-in-murfreesboro-a-non-surgical-path-to-real-relief/": brand(
    "Non-Surgical Spinal Decompression",
  ),
  "/spinal-decompression-for-headaches-and-migraines/": brand("Decompression for Headaches"),
  "/signs-of-neuropathy/": brand("Early Signs of Neuropathy"),
  "/restless-nights-how-neuropathy-leg-pain-disrupts-sleep-what-you-can-do-about-it-9/":
    brand("Neuropathy Leg Pain and Sleep"),
  "/i-just-stood-up-and-my-leg-gave-out-what-sciatica-pain-is-really-telling-you/": brand(
    "Sciatica When Your Leg Gives Out",
  ),
  "/how-spinal-decompression-can-help-with-spine-misalignment-from-work-injuries/": brand(
    "Decompression for Work-Related Spine Pain",
  ),
  "/how-spinal-decompression-can-alleviate-pain-from-work-related-injuries/": brand(
    "Decompression After Work Injuries",
  ),
  "/chiropractic-care-and-spinal-decompression/": brand("Chiropractic Care and Decompression"),
  "/what-causes-neuropathy/": brand("What Causes Neuropathy?"),
  "/chiropractors-murfreesboro-tn/": brand("Chiropractors in Murfreesboro, TN"),
  "/when-to-see-chiropractor/": brand("When to See a Chiropractor"),
  "/signs-sports-injury-needs-chiropractor/": brand(
    "When a Sports Injury Needs a Chiropractor",
  ),
  "/neck-pain-after-car-accident-needs-chiropractor/": brand("Neck Pain After a Car Accident"),
  "/chronic-back-pain-needs-spinal-decompression/": brand("Decompression for Chronic Back Pain"),
  "/choosing-spine-doctor-after-sports-injury/": brand("Choosing Care After a Sports Injury"),
  "/neck-pain-treatment-remote-workers/": brand("Desk Neck Pain in Murfreesboro"),
  "/hidden-joint-pain-triggers/": brand("Hidden Joint Pain Triggers"),
  "/whiplash-treatment-options-murfreesboro/": brand("Whiplash Care Options in Murfreesboro"),
  "/why-your-joints-pop-crack-or-click-when-you-move/": brand(
    "Why Joints Pop or Crack When You Move",
  ),
  "/the-hidden-reason-your-lower-back-pain-makes-your-knees-ache-too/": brand(
    "When Low Back Pain Reaches the Knees",
  ),
  "/regain-grip-find-relief-from-hand-numbness-neuropathy/": brand(
    "Hand Numbness and Neuropathy",
  ),
  "/overcome-runners-knee-with-chiropractic-care/": brand(
    "Runner's Knee and Chiropractic Care",
  ),
  "/living-with-neuropathy-7-real-life-hacks-to-make-everyday-tasks-easier-and-less-painful-7/":
    brand("Everyday Tasks With Neuropathy"),
  "/how-spinal-decompression-can-help-with-different-types-of-neuropathy/": brand(
    "Decompression and Neuropathy Types",
  ),
  "/how-spinal-decompression-can-help-with-arthritis-and-numbness/": brand(
    "Arthritis, Numbness, and Decompression",
  ),
  "/fixing-work-related-spine-misalignment-with-spinal-decompression/": brand(
    "Work-Related Spine Misalignment",
  ),
  "/chronic-neck-pain-with-spinal-decompression/": brand("Chronic Neck Pain and Decompression"),
  "/when-touch-hurts-coping-with-extreme-sensitivity-from-neuropathy-42/": brand(
    "When Touch Hurts With Neuropathy",
  ),
  "/neuropathy-pain-during-the-busy-season/": brand("Neuropathy Pain in a Busy Season"),
  "/neuropathy-in-young-adults/": brand("Neuropathy in Young Adults: What Shows Up"),
  "/how-spinal-decompression-can-help-with-sciatica-relief/": brand(
    "Decompression for Sciatica Relief",
  ),
  "/how-neuropathy-affects-your-sleep/": brand("How Neuropathy Can Affect Sleep"),
  "/how-to-recognize-the-early-signs-of-neuropathy/": brand("How to Spot Early Neuropathy Signs"),
  "/chiropractic-spinal-decompression-therapy-4/": brand("Chiropractic and Decompression Therapy"),
  "/chiropractic-care-for-disc-injuries/": brand("Chiropractic Care for Disc Injuries"),
  "/chiropractic-relief-for-headaches-and-pain/": brand("Chiropractic Care for Headaches"),
  "/back-pain-chiropractor-murfreesboro-tn/": brand("Back Pain Chiropractor in Murfreesboro"),
  "/chiropractic-spinal-decompression-murfreesboro-tn/": brand(
    "Decompression Chiropractor, Murfreesboro",
  ),
  "/chiropractic-care-for-sports-injuries-murfreesboro-tn/": brand(
    "Sports Injury Chiropractic in Murfreesboro",
  ),
  "/best-chiropractor-murfreesboro-tn/": brand("Best Chiropractor in Murfreesboro"),
  "/car-injury-chiropractic-care-murfreesboro-tn/": brand(
    "Car Injury Chiropractic in Murfreesboro",
  ),
  "/chiropractic-care-murfreesboro-tn/": brand("Chiropractic Care in Murfreesboro, TN"),
  "/sports-injury-chiropractor-mufreesboro-tn/": brand(
    "Sports Injury Chiropractor, Murfreesboro",
  ),
};

export function normalizePagePath(path: string): string {
  const withLead = path.startsWith("/") ? path : `/${path}`;
  return withLead.endsWith("/") ? withLead : `${withLead}/`;
}

export function titleForPath(path: string): string | undefined {
  return PAGE_TITLES[normalizePagePath(path)];
}

export function requirePageTitle(path: string): string {
  const title = titleForPath(path);
  if (!title) throw new Error(`Missing page title for ${path}`);
  return title;
}

const BRAND_SUFFIXES: RegExp[] = [
  /\s*\|\s*Rutherford Spine & Wellness Center\s*$/i,
  /\s*\|\s*Rutherford Spine & Wellness\s*$/i,
  /\s*\|\s*Rutherford\s*$/i,
  /\s*[-–—|]\s*Chiropractic Murfreesboro TN\s*$/i,
];

/** Drop a trailing clinic name so the short brand can be added once. */
export function stripBrandSuffix(title: string): string {
  let t = title.replace(/\s+/g, " ").trim();
  t = t.replace(/Rutherford Spine & Wellness Center/gi, "");
  t = t.replace(/Rutherford Spine & Wellness/gi, "");
  t = t.replace(/Chiropractic Murfreesboro TN/gi, "");
  let prev = "";
  while (t && t !== prev) {
    prev = t;
    for (const pattern of BRAND_SUFFIXES) t = t.replace(pattern, "").trim();
  }
  return t
    .replace(/\s+\|\s*$/g, "")
    .replace(/^[\s|:-]+|[\s|:-]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function clipHead(head: string, max: number): string {
  const clean = head.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max + 1);
  const space = cut.lastIndexOf(" ");
  let clipped = (space > 12 ? cut.slice(0, space) : clean.slice(0, max)).trim();
  clipped = clipped
    .replace(/[\s,;:–—\-|]+$/g, "")
    .replace(/\s+(and|or|the|a|an|with|for|to|of|in|on|from|your|that)$/i, "");
  return clipped || clean.slice(0, max).trim();
}

function withSingleBrand(head: string): string {
  let clean = stripBrandSuffix(head);
  if (/Rutherford/i.test(clean)) {
    clean = clean.replace(/\bRutherford\b/gi, "").replace(/\s{2,}/g, " ").trim();
  }
  const titled = `${clipHead(clean || "Murfreesboro Chiropractic", TITLE_MAX - BRAND.length)}${BRAND}`;
  return titled.length <= TITLE_MAX ? titled : `${clipHead(clean, TITLE_MAX - BRAND.length)}${BRAND}`;
}

let reservedTitles: Set<string> | null = null;

function indexableReservedTitles(): Set<string> {
  if (reservedTitles) return reservedTitles;
  const reserved = new Set<string>(Object.values(PAGE_TITLES));
  for (const slug of getAllLocationSlugs()) {
    const title = locationLandingTitle(`/${slug}/`);
    if (title) reserved.add(title);
  }
  for (const combo of PSEO_COMBINATIONS) {
    if (!getCustomPseoContent(combo.conditionSlug, combo.neighborhoodSlug)) continue;
    const condition = getPseoCondition(combo.conditionSlug);
    const neighborhood = getNeighborhood(combo.neighborhoodSlug);
    if (!condition || !neighborhood) continue;
    reserved.add(
      pseoTitle({
        conditionName: condition.name,
        placeSlug: neighborhood.slug,
        placeName: neighborhood.name,
      }),
    );
  }
  reservedTitles = reserved;
  return reserved;
}

function fitUniqueTitle(path: string, raw: string): string {
  const reserved = indexableReservedTitles();
  let title = withSingleBrand(raw || "Murfreesboro Chiropractic");
  if (!reserved.has(title)) {
    reserved.add(title);
    return title;
  }

  const slug = normalizePagePath(path).replace(/^\/|\/$/g, "").split("/").pop() || "page";
  const hint = slug
    .split("-")
    .filter((word) => word.length > 2 && !/^\d+$/.test(word))
    .slice(-2)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const head = stripBrandSuffix(raw || hint || "Page");
  const room = TITLE_MAX - BRAND.length - hint.length - 2;
  title = `${clipHead(head, Math.max(12, room))}: ${hint}${BRAND}`;
  if (title.length > TITLE_MAX || reserved.has(title)) {
    const mark = String(Math.abs(hashPath(path) % 100)).padStart(2, "0");
    title = `${clipHead(head, TITLE_MAX - BRAND.length - mark.length - 1)} ${mark}${BRAND}`;
  }
  reserved.add(title);
  return title;
}

function hashPath(path: string): number {
  let hash = 0;
  for (let i = 0; i < path.length; i += 1) hash = (hash * 33 + path.charCodeAt(i)) >>> 0;
  return hash;
}

/**
 * Title that should render for an indexable path. Known pages win over CMS
 * copies of the old long templates. Unknown posts (CMS or Ranked) are
 * shortened, branded once, and kept distinct from titles already in use.
 */
export function resolveIndexableTitle(path: string, raw?: string | null): string {
  const key = normalizePagePath(path);
  const known = PAGE_TITLES[key];
  if (known) return known;
  const location = locationLandingTitle(key);
  if (location) return location;
  return fitUniqueTitle(key, raw ?? "");
}
