/**
 * <UtilityHero> — shared dark hero for the 4 utility pages (`/contact-us/`,
 * `/financing/`, `/new-patients/`). Mirrors
 * `ServiceHero`/`ConditionHero`'s dark radial-glow hero (breadcrumb + H1 +
 * subtitle, no image) so these pages read as a natural extension of the
 * rest of the site rather than a bolted-on template.
 */

import Link from "next/link";
import { Reveal } from "../motion/primitives";
import { HeroBgImage } from "../HeroBgImage";
import { DEFAULT_HERO_BG } from "../../_lib/hero-images";

export function UtilityHero({
  eyebrow,
  h1,
  subtitle,
  bgImage,
}: {
  eyebrow: string;
  h1: string;
  subtitle?: string;
  bgImage?: string;
}) {
  return (
    <section className="surface-dark relative isolate overflow-hidden pt-14 pb-8 sm:pt-20 sm:pb-10 lg:pt-28 lg:pb-14">
      <HeroBgImage src={bgImage ?? DEFAULT_HERO_BG} alt="" />
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
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white">{h1}</span>
          </nav>

          <span className="eyebrow !text-[color:var(--color-brand-orange)] block">{eyebrow}</span>
          <h1 className="h-display mt-3 !text-white">{h1}</h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{subtitle}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
