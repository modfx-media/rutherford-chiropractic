# GMB 5-star reviews — agency kit

Reusable setup for **every** Next.js client site. Google does not ship an official review pixel. This is the drop-in equivalent: one Places API key, each client’s Place ID, and a hard **5-star \+ written comment** filter.

Copy the fetch \+ filter \+ honesty rules. Restyle to that site. Do not copy another client’s branding.

---

## Contract (same on every project)

| Item | Rule |
| :---- | :---- |
| Source | Google Places API (New) Place Details |
| Filter | `rating === 5` **and** non-empty review text |
| Hidden | 4-star and below, rating-only (no comment), nameless reviews |
| Badge / `aggregateRating` | Real Google overall rating \+ total review count (all stars) |
| JSON-LD `review[]` | Only the 5-star quotes actually rendered on the page |
| Fabrication | Never. No per-city fake reviews. Hide the section if the list is empty |
| API key | `GOOGLE_PLACES_API_KEY` — **server-only**, never `NEXT_PUBLIC_` |
| Place | `GOOGLE_PLACE_ID` per client (hardcoded Place ID fallback is OK) |
| Cache | 24 hours (`revalidate: 86400`), tag `google-reviews` |
| Cap | Google returns at most **5 most-relevant** reviews. The 5-star filter runs on that set |

---

## Env

```
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_ID=
```

- Set both on Vercel (Production \+ Preview) and in `.env.local`.  
- Do not commit the key. `.gitignore`: `.env*` with `!.env.example`.  
- Redeploy after adding env vars.

---

## One-time: Google Cloud (agency)

1. Open a billed Google Cloud project.  
2. Enable **Places API (New)**.  
3. Create an API key restricted to Places API (New).  
4. Reuse that same key on every client as `GOOGLE_PLACES_API_KEY`.

Per client you only change `GOOGLE_PLACE_ID`.

---

## Per client: Place ID

1. Google Maps → the business listing → **Share**.  
2. Copy the link. The Place ID looks like `ChIJ…`.  
3. Or use [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder).  
4. Confirm it is the **correct listing** before shipping.  
5. Store it as `GOOGLE_PLACE_ID` and as `googleReviewsMeta.placeId` fallback.

---

## How the fetch works

```
GET https://places.googleapis.com/v1/places/{PLACE_ID}
Headers:
  X-Goog-Api-Key: GOOGLE_PLACES_API_KEY
  X-Goog-FieldMask: id,rating,userRatingCount,googleMapsUri,reviews
```

Then keep only reviews where `rating === 5` and `text.text` is non-empty.

### Field mapping

| Google field | Site field |
| :---- | :---- |
| `reviews[].rating` | `rating` (keep only `=== 5`) |
| `reviews[].text.text` | `quote` |
| `reviews[].authorAttribution.displayName` | `name` |
| `reviews[].relativePublishTimeDescription` | `relativeTime` |
| `rating` | badge / `aggregateRating.ratingValue` |
| `userRatingCount` | badge / `aggregateRating.reviewCount` |
| `googleMapsUri` | “View all Google reviews” href |

Skip empty text or empty display name.

---

## Files to add on a client site

| File | Role |
| :---- | :---- |
| `lib/reviews.ts` | Types \+ **real** fallback 5-star quotes for that business (or `[]`) |
| `lib/google-reviews.ts` | `getDisplayedGoogleReviews()` — fetch, cache, 5-star filter |
| Server wrapper next to testimonials | Async Server Component that passes `{ reviews, meta }` into the existing UI |

Fallback quotes in `lib/reviews.ts` must be real 5-star Google reviews for **that** business. If none are on file, leave the array empty and hide the section until Places returns some.

Templates live in the Cursor skill:

`C:\Users\Pc\.cursor\skills\gmb-five-star-reviews\templates\`

- `reviews.ts`  
- `google-reviews.ts`  
- `GoogleReviews.tsx`

---

## Wire the UI

Keep the current site’s testimonials design. Motion stays in a client component; the parent **must** be an async Server Component:

```
export async function GoogleReviews() {
  const { reviews, meta } = await getDisplayedGoogleReviews();
  if (reviews.length === 0) return null;
  return <TestimonialsView reviews={reviews} meta={meta} />;
}
```

Required on the UI:

- Google attribution (mark or the word “Google”)  
- Link to `meta.reviewsUrl` (“View all Google reviews”)  
- Badge uses `meta.rating` \+ `meta.reviewCount` (not the 5-star subset count)

---

## JSON-LD

`Organization` / `LocalBusiness` schema must `await getDisplayedGoogleReviews()`. Wrap the function in React `cache()` so layout \+ the section share one fetch per request.

- `aggregateRating.ratingValue` / `reviewCount` → `meta` (real Google totals)  
- `review` array → the visible 5-star quotes only

Do not report a 5.0 aggregate unless Google’s overall rating is actually 5.0.

---

## Install checklist

- [ ] Place ID confirmed  
- [ ] `GOOGLE_PLACES_API_KEY` on Vercel and `.env.local`  
- [ ] `GOOGLE_PLACE_ID` set (or hardcoded fallback in `lib/reviews.ts`)  
- [ ] Templates copied into `lib/` \+ server wrapper  
- [ ] Existing testimonials UI consumes `getDisplayedGoogleReviews()`  
- [ ] Filter is `rating === 5` with text (not `>= 4.5`)  
- [ ] Schema aggregate \= live Google totals; `review[]` \= visible 5-stars  
- [ ] Empty list → section returns `null`  
- [ ] README env documented  
- [ ] Browser check: homepage \+ any other page that shows reviews

---

## Hard limit

Place Details returns **at most 5 reviews**, Google’s “most relevant” sort. There is no `minRating` on individual reviews.

If a client’s top-5 mix includes a 4-star, the site shows fewer cards. That is correct.

To list **every** 5-star review on a profile, use the Business Profile API as the location owner (OAuth refresh token, account id, location id, paginated `reviews.list`). Only do that if the client explicitly needs the full corpus — it is per-client OAuth, not a drop-in key.

---

## Honesty (non-negotiable)

- Shared real review pool on programmatic city pages — never generate city-specific fake Google reviews.  
- Truncated Google text (trailing `…`) is OK. Rewriting quotes is not.  
- Do not write reviews to a database. 24h fetch cache is enough.  
- If the key is missing, the request fails, or no 5-star text reviews come back: use real fallback quotes or hide the section.

## Do not

- Use `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`  
- Filter `>= 4` or `>= 4.5` unless the contract is explicitly changed  
- Invent reviewer names or quotes  
- Put a different review set on each city page  
- Embed a Maps iframe and call it a review wall  
- Use Elfsight / Trustindex unless the client already owns that widget

---

## Caching notes

- `fetch(..., { next: { revalidate: 86400, tags: ["google-reviews"] } })`  
- `getDisplayedGoogleReviews` wrapped in React `cache()`  
- No database persist

---

## Living Light (reference install)

This repo already has the pattern wired:

- `lib/reviews.ts` — fallback quotes \+ Place ID  
- `lib/google-reviews.ts` — live fetch \+ 5-star filter  
- `components/home/Testimonials.tsx` — server wrapper  
- `components/home/TestimonialsCarousel.tsx` — UI  
- Schema in `lib/structured-data.ts` \+ `app/layout.tsx`

Turn live reviews on by setting `GOOGLE_PLACES_API_KEY` (Place ID is already in `lib/reviews.ts`).

