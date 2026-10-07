import type { Metadata } from "next";
import Link from "next/link";
import { ORIGIN, ROUTES, type RouteEntry } from "../../_lib/content-map";
import { CONDITIONS } from "../../_lib/conditions";
import { UtilityHero } from "../../_ui/utility/UtilityHero";
import { Reveal } from "../../_ui/motion/primitives";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /sitemap/
// A human-readable directory of the site, grouped by section — the HTML
// counterpart to the machine-readable `/sitemap.xml` (see `app/sitemap.ts`).
// The 1,500 pSEO condition/city/audience pages are covered in bulk via a
// link to `/areas-we-serve/` (which already lists all of them individually)
// rather than duplicating that same huge link list on a second page.

const fallbackMetadata: Metadata = {
  title: "Sitemap | Rutherford Spine & Wellness",
  description:
    "Browse every page on the Rutherford Spine & Wellness Center website, organized by section - services, conditions, locations, blog, and more.",
  alternates: { canonical: `${ORIGIN}/sitemap/` },
};

export async function generateMetadata() {
  return metadataWithCMS("/sitemap/", fallbackMetadata);
}

function displayTitle(route: RouteEntry): string {
  return route.meta?.title ?? route.path;
}

function section(category: RouteEntry["category"]): RouteEntry[] {
  return ROUTES.filter((r) => r.category === category);
}

export default function Page() {
  const mainPages = [...section("home"), ...section("utility"), ...section("other")];
  const services = section("core-service");
  const locations = section("location-landing");
  const blogIndex = section("blog-index");
  const blogPosts = section("blog-post");

  return (
    <main>
      <UtilityHero
        eyebrow="Site Directory"
        h1="Sitemap"
        subtitle="A full directory of every page on our website, organized by section. Looking for machines-readable data instead? See our XML sitemap."
        path="/sitemap/"
      />

      <section className="section-y bg-white">
        <div className="container-content space-y-14">
          <Reveal as="div">
            <span className="eyebrow">Main Pages</span>
            <h2 className="h-section mt-3">Main Pages</h2>
            <RouteList routes={mainPages} />
          </Reveal>

          <Reveal as="div">
            <span className="eyebrow">Services</span>
            <h2 className="h-section mt-3">Services</h2>
            <RouteList routes={services} />
          </Reveal>

          <Reveal as="div">
            <span className="eyebrow">Conditions</span>
            <h2 className="h-section mt-3">Conditions We Treat</h2>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {CONDITIONS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}/`}
                    className="text-[color:var(--color-body)] underline-offset-4 hover:text-[color:var(--color-brand-orange)] hover:underline"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="div">
            <span className="eyebrow">Locations</span>
            <h2 className="h-section mt-3">Location Pages</h2>
            <RouteList routes={locations} />
          </Reveal>

          <Reveal as="div">
            <span className="eyebrow">Local Care Pages</span>
            <h2 className="h-section mt-3">Condition &amp; City Care Pages</h2>
            <p className="mt-4 max-w-2xl text-[color:var(--color-body)] leading-relaxed">
              We also maintain over 1,500 condition-specific pages covering every city and
              patient type we serve. Browse the full directory on our{" "}
              <Link
                href="/areas-we-serve/"
                className="font-medium text-[color:var(--color-brand-orange)] underline-offset-4 hover:underline"
              >
                Areas We Serve
              </Link>{" "}
              page.
            </p>
          </Reveal>

          <Reveal as="div">
            <span className="eyebrow">Blog</span>
            <h2 className="h-section mt-3">Blog</h2>
            <RouteList routes={[...blogIndex, ...blogPosts]} />
          </Reveal>

          <Reveal as="div">
            <p className="text-sm text-[color:var(--color-body)]">
              Prefer XML?{" "}
              <Link
                href="/sitemap.xml"
                className="font-medium text-[color:var(--color-brand-orange)] underline-offset-4 hover:underline"
              >
                View the XML sitemap
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function RouteList({ routes }: { routes: RouteEntry[] }) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
      {routes.map((r) => (
        <li key={r.path}>
          <Link
            href={r.path}
            className="text-[color:var(--color-body)] underline-offset-4 hover:text-[color:var(--color-brand-orange)] hover:underline"
          >
            {displayTitle(r)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
