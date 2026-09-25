/**
 * <ReviewsSection> — homepage social-proof strip styled to visually match
 * a row of Google Business Profile reviews (colored G mark, gold stars,
 * quote body, reviewer initial avatar, "Posted on Google" caption).
 *
 * Live 5-star written reviews for this clinic's Place ID only. Auto-scrolls
 * as a seamless CSS `@keyframes` marquee (`.reviews-marquee` in
 * `globals.css`). Hides entirely when Places returns no qualifying quotes.
 */

import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import type { GoogleReview, GoogleReviewsMeta } from "@/lib/reviews";
import { businessInfo } from "../nav";
import { Reveal } from "../motion/primitives";

const AVATAR_COLORS = [
  "bg-[color:var(--color-brand-blue)]",
  "bg-[#EA4335]",
  "bg-[#34A853]",
  "bg-[color:var(--color-brand-orange)]",
  "bg-[#FBBC05]",
] as const;

export async function ReviewsSection() {
  const { reviews, meta } = await getDisplayedGoogleReviews();
  if (reviews.length === 0) return null;
  return <ReviewsView reviews={reviews} meta={meta} />;
}

function ReviewsView({
  reviews,
  meta,
}: {
  reviews: GoogleReview[];
  meta: GoogleReviewsMeta;
}) {
  const doubled = [...reviews, ...reviews];
  const reviewsUrl = meta.reviewsUrl || businessInfo.googleReviewsUrl;
  const ratingLabel =
    meta.rating != null ? meta.rating.toFixed(1) : null;
  const countLabel =
    meta.reviewCount != null
      ? `${meta.reviewCount.toLocaleString()} Google reviews`
      : "Google reviews";

  return (
    <section id="reviews" className="section-y bg-white relative overflow-hidden scroll-mt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-glow-blue" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-glow-orange" />
      </div>

      <div className="container-wide relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow">Patient Stories</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-section mt-3">
                What Our{" "}
                <span className="accent-serif">Patients</span> Say
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4 lg:justify-end">
              <div className="flex items-center gap-3">
                <GoogleGMark />
                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                    {ratingLabel ? (
                      <span className="ml-2 text-sm font-bold text-[color:var(--color-brand-navy)]">
                        {ratingLabel}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-xs text-[color:var(--color-muted)]">
                    Based on {countLabel}
                  </p>
                  <a
                    href={reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs font-semibold text-[color:var(--color-brand-blue)] underline-offset-2 hover:underline"
                  >
                    View all Google reviews
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="reviews-marquee-group mt-12 relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24"
        />

        <div className="reviews-marquee flex w-max gap-5 pr-5">
          {doubled.map((review, i) => (
            <ReviewCard
              key={`${review.name}-${i}`}
              review={review}
              avatarColor={AVATAR_COLORS[i % AVATAR_COLORS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  avatarColor,
}: {
  review: GoogleReview;
  avatarColor: string;
}) {
  const initial = review.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <article className="surface-card flex w-[320px] shrink-0 flex-col bg-white p-6 sm:w-[360px] sm:p-7">
      <div className="flex items-center gap-2">
        <GoogleGMark />
        <span className="text-sm font-semibold text-[color:var(--color-brand-navy)]">
          Google Review
        </span>
      </div>

      <div className="mt-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} />
        ))}
        <span className="ml-2 text-xs font-semibold text-[color:var(--color-muted)]">
          5.0
        </span>
      </div>

      <blockquote className="mt-4 text-sm leading-relaxed text-[color:var(--color-body)]">
        &ldquo;{review.quote}&rdquo;
      </blockquote>

      <div className="mt-auto flex items-center gap-3 pt-6">
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${avatarColor}`}
        >
          {initial}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-[color:var(--color-brand-navy)]">
            {review.name}
          </p>
          <p className="text-[11px] text-[color:var(--color-muted)]">
            Posted on Google
            {review.relativeTime ? ` \u00b7 ${review.relativeTime}` : ""}
          </p>
        </div>
      </div>
    </article>
  );
}

function GoogleGMark() {
  return (
    <svg width={20} height={20} viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19A23.936 23.936 0 0 0 0 24c0 3.87.93 7.55 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="#F5B301" aria-hidden>
      <path d="M12 2l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.77l-6.18 3.23L7 14.13l-5-4.87 6.91-1L12 2z" />
    </svg>
  );
}
