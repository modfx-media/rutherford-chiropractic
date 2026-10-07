import type { Metadata } from "next";
import type { JsonLd } from "../content-map";
import { businessInfo } from "../../_ui/nav";
import { ORIGIN, DEFAULT_OG_IMAGE } from "../content-map";
import { PSEO_CONDITIONS, getPseoCondition, type PseoFaq } from "./conditions";
import { NEIGHBORHOODS, getNeighborhood, type Neighborhood } from "./neighborhoods";
import { PSEO_COMBINATIONS, isApprovedPseoCombo } from "./combinations";
import { getCustomPseoContent } from "./city-content";
import { getLocationPage, getServiceMeta } from "../locations";

/**
 * Assembly layer for the `/{condition}/{neighborhood}/` pSEO pages. Reads
 * the condition + neighborhood datasets, validates the pair against
 * `PSEO_COMBINATIONS`, and builds every string the page/route needs
 * (headings, metadata, JSON-LD, intro copy, FAQs, internal links).
 *
 * Intro-paragraph assembly deliberately combines modular sentence
 * fragments (condition lead + neighborhood descriptor + a fixed trust/brand
 * sentence + a closing sentence) rather than hand-writing full paragraphs
 * per page — this keeps every page's copy unique (no two pages share a
 * condition+neighborhood pair) while staying maintainable at scale.
 */

export type PseoPageParams = { condition: string; city: string };

export type PseoPageContent = {
  condition: ReturnType<typeof getPseoCondition> & object;
  neighborhood: Neighborhood;
  serviceSlug: string;
  serviceLabel: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  introParagraphs: string[];
  symptoms: string[];
  whyChooseUs: string[];
  faqs: PseoFaq[];
  pillarHref: string;
  locationHref: string | null;
  canonical: string;
  /** Only set for `/{condition}/{city}/{audience}/` pages (see
   * `audience-content.ts`); lets `PseoPageTemplate` show the audience angle
   * in the hero/section headings without a separate template. */
  audienceLabel?: string;
};

const WHY_CHOOSE_US = [
  "29 years of hands-on clinical experience treating patients throughout Rutherford County and Middle Tennessee",
  "A whole-person, non-invasive, drug-free approach built around your specific symptoms",
  "Personalized treatment plans designed with you by Dr. Wesley Stewart and our care team",
  "A convenient Murfreesboro location with flexible scheduling for patients across the region",
];

function buildIntroParagraphs(conditionSlug: string, neighborhood: Neighborhood): string[] {
  const condition = getPseoCondition(conditionSlug);
  if (!condition) throw new Error(`Unknown pSEO condition slug: ${conditionSlug}`);

  const first = condition.introLead;

  const second = `If you live or work in ${neighborhood.name}, ${neighborhood.cityName} - including ${neighborhood.descriptor} - you don't have to travel far to get an accurate diagnosis and a real treatment plan for ${condition.mentionPhrase}.`;

  const third = `At Rutherford Spine & Wellness Center, Dr. Wesley Stewart brings 29 years of hands-on clinical experience to every visit, combining a thorough exam with a whole-person, drug-free approach so your care plan addresses the root cause of ${condition.mentionPhrase} rather than just masking the symptoms.`;

  const fourth = `Patients from ${neighborhood.name} and the surrounding ${neighborhood.cityName} area trust our team to build a plan around their specific symptoms, activity level, and goals - with the ongoing support to get back to normal life and stay there.`;

  return [first, second, third, fourth];
}

function buildFaqs(conditionSlug: string, neighborhood: Neighborhood): PseoFaq[] {
  const condition = getPseoCondition(conditionSlug);
  if (!condition) throw new Error(`Unknown pSEO condition slug: ${conditionSlug}`);

  const localFaq: PseoFaq = {
    question: `Do you treat patients from ${neighborhood.name}?`,
    answer: `Yes - we regularly see patients from ${neighborhood.name} and the rest of ${neighborhood.cityName}. Our Murfreesboro office is an easy, direct drive from the area, and our team is happy to help you find the quickest route in.`,
  };

  return [...condition.faqBank.slice(0, 4), localFaq];
}

/** Validates the `[condition]/[city]` route params and, if approved,
 * returns the fully assembled page content. Returns `undefined` for any
 * pair not present in `PSEO_COMBINATIONS`, which the route treats as a 404. */
export function buildPseoContent(params: PseoPageParams): PseoPageContent | undefined {
  const { condition: conditionSlug, city: neighborhoodSlug } = params;

  if (!isApprovedPseoCombo(conditionSlug, neighborhoodSlug)) return undefined;

  const condition = getPseoCondition(conditionSlug);
  const neighborhood = getNeighborhood(neighborhoodSlug);
  if (!condition || !neighborhood) return undefined;

  const custom = getCustomPseoContent(conditionSlug, neighborhoodSlug);

  const serviceSlug = condition.relatedServices[0];
  const service = getServiceMeta(serviceSlug);
  const serviceLabel = service?.h1 ?? condition.name;

  const h1 = `${condition.name} Relief in ${neighborhood.name}, ${neighborhood.cityName} TN`;
  const metaTitle = `${condition.name} Treatment in ${neighborhood.name}, ${neighborhood.cityName} TN | Rutherford Spine & Wellness`;
  const metaDescription = `Struggling with ${condition.mentionPhrase} in ${neighborhood.name}, ${neighborhood.cityName}? Dr. Wesley Stewart offers non-invasive, drug-free treatment plans backed by 29 years of experience. Schedule your consultation today.`;

  const locationSlug = `${serviceSlug}-${neighborhood.citySlug}-tn`;
  const hasLocationPage = Boolean(getLocationPage(locationSlug));

  const canonical = `${ORIGIN}/${condition.slug}/${neighborhood.slug}/`;

  return {
    condition,
    neighborhood,
    serviceSlug,
    serviceLabel,
    h1,
    metaTitle,
    metaDescription,
    introParagraphs: custom?.introParagraphs ?? buildIntroParagraphs(conditionSlug, neighborhood),
    symptoms: custom?.symptoms ?? condition.symptoms,
    whyChooseUs: WHY_CHOOSE_US,
    faqs: custom?.faqs ?? buildFaqs(conditionSlug, neighborhood),
    pillarHref: `/${serviceSlug}/`,
    locationHref: hasLocationPage ? `/${locationSlug}/` : null,
    canonical,
  };
}

/**
 * Audience pages are a full cartesian product of condition × city × job.
 * Neighborhood pages without a hand-written `city-content.ts` entry are
 * assembled from shared sentence fragments. Both are low-value programmatic
 * URLs: noindex them and keep them out of the sitemap. Hand-written
 * condition × neighborhood pages stay indexable.
 */
export function isIndexablePseoPage(content: PseoPageContent): boolean {
  if (content.audienceLabel) return false;
  return Boolean(getCustomPseoContent(content.condition.slug, content.neighborhood.slug));
}

export function enforcePseoIndexing(meta: Metadata, content: PseoPageContent): Metadata {
  if (isIndexablePseoPage(content)) return meta;
  return { ...meta, robots: { index: false, follow: true } };
}

export function pseoMetadata(content: PseoPageContent): Metadata {
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: content.canonical },
    robots: isIndexablePseoPage(content) ? undefined : { index: false, follow: true },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: content.canonical,
      images: [DEFAULT_OG_IMAGE],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export function pseoJsonLd(content: PseoPageContent): JsonLd[] {
  const url = content.canonical;
  return [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": `${url}#webpage`,
      url,
      name: content.metaTitle,
      description: content.metaDescription,
      about: {
        "@type": "MedicalCondition",
        name: content.condition.name,
        signOrSymptom: content.symptoms,
      },
      mainContentOfPage: {
        "@type": "WebPageElement",
        cssSelector: "main",
      },
      publisher: {
        "@type": "MedicalBusiness",
        name: "Rutherford Spine & Wellness Center",
        telephone: businessInfo.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: businessInfo.address.line1,
          addressLocality: "Murfreesboro",
          addressRegion: "TN",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: content.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];
}

/** All approved param combinations, for `generateStaticParams`. */
export function getAllPseoParams(): PseoPageParams[] {
  return PSEO_COMBINATIONS.map((c) => ({ condition: c.conditionSlug, city: c.neighborhoodSlug }));
}

// Re-exported for convenience so route/template files only need one import.
export { PSEO_CONDITIONS, NEIGHBORHOODS };
