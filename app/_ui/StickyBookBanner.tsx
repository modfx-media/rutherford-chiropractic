"use client";

/**
 * <StickyBookBanner> — persistent "Book Now" bar pinned to the bottom of
 * the viewport, rendered globally (in `app/layout.tsx`) so the booking CTA
 * is always reachable while scrolling, on every page.
 *
 * Behavior:
 *   - Hidden until the user scrolls past roughly one hero-height (so it
 *     doesn't fight a page's own hero CTAs for attention immediately).
 *   - Dismissible via a close button; once dismissed it stays hidden for
 *     the rest of the session (component state only — reappears on a
 *     fresh page load, which is fine for this use case).
 *   - Hidden entirely on the Contact Us page and the post-submit thank-you
 *     page — those pages already are the booking destination, so the
 *     floating CTA would just be redundant clutter.
 *   - Hidden once the footer scrolls into view, via `IntersectionObserver`
 *     watching `#site-footer` (see `Footer.tsx`) — the footer has its own
 *     phone/booking links, so the floating bar would otherwise overlap it.
 *   - Respects the iOS safe-area inset so it never sits under the home
 *     indicator bar.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { businessInfo } from "./nav";
import { CalendarIcon, CloseIcon, PhoneIcon } from "./icons";

export function StickyBookBanner() {
  const pathname = usePathname();
  const [pastThreshold, setPastThreshold] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  // Reset the dismissal once the route changes, so a dismissal on one page
  // doesn't hide the banner forever on the next page — this is the
  // "adjust state when a prop changes" pattern (set state during render,
  // not inside an effect), so it doesn't trigger an extra render pass.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setDismissed(false);
  }

  const onContactPage =
    (pathname?.startsWith("/contact-us") ?? false) ||
    (pathname?.startsWith("/thank-you") ?? false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const threshold = Math.min(window.innerHeight * 0.65, 520);
      setPastThreshold(window.scrollY > threshold);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  const visible =
    pastThreshold && !dismissed && !onContactPage && !footerVisible;

  if (onContactPage) return null;

  return (
    <div
      role="region"
      aria-label="Book an appointment"
      aria-hidden={!visible}
      className={`fixed inset-x-0 z-40 flex justify-center pl-4 pr-40 transition-all duration-300 ease-out sm:pr-32 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
      }`}
      style={{ bottom: "max(env(safe-area-inset-bottom, 0px), 1rem)" }}
    >
      {/* Capped width + extra right-side clearance (not centered/full-bleed) so
          it never sits under the Knock Knock chat launcher parked bottom-right. */}
      <div className="flex w-full max-w-md items-center gap-2.5 rounded-full border border-white/10 bg-[color:var(--color-brand-navy)]/95 px-3 py-2 shadow-[0_10px_30px_-8px_rgba(1,17,73,0.45)] backdrop-blur-md sm:max-w-lg sm:gap-3 sm:px-4">
        <a
          href={businessInfo.phoneHref}
          aria-label={`Call ${businessInfo.phone}`}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <PhoneIcon size={17} />
        </a>

        <div className="hidden min-w-0 flex-1 sm:block">
          <p className="truncate text-[11px] font-bold uppercase tracking-[0.1em] text-white/60">
            Now Accepting New Patients
          </p>
          <p className="truncate text-sm font-semibold text-white">Murfreesboro, TN</p>
        </div>
        <p className="hidden min-w-0 flex-1 truncate text-sm font-semibold text-white min-[420px]:block sm:hidden">
          New Patients Welcome
        </p>

        <Link
          href="/contact-us/"
          tabIndex={visible ? 0 : -1}
          className="btn btn-primary-on-dark btn-sm shrink-0 !bg-[color:var(--color-brand-orange)] !border-[color:var(--color-brand-orange)] !text-white hover:!bg-[color:var(--color-brand-orange-700)] hover:!border-[color:var(--color-brand-orange-700)]"
        >
          <CalendarIcon size={15} />
          Book Now
        </Link>

        <button
          type="button"
          aria-label="Dismiss booking banner"
          tabIndex={visible ? 0 : -1}
          onClick={() => setDismissed(true)}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <CloseIcon size={15} />
        </button>
      </div>
    </div>
  );
}
