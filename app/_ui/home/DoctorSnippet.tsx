import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "../motion/primitives";
import { CalendarIcon, PhoneIcon } from "../icons";
import { businessInfo } from "../nav";

/**
 * DoctorSnippet — "Meet Your Chiropractor" homepage introduction card.
 *
 * Bio facts (29 years, "Whole-Person Approach", Murfreesboro) are the same
 * verified facts already used verbatim in `About.tsx`; the copy here is a
 * condensed, distinct blurb sized for a snippet card rather than a
 * duplicate of the full About paragraphs.
 */

const CREDENTIALS = ["Doctor of Chiropractic", "Whole-Person Approach", "29+ Years in Murfreesboro"];

export function DoctorSnippet() {
  return (
    <section className="section-y-sm bg-[color:var(--color-surface-muted)]" aria-label="Meet your chiropractor">
      <div className="container-content">
        <div className="surface-card overflow-hidden bg-white p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-14">
            {/* Headshot */}
            <Reveal as="div" className="mx-auto lg:mx-0">
              <div className="relative mx-auto h-48 w-48 shrink-0 sm:h-56 sm:w-56 lg:h-64 lg:w-64">
                <Image
                  src="/media/dr-wesley-stewart.jpeg"
                  alt="Dr. Wesley Stewart, DC"
                  fill
                  sizes="(min-width: 1024px) 256px, (min-width: 640px) 224px, 192px"
                  className="rounded-full object-cover shadow-[var(--shadow-elevated)] ring-4 ring-white"
                />
                <span className="absolute -bottom-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-[color:var(--color-brand-orange)] px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-[var(--shadow-card)] whitespace-nowrap">
                  29+ Years
                </span>
              </div>
            </Reveal>

            {/* Copy */}
            <div className="min-w-0 text-center lg:text-left lg:self-center">
              <Reveal delay={0.05} as="div">
                <span className="eyebrow">Your Provider</span>
                <h2 className="h-section mt-2 !text-2xl sm:!text-3xl">
                  Meet Dr. Wesley Stewart, DC
                </h2>
              </Reveal>

              <Reveal delay={0.1} as="div">
                <Stagger className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {CREDENTIALS.map((c) => (
                    <StaggerItem
                      key={c}
                      className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] px-3 py-1 text-xs font-semibold text-[color:var(--color-brand-navy)]"
                    >
                      {c}
                    </StaggerItem>
                  ))}
                </Stagger>
              </Reveal>

              <Reveal delay={0.15} as="div">
                <p className="mt-4 text-[color:var(--color-body)] leading-relaxed">
                  For 29 years, Dr. Stewart has helped Murfreesboro-area
                  patients get back to the lives they love. His compassionate
                  &ldquo;Whole-Person Approach&rdquo; looks beyond symptoms to
                  find and correct the hidden causes of pain - helping
                  you heal naturally, without relying on medication or
                  surgery.
                </p>
              </Reveal>

              <Reveal delay={0.2} as="div">
                <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link href="/contact-us/" className="btn btn-primary">
                    <CalendarIcon size={16} />
                    Book with Dr. Stewart
                  </Link>
                  <a href={businessInfo.phoneHref} className="btn btn-outline-navy">
                    <PhoneIcon size={16} />
                    Call {businessInfo.phone}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
