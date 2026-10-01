import Image from "next/image";
import Link from "next/link";
import type { SVGProps } from "react";
import { brandAssets } from "../_lib/theme";
import { businessInfo, primaryNav } from "./nav";
import { Stagger, StaggerItem } from "./motion/primitives";
import { MagneticButton } from "./motion/MagneticButton";
import {
  FacebookIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "./icons";

/**
 * Global site footer — premium two-tier layout.
 *
 * Palette is strictly the brand tokens defined in `app/globals.css`: a
 * darker-than-navy `surface-footer` base with soft brand-tinted glow
 * accents, white text, and blue/orange highlights only.
 *
 * Tier 1 — informational: logo + NAP/hours, then three link columns
 * (Services / Conditions / Quick Links) derived directly from `primaryNav`
 * so every header nav + dropdown target still gets an in-footer internal
 * link for crawlers, just organized instead of a flattened wall of text.
 *
 * Tier 2 — conversion: "See Our Reviews!" CTA card and a HIPAA trust
 * badge, each a `glass-panel` with an icon badge, entrance stagger, and a
 * magnetic CTA button.
 *
 * Bottom bar: © line + a smooth-scrolling back-to-top control.
 */

const servicesLinks =
  primaryNav.find((item) => item.label === "Services")?.children ?? [];
const conditionsLinks =
  primaryNav.find((item) => item.label === "Conditions")?.children ?? [];
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Areas We Serve", href: "/areas-we-serve/" },
  { label: "New Patients", href: "/new-patients/" },
  { label: "Financing", href: "/financing/" },
  { label: "Contact Us", href: "/contact-us/" },
  { label: "Blog", href: "/blog/" },
  { label: "Sitemap", href: "/sitemap/" },
];

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="surface-footer relative mt-auto overflow-hidden text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-glow-blue"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-16 h-96 w-96 rounded-full bg-glow-orange"
      />

      <div className="container-wide section-y-sm relative">
        {/* Tier 1 - NAP + organized nav columns */}
        <Stagger className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          <StaggerItem className="lg:col-span-4">
            <NapBlock />
          </StaggerItem>
          <StaggerItem className="lg:col-span-2">
            <LinkColumn heading="Services" links={servicesLinks} />
          </StaggerItem>
          <StaggerItem className="lg:col-span-3">
            <LinkColumn heading="Conditions" links={conditionsLinks} />
          </StaggerItem>
          <StaggerItem className="lg:col-span-3">
            <LinkColumn heading="Quick Links" links={quickLinks} />
          </StaggerItem>
        </Stagger>

        {/* Tier 2 - conversion cards */}
        <Stagger className="mt-14 grid grid-cols-1 gap-6 border-t border-white/10 pt-12 md:grid-cols-2">
          <StaggerItem>
            <ReviewsCard />
          </StaggerItem>
          <StaggerItem>
            <TrustBadge />
          </StaggerItem>
        </Stagger>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-wide flex flex-col items-center gap-4 py-6 text-xs md:flex-row md:justify-between">
          <p className="order-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-white/60 md:order-1 md:justify-start md:text-left">
            <span>
              &copy; {YEAR}{" "}
              Rutherford Spine &amp; Wellness Center. All rights reserved.
            </span>
            <span aria-hidden className="hidden sm:inline">
              &middot;
            </span>
            <a
              href="https://modfxmedia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Powered by{" "}
              <span className="font-semibold text-white/80">ModFXMedia</span>
            </a>
          </p>
          <BackToTop className="order-1 md:order-2" />
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */

function NapBlock() {
  return (
    <div>
      <Link href="/" aria-label="Rutherford Spine &amp; Wellness Center - Home" className="inline-block">
        <Image
          src={brandAssets.logo}
          alt="Rutherford Spine &amp; Wellness Center"
          width={brandAssets.logoWidth}
          height={brandAssets.logoHeight}
          // Client logo is on a transparent background; the wordmark is blue.
          // A subtle white pad keeps it legible on the dark footer surface.
          className="h-11 w-auto rounded-md bg-white px-3 py-1.5"
        />
      </Link>

      <address className="mt-7 not-italic">
        <ul className="space-y-4">
          <li className="group/row flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-[color:var(--color-brand-orange)] transition-transform duration-300 group-hover/row:scale-110">
              <PhoneIcon size={16} />
            </span>
            <a
              href={businessInfo.phoneHref}
              className="pt-1.5 text-base font-semibold text-white transition-colors hover:text-[color:var(--color-brand-orange)]"
            >
              {businessInfo.phone}
            </a>
          </li>
          <li className="group/row flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-[color:var(--color-brand-orange)] transition-transform duration-300 group-hover/row:scale-110">
              <FaxIcon />
            </span>
            <span className="pt-1.5 text-sm text-white/80">
              <span className="text-white/50">Fax:</span> {businessInfo.fax}
            </span>
          </li>
          <li className="group/row flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-[color:var(--color-brand-orange)] transition-transform duration-300 group-hover/row:scale-110">
              <MailIcon size={16} />
            </span>
            <a
              href={businessInfo.emailHref}
              className="break-all pt-1.5 text-sm text-white/80 transition-colors hover:text-[color:var(--color-brand-orange)]"
            >
              {businessInfo.email}
            </a>
          </li>
          <li className="group/row flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-[color:var(--color-brand-orange)] transition-transform duration-300 group-hover/row:scale-110">
              <MapPinIcon size={16} />
            </span>
            <a
              href={businessInfo.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pt-1.5 text-sm text-white/80 transition-colors hover:text-[color:var(--color-brand-orange)]"
            >
              {businessInfo.address.line1}
              <br />
              {businessInfo.address.line2}
            </a>
          </li>
        </ul>
      </address>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
        <dl className="space-y-1.5 text-sm text-white/80">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-brand-orange)]">
            Hours
          </p>
          <div className="flex justify-between gap-4 pt-1">
            <dt>Mon &ndash; Thu</dt>
            <dd className="text-white text-right">8:00am &ndash; 6:00pm</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Friday</dt>
            <dd className="text-white">8:00am &ndash; 12:00pm</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Sat &ndash; Sun</dt>
            <dd className="text-white/60">Closed</dd>
          </div>
        </dl>

        <a
          href={businessInfo.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Rutherford Spine &amp; Wellness on Facebook"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--color-brand-orange)]"
        >
          <FacebookIcon size={18} />
        </a>
      </div>
    </div>
  );
}

function LinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-brand-orange)]">
        {heading}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReviewsCard() {
  return (
    <CtaCard
      icon={<StarIcon />}
      eyebrow="Patient Feedback"
      title="See Our Reviews!"
      body="Real experiences from Murfreesboro-area patients who found relief through chiropractic, spinal decompression, and neuropathy care."
      href={businessInfo.googleReviewsUrl}
      cta="Read Reviews"
      variant="btn-outline-orange"
      external
    />
  );
}

/**
 * Compact card used for the footer CTA slots. The variant maps to a
 * button utility declared in `app/globals.css` so the palette stays locked.
 */
function CtaCard(props: {
  icon: React.ReactNode;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  href: string;
  cta: string;
  variant: "btn-primary-on-dark" | "btn-outline-orange";
  external?: boolean;
}) {
  return (
    <div className="glass-panel group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-[color:var(--color-brand-orange)] transition-transform duration-300 group-hover:scale-110">
        {props.icon}
      </span>
      <span className="eyebrow !text-brand-orange mt-4">{props.eyebrow}</span>
      <h3 className="mt-2 text-2xl font-bold leading-tight text-white">
        {props.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{props.body}</p>
      <div className="mt-auto pt-6">
        <MagneticButton href={props.href} external={props.external} className={`btn ${props.variant}`}>
          {props.cta}
        </MagneticButton>
      </div>
    </div>
  );
}

/**
 * Trust badge. Uses only brand palette; when a real compliance badge
 * asset is provided we can drop it into `public/brand/` and swap the
 * `<Image>` element in without touching layout.
 */
function TrustBadge() {
  return (
    <div className="glass-panel group flex h-full flex-col items-center justify-center rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/25">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-blue transition-transform duration-300 group-hover:scale-110">
        <ShieldIcon />
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-white">
        HIPAA Compliant
      </p>
      <p className="mt-1 text-xs text-white/60">
        Secure &amp; confidential patient care
      </p>
    </div>
  );
}

/** Smooth-scrolling back-to-top control (relies on the global `html { scroll-behavior: smooth }`). */
function BackToTop({ className = "" }: { className?: string }) {
  return (
    <a
      href="#"
      aria-label="Back to top"
      className={`group inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[color:var(--color-brand-orange)] ${className}`}
    >
      <ArrowUpIcon />
    </a>
  );
}

/* ---------------------------------------------------------------------------
 * Small inline icons local to the footer.
 * ------------------------------------------------------------------------- */

function iconBase({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
  };
}

function ShieldIcon() {
  return (
    <svg {...iconBase({ size: 26 })}>
      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function FaxIcon() {
  return (
    <svg {...iconBase({ size: 16 })}>
      <path d="M6 9V3h12v6" />
      <rect x="4" y="9" width="16" height="10" rx="2" />
      <path d="M8 15h8" />
      <path d="M8 12h5" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg {...iconBase({})}>
      <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7Z" />
    </svg>
  );
}

function LeafIcon_REMOVED_placeholder() {
  return null;
}

function ArrowUpIcon() {
  return (
    <svg {...iconBase({ size: 16, strokeWidth: 2.25 })}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}
