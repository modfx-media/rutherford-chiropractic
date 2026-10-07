import type { Metadata } from "next";
import Link from "next/link";
import { ORIGIN } from "../../_lib/content-map";
import { buildAreasWeServe } from "../../_lib/pseo/areas-we-serve";
import { UtilityHero } from "../../_ui/utility/UtilityHero";
import { Reveal } from "../../_ui/motion/primitives";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /areas-we-serve/
// A crawlable directory of every pSEO page — the 250 `/{condition}/{city}/`
// pages and the 1,250 `/{condition}/{city}/{audience}/` pages — grouped by
// the 10 cities we target. Linked from the footer's Quick Links column.

const fallbackMetadata: Metadata = {
  title: "Areas We Serve | Rutherford Spine & Wellness",
  description:
    "Rutherford Spine & Wellness Center serves patients throughout Murfreesboro, Smyrna, La Vergne, Lebanon, Franklin, Brentwood, Nashville, Shelbyville, Woodbury, and Eagleville, TN - browse condition-specific care pages for your city.",
  alternates: { canonical: `${ORIGIN}/areas-we-serve/` },
};

export async function generateMetadata() {
  return metadataWithCMS("/areas-we-serve/", fallbackMetadata);
}

export default function Page() {
  const cityGroups = buildAreasWeServe();

  return (
    <main>
      <UtilityHero
        eyebrow="Service Area"
        h1="Areas We Serve"
        subtitle="Rutherford Spine & Wellness Center treats patients throughout Rutherford County and the wider Middle Tennessee region. Find condition-specific care information for your city below."
        path="/areas-we-serve/"
      />

      <section className="section-y bg-white">
        <div className="container-wide space-y-16">
          {cityGroups.map((city) => (
            <Reveal as="div" key={city.citySlug}>
              <span className="eyebrow">{city.cityName}, TN</span>
              <h2 className="h-section mt-3">
                Conditions We Treat in {city.cityName}
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {city.conditions.map((condition) => (
                  <details
                    key={condition.conditionSlug}
                    className="surface-card hover-lift group bg-white p-5"
                  >
                    <summary className="cursor-pointer list-none font-medium text-[color:var(--color-brand-navy)]">
                      <Link
                        href={condition.href}
                        className="hover:text-[color:var(--color-brand-orange)]"
                      >
                        {condition.conditionName} in {condition.neighborhoodName}
                      </Link>
                    </summary>
                    {condition.audienceLinks.length > 0 && (
                      <ul className="mt-3 space-y-2 border-t border-[color:var(--color-border)] pt-3 text-sm">
                        {condition.audienceLinks.map((audience) => (
                          <li key={audience.href}>
                            <Link
                              href={audience.href}
                              className="text-[color:var(--color-body)] hover:text-[color:var(--color-brand-orange)]"
                            >
                              {condition.conditionName} for {audience.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </details>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
