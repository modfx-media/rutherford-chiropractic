"use client";

/**
 * <ServicePageTemplate> — shared layout for the 6 core-service pages
 * (`/chiropractic/`, `/spinal-decompression/`, `/neuropathy/`,
 * `/back-pain-relief/`, `/auto-injuries/`, `/sports-injuries/`).
 * Data-driven from a single `ServicePageData` object (see
 * `app/_lib/services.ts`) so every page shares identical
 * structure/styling/motion:
 *
 *   Hero (H1 + intro) -> body sections (verbatim copy + symptom/condition
 *   lists, alternating image/text where a photo exists) -> Why Choose Us ->
 *   What to Expect (process timeline) -> FAQ -> outro -> CTA
 *
 * All copy in the data module is VERBATIM from the live WordPress pages —
 * only the presentation here is new. Reuses the same design-system
 * primitives as `ConditionPageTemplate`/`DetailedServices`
 * (`Reveal`/`Stagger`/`StaggerItem`/`Parallax`, `surface-card`,
 * `hover-lift`, `icon-badge`, `eyebrow`/`h-display`/`h-section`, `btn-*`)
 * so these pages feel like a natural extension of the rest of the site.
 */

import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem, Parallax } from "../motion/primitives";
import { businessInfo } from "../nav";
import { ServiceIcon } from "./icons";
import { FaqAccordion } from "../conditions/FaqAccordion";
import { HeroBgImage } from "../HeroBgImage";
import { heroBgForService } from "../../_lib/hero-images";
import { BreadcrumbSchema } from "../BreadcrumbSchema";
import { getLocationsForService } from "../../_lib/locations";
import type { ServicePageData, ServiceSection as ServiceSectionData } from "../../_lib/services";

export function ServicePageTemplate({ data }: { data: ServicePageData }) {
  // The hero itself stays text-only (matches `ConditionHero`'s pattern) —
  // the hero photo instead illustrates the first body section so it never
  // goes unused, unless that section already defines its own image.
  const sections =
    data.sections.length > 0 && !data.sections[0].image
      ? [{ ...data.sections[0], image: data.heroImage }, ...data.sections.slice(1)]
      : data.sections;

  return (
    <main>
      <ServiceHero data={data} />
      {sections.map((section, i) => (
        <ServiceSection key={i} section={section} index={i} />
      ))}
      <WhyChooseSection data={data} />
      <ProcessSection data={data} />
      <ServiceFaqSection data={data} />
      <ServiceLocationsSection data={data} />
      {data.outro && <ServiceOutro text={data.outro} />}
      <ServiceCta data={data} />
    </main>
  );
}

function ServiceHero({ data }: { data: ServicePageData }) {
  return (
    <section className="surface-dark relative isolate overflow-hidden pt-14 pb-10 sm:pt-20 sm:pb-12 lg:pt-28 lg:pb-16">
      <HeroBgImage src={heroBgForService(data.slug)} alt="" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(45% 45% at 85% 15%, rgba(252,143,0,0.22) 0%, transparent 60%), radial-gradient(55% 55% at 5% 95%, rgba(0,75,153,0.5) 0%, transparent 70%)",
        }}
      />
      <div className="container-content relative">
        <Reveal as="div">
          <BreadcrumbSchema
            items={[
              { name: "Home", path: "/" },
              { name: "Services" },
              { name: data.h1, path: `/${data.slug}/` },
            ]}
          />
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span>Services</span>
            <span aria-hidden>/</span>
            <span className="text-white">{data.h1}</span>
          </nav>

          <span className="icon-badge h-16 w-16 bg-white/10 text-white">
            <ServiceIcon slug={data.slug} width={30} height={30} />
          </span>

          <span className="eyebrow mt-6 !text-[color:var(--color-brand-orange)] block">
            {data.eyebrow}
          </span>
          <h1 className="h-display mt-3 !text-white">{data.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            {data.heroParagraph}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact-us/" className="btn btn-primary-on-dark">
              Schedule Your Consultation
            </Link>
            <a
              href={businessInfo.phoneHref}
              className="btn btn-outline-navy !border-white/30 !text-white hover:!bg-white/10"
            >
              Call {businessInfo.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceList({ list }: { list: NonNullable<ServiceSectionData["list"]> }) {
  if (list.ordered) {
    return (
      <ol className="mt-6 grid gap-4">
        {list.items.map((item, i) => (
          <li
            key={item}
            className="hover-lift surface-card flex items-start gap-4 bg-white p-5"
          >
            <span className="icon-badge mt-0.5 h-7 w-7 shrink-0 text-sm font-bold">
              {i + 1}
            </span>
            <span className="text-sm leading-relaxed text-[color:var(--color-body)]">
              {item}
            </span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <Stagger as="ul" className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {list.items.map((item) => (
        <StaggerItem
          key={item}
          as="li"
          className="hover-lift surface-card flex items-start gap-3 bg-white p-4"
        >
          <span className="icon-badge mt-0.5 h-7 w-7 shrink-0">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <span className="text-sm font-medium leading-snug text-[color:var(--color-brand-navy)]">
            {item}
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function ServiceSection({
  section,
  index,
}: {
  section: ServiceSectionData;
  index: number;
}) {
  const flipped = index % 2 === 1;
  const bg = index % 2 === 0 ? "bg-white" : "surface-muted";

  // Sections with a photo get the alternating image/text split layout.
  if (section.image) {
    return (
      <section className={`section-y ${bg}`}>
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-10">
            <Reveal className={flipped ? "lg:order-2" : ""}>
              <Parallax strength={22} className="relative">
                <div
                  aria-hidden
                  className={`absolute inset-0 rounded-2xl border-2 border-[color:var(--color-brand-blue)]/10 ${
                    flipped ? "-translate-x-3 translate-y-3" : "translate-x-3 translate-y-3"
                  }`}
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-elevated)]">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Parallax>
            </Reveal>

            <div className={flipped ? "lg:order-1" : ""}>
              {section.heading && (
                <Reveal>
                  <h2 className="h-section">{section.heading}</h2>
                </Reveal>
              )}
              {section.paragraphs?.map((p, i) => (
                <Reveal key={i} delay={0.05 + i * 0.05}>
                  <p className="mt-5 text-[color:var(--color-body)] leading-relaxed">{p}</p>
                </Reveal>
              ))}
              {section.list && (
                <Reveal delay={0.1}>
                  {section.list.intro && (
                    <p className="mt-6 text-[color:var(--color-body)] leading-relaxed">
                      {section.list.intro}
                    </p>
                  )}
                  <ServiceList list={section.list} />
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Text-only sections (no photo) — centered heading, full-width body/list.
  return (
    <section className={`section-y ${bg}`}>
      <div className="container-content">
        <Reveal as="div" className={section.list && !section.paragraphs ? "text-center" : ""}>
          {section.heading && <h2 className="h-section">{section.heading}</h2>}
          {section.paragraphs?.map((p, i) => (
            <p key={i} className="mt-5 text-[color:var(--color-body)] leading-relaxed">
              {p}
            </p>
          ))}
        </Reveal>
        {section.list && (
          <>
            {section.list.intro && (
              <Reveal delay={0.05}>
                <p className="mt-5 text-[color:var(--color-body)] leading-relaxed">
                  {section.list.intro}
                </p>
              </Reveal>
            )}
            <ServiceList list={section.list} />
          </>
        )}
      </div>
    </section>
  );
}

function WhyChooseSection({ data }: { data: ServicePageData }) {
  return (
    <section className="section-y bg-white">
      <div className="container-content">
        <Reveal as="div" className="text-center">
          <span className="eyebrow">Why Rutherford</span>
          <h2 className="h-section mt-3">Why Patients Choose Us for {data.h1.replace(" Murfreesboro TN", "")}</h2>
        </Reveal>
        <Stagger as="ul" className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.whyChooseUs.map((point) => (
            <StaggerItem
              key={point}
              as="li"
              className="hover-lift surface-card flex items-start gap-3 bg-white p-5"
            >
              <span className="icon-badge mt-0.5 h-9 w-9 shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span className="text-[color:var(--color-body)] leading-relaxed">{point}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** "What to Expect" process timeline — a 4-step vertical stepper with a
 * connecting line, numbered icon-badges, and a staggered reveal per step.
 * Motion/structure pattern informed by the `timeline` motion-component
 * reference (spring-in step cards + accent connecting line), adapted to
 * this site's own brand palette and `Reveal`/`Stagger` primitives instead
 * of introducing a second, inconsistent animation system. */
function ProcessSection({ data }: { data: ServicePageData }) {
  return (
    <section className="section-y surface-muted">
      <div className="container-content">
        <Reveal as="div" className="text-center">
          <span className="eyebrow">What to Expect</span>
          <h2 className="h-section mt-3">Your First Visit, Step by Step</h2>
        </Reveal>
        <div className="relative mt-12">
          <span
            aria-hidden
            className="absolute left-5 top-2 bottom-2 hidden w-px bg-[color:var(--color-border)] sm:block"
          />
          <Stagger as="div" className="grid gap-8">
            {data.process.map((step, i) => (
              <StaggerItem key={step.title} as="article" className="relative flex gap-5 sm:gap-6">
                <span className="icon-badge relative z-10 h-11 w-11 shrink-0 bg-white text-base font-bold shadow-[var(--shadow-card)]">
                  {i + 1}
                </span>
                <div className="hover-lift surface-card flex-1 bg-white p-6">
                  <h3 className="text-lg font-bold text-[color:var(--color-brand-navy)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-body)]">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function ServiceFaqSection({ data }: { data: ServicePageData }) {
  return (
    <section className="section-y bg-white">
      <div className="container-content">
        <Reveal as="div" className="text-center">
          <span className="eyebrow">FAQs</span>
          <h2 className="h-section mt-3">
            Common Questions About {data.h1.replace(" Murfreesboro TN", "")}
          </h2>
        </Reveal>
        <div className="mt-10">
          <FaqAccordion faqs={data.faqs} />
        </div>
      </div>
    </section>
  );
}

function ServiceLocationsSection({ data }: { data: ServicePageData }) {
  const locations = getLocationsForService(data.slug);
  if (locations.length === 0) return null;

  return (
    <section className="section-y surface-muted">
      <div className="container-content">
        <Reveal as="div" className="text-center">
          <span className="eyebrow">Service Areas</span>
          <h2 className="h-section mt-3">
            {data.h1.replace(" Murfreesboro TN", "")} Near You
          </h2>
        </Reveal>
        <Stagger as="ul" className="mt-8 flex flex-wrap justify-center gap-3">
          {locations.map((loc) => (
            <StaggerItem key={loc.slug} as="li">
              <Link
                href={`/${loc.slug}/`}
                className="hover-lift inline-flex items-center rounded-full border border-[color:var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[color:var(--color-brand-navy)] transition-colors hover:border-[color:var(--color-brand-orange)]"
              >
                {loc.city}, TN
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ServiceOutro({ text }: { text: string }) {
  return (
    <section className="bg-white pb-16 lg:pb-20">
      <div className="container-content">
        <Reveal as="div" className="border-t border-[color:var(--color-border)] pt-10">
          <p className="text-[color:var(--color-body)] leading-relaxed">{text}</p>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCta({ data }: { data: ServicePageData }) {
  return (
    <section className="surface-dark section-y relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(45% 60% at 90% 20%, rgba(252,143,0,0.22) 0%, transparent 60%)",
        }}
      />
      <div className="container-content relative text-center">
        <Reveal as="div">
          <span className="eyebrow !text-[color:var(--color-brand-orange)]">Take the Next Step</span>
          <h2 className="h-section mt-3 !text-white">Ready to Get Started?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80 leading-relaxed">
            Schedule a consultation with Rutherford Spine &amp; Wellness
            Center in Murfreesboro, TN, and get a care plan built around your
            specific symptoms and goals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact-us/" className="btn btn-primary-on-dark">
              Schedule Your Consultation
            </Link>
            <a
              href={businessInfo.phoneHref}
              className="btn btn-outline-navy !border-white/30 !text-white hover:!bg-white/10"
            >
              Call {businessInfo.phone}
            </a>
          </div>

          {data.related.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-2 border-t border-white/10 pt-8">
              <span className="mr-2 text-sm text-white/50">Related services:</span>
              {data.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/20"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
