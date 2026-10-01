import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="section-y bg-white">
      <div className="container-content">
        <span className="eyebrow">404</span>
        <h1 className="h-section mt-3">Page not found</h1>
        <p className="mt-4 max-w-xl text-[color:var(--color-body)] leading-relaxed">
          The page you requested is not available. Return home or contact the clinic to get the care you need.
        </p>
        <p className="mt-6">
          <Link
            href="/"
            className="font-medium text-[color:var(--color-brand-orange)] underline-offset-4 hover:underline"
          >
            Back to homepage
          </Link>
        </p>
      </div>
    </main>
  );
}
