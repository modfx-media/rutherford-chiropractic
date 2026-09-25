export type GoogleReview = {
  name: string;
  quote: string;
  relativeTime: string;
  rating: 5;
};

export type GoogleReviewsMeta = {
  placeId: string;
  rating: number | null;
  reviewCount: number | null;
  reviewsUrl: string;
};

/** Rutherford Spine & Wellness Center — this project only. */
export const googleReviewsMeta = {
  placeId: "ChIJp1t3Lnb4Y4gRIkxhiYl6rTY",
} as const;

/**
 * Real 5-star Google quotes for this listing only. Empty until Places
 * returns some — never invent names or copy.
 */
export const fallbackGoogleReviews: GoogleReview[] = [];
