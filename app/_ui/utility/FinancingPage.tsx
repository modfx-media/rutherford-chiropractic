/**
 * <FinancingPage> — body content for `/financing/`. Presents the three
 * flexible payment options offered by the clinic (In-House Financing,
 * Healthcare Financing of America, CareCredit), the shared "interest-free when paid within the
 * agreed term" note, and a CareCredit Apply-Now CTA linking to the live
 * provider portal.
 */

import Image from "next/image";
import { Reveal } from "../motion/primitives";
import { UtilityHero } from "./UtilityHero";
import { FinancingOptions } from "../FinancingOptions";

const CARECREDIT_APPLY_URL = "https://www.carecreditprovidercenter.com/portal/login";

export function FinancingPage() {
  return (
    <main>
      <UtilityHero
        eyebrow="Payment Options"
        h1="Financing"
        subtitle="Three flexible ways to pay for the care you need — every plan interest-free when paid within the agreed term."
        bgImage="/media/financing-banner.jpg"
        path="/financing/"
      />

      <section className="section-y bg-white">
        <div className="container-wide">
          <Reveal as="div" className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Ways to Pay</p>
            <h2 className="h-section mt-3">
              Care Should Be <span className="accent-serif">Accessible</span>
            </h2>
            <p className="mt-4 text-[color:var(--color-body)] leading-relaxed">
              At Rutherford Spine &amp; Wellness Center, we never want cost to
              be the reason someone puts off getting the care they need.
              Choose whichever plan fits your situation best.
            </p>
          </Reveal>

          <div className="mt-12">
            <FinancingOptions variant="full" />
          </div>

          <Reveal>
            <p className="mt-8 text-center text-sm text-[color:var(--color-muted)]">
              All plans are <strong>interest&#8209;free</strong> when paid
              within the agreed term.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y surface-muted">
        <div className="container-narrow text-center">
          <Reveal>
            <Image
              src="/media/carecredit.png"
              alt="CareCredit"
              width={707}
              height={148}
              className="mx-auto h-auto w-56"
            />
            <h2 className="h-section mt-8">
              Focus on your health and wellness. CareCredit makes it possible.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[color:var(--color-body)]">
              Get an easy way to pay over time with the CareCredit credit card.
            </p>
            <a
              href={CARECREDIT_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-8"
            >
              Apply Now
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
