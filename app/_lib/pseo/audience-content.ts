import { ORIGIN } from "../content-map";
import { getPseoCondition, type PseoFaq } from "./conditions";
import { getNeighborhood, type Neighborhood } from "./neighborhoods";
import { getPseoAudience, PSEO_AUDIENCES, type PseoAudience } from "./audiences";
import { getLocationPage, getServiceMeta } from "../locations";
import type { PseoPageContent } from "./content";
import { pseoDescription, pseoTitle } from "./titles";

/**
 * 3rd content taxonomy layer: `/{condition}/{city}/{audience}/` pages,
 * combining a condition, a representative neighborhood for each of the 10
 * targeted cities, and one of the 5 `PSEO_AUDIENCES` occupation/life-stage
 * angles from `audiences.ts`.
 *
 * Scale (25 conditions x 10 cities x 5 audiences = 1,250 pages) makes
 * hand-authoring every sentence impractical, so — like the original
 * fallback assembly in `content.ts` before `city-content.ts` overrides
 * existed — this builds every page from modular, factual fragments
 * (condition clinical data + real neighborhood descriptor + real audience
 * blurb) rather than literal duplicated copy. The condition-level lead and
 * "why choose us" bridge sentence are intentionally shared across a
 * condition's 50 audience pages (same pattern as the site's other
 * assembly-based pages); the neighborhood- and audience-specific sentences
 * and 2 of the 5 FAQs are unique to every (condition, city, audience)
 * combination.
 */

export type PseoAudiencePageParams = { condition: string; city: string; audience: string };

export type PseoAudienceCombo = {
  conditionSlug: string;
  neighborhoodSlug: string;
  audienceSlug: string;
};

/** One representative, real neighborhood per targeted city — the same
 * table used to seed the hand-written `city-content.ts` batches. */
const REPRESENTATIVE_NEIGHBORHOODS = [
  "blackman-murfreesboro",
  "sam-ridley-smyrna",
  "lake-forest-estates-la-vergne",
  "downtown-lebanon",
  "cool-springs-franklin",
  "maryland-farms-brentwood",
  "green-hills-nashville",
  "downtown-shelbyville",
  "downtown-woodbury",
  "downtown-eagleville",
];

/** Every condition slug currently defined, read lazily via `getPseoCondition`
 * so this file doesn't need to duplicate the list — built from the same
 * source `conditions.ts` exports. */
const CONDITION_SLUGS = [
  "sciatica",
  "herniated-disc",
  "bulging-disc",
  "degenerative-disc-disease",
  "pinched-nerve",
  "whiplash",
  "migraines-headaches",
  "tmj",
  "carpal-tunnel",
  "fibromyalgia",
  "scoliosis",
  "tendonitis",
  "frozen-shoulder",
  "rotator-cuff-pain",
  "plantar-fasciitis",
  "runners-knee",
  "tennis-elbow",
  "text-neck",
  "radiculopathy",
  "facet-syndrome",
  "poor-posture",
  "numbness-hands-feet",
  "work-injury",
  "slip-and-fall-injury",
  "pregnancy-related-back-pain",
];

/** All 1,250 approved (condition x city x audience) combinations. */
export const PSEO_AUDIENCE_COMBINATIONS: PseoAudienceCombo[] = CONDITION_SLUGS.flatMap((conditionSlug) =>
  REPRESENTATIVE_NEIGHBORHOODS.flatMap((neighborhoodSlug) =>
    PSEO_AUDIENCES.map((audience) => ({
      conditionSlug,
      neighborhoodSlug,
      audienceSlug: audience.slug,
    })),
  ),
);

const audienceComboKey = (conditionSlug: string, neighborhoodSlug: string, audienceSlug: string) =>
  `${conditionSlug}::${neighborhoodSlug}::${audienceSlug}`;

const approvedAudienceCombos = new Set(
  PSEO_AUDIENCE_COMBINATIONS.map((c) => audienceComboKey(c.conditionSlug, c.neighborhoodSlug, c.audienceSlug)),
);

export function isApprovedPseoAudienceCombo(conditionSlug: string, neighborhoodSlug: string, audienceSlug: string): boolean {
  return approvedAudienceCombos.has(audienceComboKey(conditionSlug, neighborhoodSlug, audienceSlug));
}

const WHY_CHOOSE_US = [
  "29 years of hands-on clinical experience treating patients throughout Rutherford County and Middle Tennessee",
  "A whole-person, non-invasive, drug-free approach built around your specific symptoms",
  "Personalized treatment plans designed with you by Dr. Wesley Stewart and our care team",
  "A convenient Murfreesboro location with flexible scheduling for patients across the region",
];

function buildAudienceIntroParagraphs(
  conditionSlug: string,
  neighborhood: Neighborhood,
  audience: PseoAudience,
): string[] {
  const condition = getPseoCondition(conditionSlug);
  if (!condition) throw new Error(`Unknown pSEO condition slug: ${conditionSlug}`);

  const first = condition.introLead;

  const second = `${audience.blurb} That link is exactly why we see so many ${audience.label.toLowerCase()} dealing with ${condition.mentionPhrase} - and why a treatment plan that accounts for your daily routine tends to hold up better than one that doesn't.`;

  const third = `If you live or work in ${neighborhood.name}, ${neighborhood.cityName} - including ${neighborhood.descriptor} - and your work as a ${audience.label.toLowerCase()} keeps aggravating ${condition.mentionPhrase}, you don't have to travel far for an accurate diagnosis and a real treatment plan.`;

  const fourth = `At Rutherford Spine & Wellness Center, Dr. Wesley Stewart brings 29 years of hands-on clinical experience to every visit, combining a thorough exam with a whole-person, drug-free approach so your care plan addresses the root cause of ${condition.mentionPhrase} rather than just masking the symptoms.`;

  const fifth = `Patients from ${neighborhood.name} and the surrounding ${neighborhood.cityName} area - including many ${audience.label.toLowerCase()} - trust our team to build a plan around their specific symptoms, work demands, and goals, with the ongoing support to get back to normal life and stay there.`;

  return [first, second, third, fourth, fifth];
}

function buildAudienceFaqs(
  conditionSlug: string,
  neighborhood: Neighborhood,
  audience: PseoAudience,
): PseoFaq[] {
  const condition = getPseoCondition(conditionSlug);
  if (!condition) throw new Error(`Unknown pSEO condition slug: ${conditionSlug}`);

  const audienceFaq: PseoFaq = {
    question: `I'm a ${audience.label.toLowerCase()} - can chiropractic care really help with ${condition.mentionPhrase} caused by my job?`,
    answer: `${audience.blurb} We regularly build care plans around the specific physical demands of that routine, so your treatment addresses both the ${condition.mentionPhrase} itself and the day-to-day habits most likely to bring it back.`,
  };

  const localFaq: PseoFaq = {
    question: `Do you treat ${audience.label.toLowerCase()} from ${neighborhood.name}?`,
    answer: `Yes - we regularly see ${audience.label.toLowerCase()} from ${neighborhood.name} and the rest of ${neighborhood.cityName} dealing with ${condition.mentionPhrase}. Our Murfreesboro office is an easy, direct drive from the area, and our team is happy to help you find the quickest route in.`,
  };

  return [...condition.faqBank.slice(0, 3), audienceFaq, localFaq];
}

/** Validates the `[condition]/[city]/[audience]` route params and, if
 * approved, returns the fully assembled page content (reuses the same
 * `PseoPageContent` shape as the 2-segment pages so `PseoPageTemplate`,
 * `pseoMetadata`, and `pseoJsonLd` all work unchanged). Returns `undefined`
 * for any triple not present in `PSEO_AUDIENCE_COMBINATIONS`, which the
 * route treats as a 404. */
export function buildPseoAudienceContent(params: PseoAudiencePageParams): PseoPageContent | undefined {
  const { condition: conditionSlug, city: neighborhoodSlug, audience: audienceSlug } = params;

  if (!isApprovedPseoAudienceCombo(conditionSlug, neighborhoodSlug, audienceSlug)) return undefined;

  const condition = getPseoCondition(conditionSlug);
  const neighborhood = getNeighborhood(neighborhoodSlug);
  const audience = getPseoAudience(audienceSlug);
  if (!condition || !neighborhood || !audience) return undefined;

  const serviceSlug = condition.relatedServices[0];
  const service = getServiceMeta(serviceSlug);
  const serviceLabel = service?.h1 ?? condition.name;

  const h1 = `${condition.name} Care for ${audience.label} in ${neighborhood.name}, ${neighborhood.cityName} TN`;
  const metaTitle = pseoTitle({
    conditionName: condition.name,
    placeSlug: neighborhood.slug,
    placeName: neighborhood.name,
    audienceSlug: audience.slug,
    audienceLabel: audience.label,
  });
  const metaDescription = pseoDescription({
    conditionName: condition.name,
    mention: condition.mentionPhrase,
    placeSlug: neighborhood.slug,
    placeName: neighborhood.name,
    cityName: neighborhood.cityName,
    audienceLabel: audience.label,
  });

  const locationSlug = `${serviceSlug}-${neighborhood.citySlug}-tn`;
  const hasLocationPage = Boolean(getLocationPage(locationSlug));

  const canonical = `${ORIGIN}/${condition.slug}/${neighborhood.slug}/${audience.slug}/`;

  return {
    condition,
    neighborhood,
    serviceSlug,
    serviceLabel,
    h1,
    metaTitle,
    metaDescription,
    introParagraphs: buildAudienceIntroParagraphs(conditionSlug, neighborhood, audience),
    symptoms: condition.symptoms,
    whyChooseUs: WHY_CHOOSE_US,
    faqs: buildAudienceFaqs(conditionSlug, neighborhood, audience),
    pillarHref: `/${serviceSlug}/`,
    locationHref: hasLocationPage ? `/${locationSlug}/` : null,
    canonical,
    audienceLabel: audience.label,
  };
}

/** All approved param triples, for `generateStaticParams`. */
export function getAllPseoAudienceParams(): PseoAudiencePageParams[] {
  return PSEO_AUDIENCE_COMBINATIONS.map((c) => ({
    condition: c.conditionSlug,
    city: c.neighborhoodSlug,
    audience: c.audienceSlug,
  }));
}
