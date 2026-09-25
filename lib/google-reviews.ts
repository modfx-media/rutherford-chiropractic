import { cache } from "react";
import {
  fallbackGoogleReviews,
  googleReviewsMeta,
  type GoogleReview,
  type GoogleReviewsMeta,
} from "./reviews";

const PLACE_ID =
  process.env.GOOGLE_PLACE_ID?.trim() || googleReviewsMeta.placeId;

const FIELD_MASK =
  "id,displayName,rating,userRatingCount,googleMapsUri,reviews";

type PlacesReview = {
  rating?: number;
  text?: { text?: string };
  authorAttribution?: { displayName?: string };
  relativePublishTimeDescription?: string;
};

type PlaceDetails = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

function isThisClinic(displayName: string | undefined): boolean {
  const name = (displayName ?? "").toLowerCase();
  return name.includes("rutherford") && name.includes("spine");
}

function emptyResult(
  extras: Partial<GoogleReviewsMeta> = {},
): { reviews: GoogleReview[]; meta: GoogleReviewsMeta } {
  return {
    reviews: fallbackGoogleReviews,
    meta: {
      placeId: PLACE_ID,
      rating: null,
      reviewCount: null,
      reviewsUrl: extras.reviewsUrl ?? "",
      ...extras,
    },
  };
}

async function fetchPlaceDetails(): Promise<PlaceDetails | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey || !PLACE_ID) return null;

  const res = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      next: { revalidate: 86400, tags: ["google-reviews"] },
    },
  );

  if (!res.ok) return null;
  return (await res.json()) as PlaceDetails;
}

function toDisplayedReviews(reviews: PlacesReview[] | undefined): GoogleReview[] {
  if (!reviews?.length) return [];
  return reviews.flatMap((review) => {
    const quote = review.text?.text?.trim() ?? "";
    const name = review.authorAttribution?.displayName?.trim() ?? "";
    if (review.rating !== 5 || !quote || !name) return [];
    return [
      {
        name,
        quote,
        relativeTime: review.relativePublishTimeDescription?.trim() ?? "",
        rating: 5 as const,
      },
    ];
  });
}

export const getDisplayedGoogleReviews = cache(async (): Promise<{
  reviews: GoogleReview[];
  meta: GoogleReviewsMeta;
}> => {
  const place = await fetchPlaceDetails();
  if (!place) return emptyResult();

  if (!isThisClinic(place.displayName?.text)) {
    return emptyResult();
  }

  const live = toDisplayedReviews(place.reviews);
  const reviews = live.length > 0 ? live : fallbackGoogleReviews;

  return {
    reviews,
    meta: {
      placeId: PLACE_ID,
      rating: typeof place.rating === "number" ? place.rating : null,
      reviewCount:
        typeof place.userRatingCount === "number"
          ? place.userRatingCount
          : null,
      reviewsUrl: place.googleMapsUri ?? "",
    },
  };
});
