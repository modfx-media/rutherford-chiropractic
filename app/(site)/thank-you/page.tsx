import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ORIGIN } from "../../_lib/content-map";
import { CheckIcon, PhoneIcon } from "../../_ui/icons";
import { businessInfo } from "../../_ui/nav";

// The contact form (GoHighLevel) redirects the parent window here after a
// successful submit. Keep this URL stable: /thank-you/

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Your consultation request was received. The Rutherford Spine & Wellness Center team in Murfreesboro will be in touch shortly.",
  robots: { index: false, follow: true },
  alternates: { canonical: `${ORIGIN}/thank-you/` },
};

const STEPS = [
  {
    n: "01",
    title: "We review your request",
    body: "A member of our Murfreesboro team reads what you sent and gets it to the right person.",
  },
  {
    n: "02",
    title: "We confirm a time",
    body: "Expect a call or email shortly so we can lock in a visit that works for you.",
  },
  {
    n: "03",
    title: "You come in",
    body: "We’ll greet you at the office and walk you through your first visit.",
  },
];

export default function ThankYouPage() {
  return (
    <main>
      <Script id="google-ads-lead-conversion" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('event', 'conversion', {
            'send_to': 'AW-10997508084/-T96CIje3qIdEPTPgvwo',
            'value': 1.0,
            'currency': 'USD'
          });
        `}
      </Script>
      <section className="surface-dark relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(42% 55% at 85% 0%, rgba(252,143,0,0.28) 0%, transparent 62%), radial-gradient(50% 60% at 8% 100%, rgba(0,75,153,0.55) 0%, transparent 70%)",
          }}
        />
        <div className="container-content relative py-16 text-center sm:py-24">
          <div className="mx-auto grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full bg-[color:var(--color-brand-orange)] text-white shadow-[0_16px_40px_-12px_rgba(252,143,0,0.8)]">
            <CheckIcon size={32} strokeWidth={2.4} />
          </div>
          <p className="eyebrow mt-8 !text-[color:var(--color-brand-orange)]">
            Request received
          </p>
          <h1 className="h-display mt-4 !text-white">
            Thank <span className="accent-serif !text-[color:var(--color-brand-orange)]">you</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            Your consultation request is with our Murfreesboro team. We’ll
            reach out shortly to confirm a time that works for you.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-content py-14 sm:py-20">
          <h2 className="h-section text-center">What happens next</h2>
          <ol className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n} className="surface-card bg-white p-6 sm:p-7">
                <span className="accent-serif text-2xl !text-[color:var(--color-brand-orange)]">
                  {step.n}
                </span>
                <h3 className="mt-3 text-lg font-bold text-[color:var(--color-brand-navy)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-body)]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="surface-card mx-auto mt-8 flex max-w-5xl flex-col items-start gap-6 bg-[color:var(--color-brand-navy)] p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">
                Prefer to talk now?
              </p>
              <p className="mt-2 text-lg font-bold">
                Call the office and we’ll help you from here.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Mon–Thu 8:00am–6:00pm · Friday 8:00am–12:00pm
                <br />
                {businessInfo.address.line1}, {businessInfo.address.line2}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:shrink-0">
              <a href={businessInfo.phoneHref} className="btn btn-primary-on-dark">
                <PhoneIcon size={16} />
                Call {businessInfo.phone}
              </a>
              <Link
                href="/"
                className="btn border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
