import type { Metadata } from "next";
import type { JsonLd } from "./content-map";
import type { Condition } from "./conditions";
import { ORIGIN, DEFAULT_OG_IMAGE } from "./content-map";
import { ORGANIZATION_ID } from "./schema-ids";

/**
 * Builds Next.js `Metadata` for a dedicated condition page. Unlike the
 * migrated service/blog routes, condition pages are brand-new content, so
 * metadata is authored directly here instead of pulled from
 * `content-map.json`.
 */
export function conditionMetadata(condition: Condition): Metadata {
  const canonical = `${ORIGIN}/${condition.slug}/`;
  return {
    title: condition.metaTitle,
    description: condition.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: condition.metaTitle,
      description: condition.metaDescription,
      url: canonical,
      images: [DEFAULT_OG_IMAGE],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: condition.metaTitle,
      description: condition.metaDescription,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

/**
 * Builds JSON-LD (MedicalWebPage + FAQPage) for a condition page so search
 * engines understand the structured symptoms/treatment/FAQ content.
 */
export function conditionJsonLd(condition: Condition): JsonLd[] {
  const url = `${ORIGIN}/${condition.slug}/`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": `${url}#webpage`,
      url,
      name: condition.metaTitle,
      description: condition.metaDescription,
      about: {
        "@type": "MedicalCondition",
        name: condition.name,
        signOrSymptom: condition.symptoms,
        possibleTreatment: condition.treatments.map((t) => ({
          "@type": "MedicalTherapy",
          name: t.title,
          description: t.description,
        })),
      },
      mainContentOfPage: {
        "@type": "WebPageElement",
        cssSelector: "main",
      },
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: condition.faqs.map((faq) => ({
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
