/**
 * Business-wide JSON-LD for local SEO.
 *
 * Emitted once from the root layout so every route ships with the same
 * MedicalClinic signal. MedicalClinic is a subtype of LocalBusiness, so
 * Google/Bing treat this as both. Live Google totals + visible 5-star
 * quotes come from the same cached Places fetch as the reviews UI.
 */

import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { businessInfo } from "./nav";

export async function BusinessSchema() {
  const { reviews, meta } = await getDisplayedGoogleReviews();

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": "https://rutherfordchiropractic.com/#organization",
    name: "Rutherford Spine & Wellness Center",
    alternateName: "Rutherford Spine and Wellness",
    url: "https://rutherfordchiropractic.com/",
    telephone: "+16152170097",
    email: businessInfo.email,
    image: "https://rutherfordchiropractic.com/brand/rutherford-logo.png",
    logo: "https://rutherfordchiropractic.com/brand/rutherford-logo.png",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1139 NW Broad St #103",
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
    ],
    sameAs: [businessInfo.facebookUrl],
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

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
