"use client";

/**
 * <PseoPageTemplate> — shared layout for every programmatic
 * `/{condition}/{neighborhood}/` page. Mirrors the structure, styling, and
 * motion primitives of `app/_ui/conditions/ConditionPageTemplate.tsx`
 * (Hero -> Intro -> Symptoms -> Why Choose Us -> FAQs -> Internal Links ->
 * CTA) so these pages feel like a natural extension of the existing
 * condition pages rather than a bolted-on template.
 */

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "../motion/primitives";
import { ServiceIcon } from "../services/icons";
import { FaqAccordion } from "../conditions/FaqAccordion";
import { HeroBgImage } from "../HeroBgImage";
import { heroBgForService } from "../../_lib/hero-images";
import type { PseoPageContent } from "../../_lib/pseo/content";
import { businessInfo } from "../nav";
import { BreadcrumbSchema } from "../BreadcrumbSchema";

export function PseoPageTemplate({ content }: { content: PseoPageContent }) {
  return (
    <main>
      <PseoHero content={content} />
      <IntroSection content={content} />
      <SymptomsSection content={content} />
      <WhyChooseUsSection content={content} />
      <FaqSection content={content} />
      <InternalLinksSection content={content} />
      <PseoCta content={content} />
    </main>
  );
}

function PseoHero({ content }: { content: PseoPageContent }) {
  const { condition, neighborhood } = content;
  return (
    <section className="surface-dark relative isolate overflow-hidden pt-14 pb-10 sm:pt-20 sm:pb-12 lg:pt-28 lg:pb-16">
      <HeroBgImage src={heroBgForService(content.serviceSlug)} alt="" />
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
              { name: content.serviceLabel, path: content.pillarHref },
              {
                name: `${neighborhood.name}, ${neighborhood.cityName}${content.audienceLabel ? ` – ${content.audienceLabel}` : ""}`,
                path: new URL(content.canonical).pathname,
              },
            ]}
          />
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <span aria-hidden>/</span>
            <Link href={content.pillarHref} className="hover:text-white">{content.serviceLabel}</Link>
            <span aria-hidden>/</span>
            <span className="text-white">
              {neighborhood.name}, {neighborhood.cityName}
              {content.audienceLabel ? ` – ${content.audienceLabel}` : ""}
            </span>
          </nav>

          <span className="icon-badge h-16 w-16 bg-white/10 text-white">
            <ServiceIcon slug={content.serviceSlug} width={30} height={30} />
          </span>

          <span className="eyebrow mt-6 !text-[color:var(--color-brand-orange)] block">
            {neighborhood.name}, {neighborhood.cityName} TN
          </span>
          <h1 className="h-display mt-3 !text-white">{content.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            {condition.introLead}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact-us/" className="btn btn-primary-on-dark">
              Schedule Your Consultation
            </Link>
            <a href={businessInfo.phoneHref} className="btn btn-outline-navy !border-white/30 !text-white hover:!bg-white/10">
              Call {businessInfo.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function IntroSection({ content }: { content: PseoPageContent }) {
  return (
    <section className="section-y bg-white">
      <div className="container-content">
        <Reveal as="div">
          <span className="eyebrow">Overview</span>
          <h2 className="h-section mt-3">
            Treating {content.condition.name} in {content.neighborhood.name}
            {content.audienceLabel ? ` for ${content.audienceLabel}` : ""}
          </h2>
          <div className="mt-6 space-y-5">
            {content.introParagraphs.map((paragraph, i) => (
              <p key={i} className="text-[color:var(--color-body)] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SymptomsSection({ content }: { content: PseoPageContent }) {
  return (
    <section className="section-y surface-muted">
      <div className="container-wide">
        <Reveal as="div" className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Symptoms</span>
          <h2 className="h-section mt-3">Signs of {content.condition.name}</h2>
        </Reveal>
        <Stagger as="ul" className="mx-auto mt-10 grid grid-cols-1 max-w-4xl gap-4 sm:grid-cols-2">
          {content.symptoms.map((symptom) => (
            <StaggerItem
              as="li"
              key={symptom}
              className="hover-lift surface-card flex items-start gap-3 bg-white p-5"
            >
              <span className="icon-badge mt-0.5 h-7 w-7 shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span className="text-sm font-medium leading-snug text-[color:var(--color-brand-navy)]">
                {symptom}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function WhyChooseUsSection({ content }: { content: PseoPageContent }) {
  return (
    <section className="section-y bg-white">
      <div className="container-content">
        <Reveal as="div" className="text-center">
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="h-section mt-3">
            Why {content.neighborhood.name} Patients Choose Rutherford
          </h2>
        </Reveal>
        <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {content.whyChooseUs.map((point) => (
            <StaggerItem
              as="li"
              key={point}
              className="hover-lift flex items-start gap-3 rounded-xl border border-[color:var(--color-border)] p-4"
            >
              <span className="icon-badge mt-0.5 h-7 w-7 shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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

function FaqSection({ content }: { content: PseoPageContent }) {
  return (
    <section className="section-y surface-muted">
      <div className="container-content">
        <Reveal as="div" className="text-center">
          <span className="eyebrow">FAQs</span>
          <h2 className="h-section mt-3">
            Common Questions About {content.condition.name} in {content.neighborhood.name}
            {content.audienceLabel ? ` for ${content.audienceLabel}` : ""}
          </h2>
        </Reveal>
        <div className="mt-10">
          <FaqAccordion faqs={content.faqs} />
        </div>
      </div>
    </section>
  );
}

function InternalLinksSection({ content }: { content: PseoPageContent }) {
  return (
    <section className="section-y bg-white">
      <div className="container-content">
        <Reveal as="div" className="flex flex-wrap gap-3">
          <Link href={content.pillarHref} className="btn btn-outline-navy">
            Learn More About {content.serviceLabel}
          </Link>
          {content.locationHref ? (
            <Link href={content.locationHref} className="btn btn-outline-navy">
              {content.serviceLabel} in {content.neighborhood.cityName}, TN
            </Link>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

function PseoCta({ content }: { content: PseoPageContent }) {
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
          <h2 className="h-section mt-3 !text-white">
            Ready to Find Relief From {content.condition.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80 leading-relaxed">
            Schedule a consultation with Rutherford Spine &amp; Wellness
            Center and get a care plan built around your specific symptoms
            and goals - convenient for patients throughout {content.neighborhood.cityName}, TN.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact-us/" className="btn btn-primary-on-dark">
              Schedule Your Consultation
            </Link>
            <Link href={content.pillarHref} className="btn btn-outline-navy !border-white/30 !text-white hover:!bg-white/10">
              Explore {content.serviceLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
