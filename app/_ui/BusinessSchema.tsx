/**
 * Business-wide JSON-LD for local SEO.
 *
 * Emitted once from the root layout: one Chiropractor (a LocalBusiness)
 * and one WebSite. Review quotes come from the same cached Places fetch
 * as the reviews UI. There is no site search, so WebSite has no SearchAction.
 */

import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { ORGANIZATION_ID, SCHEMA_ORIGIN, WEBSITE_ID } from "../_lib/schema-ids";
import { businessInfo } from "./nav";

export async function BusinessSchema() {
  const { reviews, meta } = await getDisplayedGoogleReviews();

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Chiropractor", "LocalBusiness"],
    "@id": ORGANIZATION_ID,
    name: "Rutherford Spine & Wellness Center",
    alternateName: "Rutherford Spine and Wellness",
    url: `${SCHEMA_ORIGIN}/`,
    telephone: "+16152170097",
    faxNumber: "+16158480038",
    email: businessInfo.email,
    image: `${SCHEMA_ORIGIN}/brand/rutherford-logo.png`,
    logo: `${SCHEMA_ORIGIN}/brand/rutherford-logo.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address.line1,
      addressLocality: "Murfreesboro",
      addressRegion: "TN",
      postalCode: "37129",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.8586059,
      longitude: -86.4065423,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday"],
        opens: "08:00",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "00:00",
        closes: "00:00",
      },
    ],
    sameAs: [businessInfo.facebookUrl, businessInfo.googleReviewsUrl],
  };

  if (meta.rating != null && meta.reviewCount != null) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(meta.rating),
      reviewCount: String(meta.reviewCount),
    };
  }

  if (reviews.length > 0) {
    schema.review = reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      reviewBody: review.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    }));
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SCHEMA_ORIGIN}/`,
    name: "Rutherford Spine & Wellness Center",
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
