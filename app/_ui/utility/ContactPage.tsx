"use client";

/**
 * <ContactPage> — body content for `/contact-us/`. Live page structure:
 * NAP block (phone/address/email) + hours, then "Fill Out The Form Below
 * To Schedule Your Consultation" heading above an embedded lead-capture
 * form. The live form IS a third-party iframe widget
 * (`api.leadconnectorhq.com/widget/form/iCpqftU99Vpw3Z0yzIlU` — GoHighLevel)
 * with these exact fields: First Name, Last Name, Email *, Phone *, "How
 * committed are you to fixing your pain TODAY?" (dropdown), an SMS-consent
 * checkbox, and a Submit button. Re-embedding the same live widget (rather
 * than reconstructing a fake form with no backend to submit to) guarantees
 * identical fields/labels and a real working submission.
 *
 * A Google Maps embed is added (none of this exact map existed as a
 * distinct element on the live contact page, but the site's global
 * `LocationMap` component already establishes this exact no-API-key
 * `output=embed` pattern from `businessInfo`, so it's reused here for
 * "embed a map" per the task).
 *
 * The embedded GHL widget itself displays a "Claim Your $47 New Patient
 * Special Now!" banner baked into its (cross-origin, third-party) markup -
 * that text can't be safely stripped from our side without a fragile
 * pixel-crop hack that would break at different viewport widths (verified:
 * the banner's rendered height varies ~57-171px depending on iframe width).
 * Instead, a dedicated "$47 New Patient Special" section was added above the
 * form (own on-brand styling, `#schedule-form` anchor CTA) so the offer gets
 * proper standalone billing instead of being buried inside the third-party
 * widget's own header line.
 */

import type { SVGProps } from "react";
import type { GoogleReview } from "@/lib/reviews";
import { businessInfo } from "../nav";
import { MailIcon, MapPinIcon, PhoneIcon } from "../icons";
import { Reveal } from "../motion/primitives";
import { UtilityHero } from "./UtilityHero";
import { FinancingOptions } from "../FinancingOptions";

const GHL_FORM_SRC = "https://api.leadconnectorhq.com/widget/form/iCpqftU99Vpw3Z0yzIlU";

const MAP_QUERY = encodeURIComponent(
  `${businessInfo.address.line1}, ${businessInfo.address.line2}`
);
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${MAP_QUERY}&z=15&output=embed`;

const NAP_ROWS: Array<{
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
  label: string;
  value: React.ReactNode;
  href?: string;
  external?: boolean;
}> = [
  {
    icon: PhoneIcon,
    label: "Phone",
    value: businessInfo.phone,
    href: businessInfo.phoneHref,
  },
  {
    icon: PhoneIcon,
    label: "Fax",
    value: businessInfo.fax,
  },
  {
    icon: MapPinIcon,
    label: "Address",
    value: (
      <>
        {businessInfo.address.line1}
        <br />
        {businessInfo.address.line2}
      </>
    ),
    href: businessInfo.address.mapsUrl,
    external: true,
  },
  {
    icon: MailIcon,
    label: "Email",
    value: businessInfo.email,
    href: businessInfo.emailHref,
  },
  {
    icon: ClockIcon,
    label: "Hours",
    value: (
      <>
        Mon &ndash; Thu: 8:00am &ndash; 6:00pm
        <br />
        Friday: 8:00am &ndash; 12:00pm
        <br />
        Sat &ndash; Sun: Closed
      </>
    ),
  },
];

export function ContactPage({ review }: { review?: GoogleReview | null }) {
  return (
    <main>
      <UtilityHero
        eyebrow="Get In Touch"
        h1="Contact Us"
        subtitle="Have a question or ready to schedule your visit? Reach out any way that works for you - our Murfreesboro team is here to help."
        bgImage="/media/contact-us-banner.avif"
      />

      <section id="schedule-form" className="section-y bg-white">
        <div className="container-wide">
          {/* Single merged section: 3 info/offer/review cards STACKED on
              the left, and the full GHL lead form on the right. On smaller
              screens everything falls back to a single column. */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10 lg:items-start">
            {/* Left column — three stacked cards. */}
            <div className="flex flex-col gap-5">
              <Reveal>
                <div className="surface-card relative flex flex-col overflow-hidden bg-[color:var(--color-brand-navy)] p-7 text-white">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                      background:
                        "radial-gradient(60% 60% at 90% 10%, rgba(252,143,0,0.4) 0%, transparent 65%)",
                    }}
                  />
                  <div className="relative flex flex-col">
                    <p className="eyebrow">Limited-Time Offer</p>
                    <h3 className="mt-2 text-2xl font-bold !text-white">
                      $47 New Patient Special
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/85">
                      For a limited time, new patients can get started with
                      Rutherford Spine &amp; Wellness Center for just $47. Fill
                      out the form or call our Murfreesboro office to claim
                      your appointment and take the first step toward lasting
                      relief.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={businessInfo.phoneHref}
                        className="btn btn-primary-on-dark sm:flex-1 justify-center"
                      >
                        Call {businessInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              {review ? (
                <Reveal delay={0.05}>
                  <GoogleTestimonialCard review={review} />
                </Reveal>
              ) : null}

              <Reveal delay={0.1}>
                <FinancingOptions variant="compact" />
              </Reveal>

              <Reveal delay={0.15}>
                <div className="surface-card flex flex-col bg-white p-7">
                  <p className="eyebrow">Visit Us</p>
                  <h3 className="mt-2 text-2xl font-bold text-[color:var(--color-brand-navy)]">
                    Office Information
                  </h3>
                  <ul className="mt-6 space-y-5">
                    {NAP_ROWS.map(({ icon: Icon, label, value, href, external }) => {
                      const body = (
                        <div className="flex items-start gap-3">
                          <span className="icon-badge mt-0.5 h-9 w-9 shrink-0">
                            <Icon width={16} height={16} />
                          </span>
                          <div className="min-w-0">
                            <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                              {label}
                            </dt>
                            <dd className="mt-0.5 break-words text-sm font-medium leading-snug text-[color:var(--color-brand-navy)]">
                              {value}
                            </dd>
                          </div>
                        </div>
                      );
                      return (
                        <li key={label}>
                          {href ? (
                            <a
                              href={href}
                              target={external ? "_blank" : undefined}
                              rel={external ? "noopener noreferrer" : undefined}
                              className="block hover:text-[color:var(--color-brand-blue)]"
                            >
                              {body}
                            </a>
                          ) : (
                            body
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Right column — full lead form. */}
            <Reveal delay={0.05}>
              <div className="relative">
                {/* Soft brand glows behind the form panel for the same
                    layered feel as the hero / other big CTAs. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-10 -z-10 h-56 w-56 rounded-full bg-glow-orange"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-10 bottom-8 -z-10 h-64 w-64 rounded-full bg-glow-blue"
                />

                <p className="eyebrow">Book Your Visit</p>
                <h2 className="h-section mt-3">
                  Schedule Your{" "}
                  <span className="accent-serif">Consultation</span>
                </h2>
                <p className="mt-4 max-w-lg text-[color:var(--color-body)] leading-relaxed">
                  Tell us a bit about yourself and how we can help. Our
                  Murfreesboro team will be in touch shortly to confirm a
                  time that works for you.
                </p>

                {/* Trust bar — reassures visitors before they enter contact
                    info. Uses the same iconography as the Office Info card
                    for visual continuity. */}
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-[color:var(--color-brand-navy)]">
                  <li className="flex items-center gap-2">
                    <ShieldCheckIcon />
                    <span>100% Non&#8209;invasive</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ClockIcon width={15} height={15} />
                    <span>Same&#8209;day replies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LockIcon />
                    <span>Private &amp; secure</span>
                  </li>
                </ul>

                <div className="relative mt-8 overflow-hidden rounded-[2rem] bg-white shadow-[var(--shadow-elevated)] ring-1 ring-[color:var(--color-border)]">
                  {/* Gradient top edge — matches brand accent, gives the
                      third-party iframe a properly branded "frame". */}
                  <div className="h-1.5 bg-gradient-to-r from-[color:var(--color-brand-orange)] via-[color:var(--color-brand-orange)]/70 to-[color:var(--color-brand-blue)]" />

                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--color-border)] px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="icon-badge h-10 w-10">
                        <MailIcon width={16} height={16} />
                      </span>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                          Lead Form
                        </p>
                        <p className="text-sm font-bold text-[color:var(--color-brand-navy)]">
                          Claim Your $47 New Patient Special
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[color:var(--color-brand-orange)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--color-brand-orange)]">
                      Limited Time
                    </span>
                  </div>

                  <div className="p-2 sm:p-3">
                    <iframe
                      src={GHL_FORM_SRC}
                      title="Website Lead Form"
                      style={{
                        width: "100%",
                        height: "780px",
                        border: "none",
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y surface-muted">
        <div className="container-content">
          <Reveal>
            <h2 className="h-section">Find Our Office</h2>
            <div className="glass-panel-light mt-6 rounded-[2rem] p-3 shadow-[var(--shadow-elevated)]">
              <div className="h-[420px] w-full overflow-hidden rounded-[1.5rem] lg:h-[520px]">
                <iframe
                  src={MAP_EMBED_SRC}
                  title="Map showing the location of Rutherford Spine & Wellness Center"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="text-[color:var(--color-brand-orange)]"
    >
      <path d="M12 22s8-4.5 8-11.5V5l-8-3-8 3v5.5C4 17.5 12 22 12 22Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="text-[color:var(--color-brand-orange)]"
    >
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function GoogleTestimonialCard({ review }: { review: GoogleReview }) {
  const initial = review.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="surface-card flex h-full flex-col bg-white p-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GoogleGMark />
          <span className="text-sm font-semibold text-[color:var(--color-brand-navy)]">
            Google Review
          </span>
        </div>
        <span className="text-[11px] font-medium text-[color:var(--color-muted)]">
          Posted on Google
        </span>
      </div>

      <div className="mt-4 flex items-center gap-1">
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
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--color-brand-blue)] text-sm font-bold text-white">
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
    </div>
  );
}

function GoogleGMark() {
  // Multi-color Google "G" mark, sized to sit next to a small caption.
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
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="#F5B301"
      aria-hidden
    >
      <path d="M12 2l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.77l-6.18 3.23L7 14.13l-5-4.87 6.91-1L12 2z" />
    </svg>
  );
}
