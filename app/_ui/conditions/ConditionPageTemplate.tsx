"use client";

/**
 * <ConditionPageTemplate> — shared layout for every dedicated condition
 * page (`/sciatica/`, `/whiplash/`, etc.). Data-driven from a single
 * `Condition` object (see `app/_lib/conditions.ts`) so every condition page
 * shares identical structure, styling, typography, and motion:
 *
 *   Hero -> Overview -> Symptoms -> Causes -> Treatment Options ->
 *   Benefits -> FAQs -> CTA
 *
 * Reuses the same design-system primitives as the homepage sections
 * (`Reveal`/`Stagger`/`StaggerItem`, `surface-card`, `hover-lift`,
 * `icon-badge`, `bg-glow-*`, `eyebrow`/`h-section`, `btn-*`) so these new
 * pages feel like a natural extension of the redesigned homepage.
 */

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "../motion/primitives";
import { ConditionIcon } from "./icons";
import { FaqAccordion } from "./FaqAccordion";
import { HeroBgImage } from "../HeroBgImage";
import { heroBgForCondition } from "../../_lib/hero-images";
import type { Condition } from "../../_lib/conditions";
import { businessInfo } from "../nav";
import { BreadcrumbSchema } from "../BreadcrumbSchema";

export function ConditionPageTemplate({ condition }: { condition: Condition }) {
  return (
    <main>
      <ConditionHero condition={condition} />
      <OverviewSection condition={condition} />
      <SymptomsSection condition={condition} />
      <CausesSection condition={condition} />
      <TreatmentSection condition={condition} />
      <BenefitsSection condition={condition} />
      <FaqSection condition={condition} />
      <ConditionCta condition={condition} />
    </main>
  );
}

function ConditionHero({ condition }: { condition: Condition }) {
  return (
    <section className="surface-dark relative isolate overflow-hidden pt-14 pb-10 sm:pt-20 sm:pb-12 lg:pt-28 lg:pb-16">
      <HeroBgImage src={heroBgForCondition(condition.slug)} alt="" />
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
              { name: "Conditions" },
              { name: condition.name, path: `/${condition.slug}/` },
            ]}
          />
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <span aria-hidden>/</span>
            <span>Conditions</span>
            <span aria-hidden>/</span>
            <span className="text-white">{condition.name}</span>
          </nav>

          <span className="icon-badge h-16 w-16 bg-white/10 text-white">
            <ConditionIcon slug={condition.slug} width={30} height={30} />
          </span>

          <span className="eyebrow mt-6 !text-[color:var(--color-brand-orange)] block">
            {condition.heroEyebrow}
          </span>
          <h1 className="h-display mt-3 !text-white">{condition.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            {condition.heroDescription}
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

function OverviewSection({ condition }: { condition: Condition }) {
  return (
    <section className="section-y bg-white">
      <div className="container-content">
        <Reveal as="div">
          <span className="eyebrow">Overview</span>
          <h2 className="h-section mt-3">Understanding {condition.name}</h2>
          <div className="mt-6 space-y-5">
            {condition.overview.map((paragraph, i) => (
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

function SymptomsSection({ condition }: { condition: Condition }) {
  return (
    <section className="section-y surface-muted">
      <div className="container-wide">
        <Reveal as="div" className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Symptoms</span>
          <h2 className="h-section mt-3">Signs of {condition.name}</h2>
        </Reveal>
        <Stagger as="ul" className="mx-auto mt-10 grid grid-cols-1 max-w-4xl gap-4 sm:grid-cols-2">
          {condition.symptoms.map((symptom) => (
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

function CausesSection({ condition }: { condition: Condition }) {
  return (
    <section className="section-y bg-white">
      <div className="container-content">
        <Reveal as="div">
          <span className="eyebrow">Causes</span>
          <h2 className="h-section mt-3">What Contributes to {condition.name}</h2>
        </Reveal>
        <Stagger as="ul" className="mt-8 grid gap-4">
          {condition.causes.map((cause) => (
            <StaggerItem
              as="li"
              key={cause}
              className="hover-lift flex items-start gap-3 rounded-xl border border-[color:var(--color-border)] p-4"
            >
              <span
                aria-hidden
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[color:var(--color-brand-orange)]"
              />
              <span className="text-[color:var(--color-body)] leading-relaxed">{cause}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function TreatmentSection({ condition }: { condition: Condition }) {
  return (
    <section className="section-y surface-muted">
      <div className="container-wide">
        <Reveal as="div" className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Treatment Options</span>
          <h2 className="h-section mt-3">How We Treat {condition.name}</h2>
          <p className="mt-4 text-[color:var(--color-body)] leading-relaxed">
            Every plan is built around a whole-person, non-invasive approach
            combining these therapies to fit your specific situation.
          </p>
        </Reveal>
        <Stagger as="ul" className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {condition.treatments.map((treatment) => (
            <StaggerItem
              as="li"
              key={treatment.title}
              className="hover-lift surface-card bg-white p-6"
            >
              <h3 className="text-lg font-bold text-[color:var(--color-brand-navy)]">
                {treatment.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-body)]">
                {treatment.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function BenefitsSection({ condition }: { condition: Condition }) {
  return (
    <section className="section-y bg-white">
      <div className="container-content">
        <Reveal as="div" className="text-center">
          <span className="eyebrow">Benefits of Treatment</span>
          <h2 className="h-section mt-3">Why Patients Choose Rutherford</h2>
        </Reveal>
        <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {condition.benefits.map((benefit) => (
            <StaggerItem
              as="li"
              key={benefit}
              className="hover-lift flex items-start gap-3 rounded-xl border border-[color:var(--color-border)] p-4"
            >
              <span className="icon-badge mt-0.5 h-7 w-7 shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span className="text-[color:var(--color-body)] leading-relaxed">{benefit}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FaqSection({ condition }: { condition: Condition }) {
  return (
    <section className="section-y surface-muted">
      <div className="container-content">
        <Reveal as="div" className="text-center">
          <span className="eyebrow">FAQs</span>
          <h2 className="h-section mt-3">Common Questions About {condition.name}</h2>
        </Reveal>
        <div className="mt-10">
          <FaqAccordion faqs={condition.faqs} />
        </div>
      </div>
    </section>
  );
}

function ConditionCta({ condition }: { condition: Condition }) {
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
            Ready to Find Relief From {condition.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80 leading-relaxed">
            Schedule a consultation with Rutherford Spine &amp; Wellness
            Center in Murfreesboro, TN, and get a care plan built around your
            specific symptoms and goals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact-us/" className="btn btn-primary-on-dark">
              Schedule Your Consultation
            </Link>
            <Link href={condition.relatedService.href} className="btn btn-outline-navy !border-white/30 !text-white hover:!bg-white/10">
              Explore {condition.relatedService.label}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
