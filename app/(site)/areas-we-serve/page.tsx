import type { Metadata } from "next";
import Link from "next/link";
import { ORIGIN } from "../../_lib/content-map";
import { buildAreasWeServe } from "../../_lib/pseo/areas-we-serve";
import { UtilityHero } from "../../_ui/utility/UtilityHero";
import { Reveal } from "../../_ui/motion/primitives";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /areas-we-serve/
// Directory of indexable condition × neighborhood pages, grouped by city.
// Audience URLs are noindex and are not linked from this page.

const fallbackMetadata: Metadata = {
  title: { absolute: "Areas We Serve | Rutherford" },
  description:
    "Condition pages for Murfreesboro, Smyrna, Franklin, Nashville, and nearby Tennessee cities. Rutherford Spine & Wellness. Call 615-217-0097.",
  alternates: { canonical: `${ORIGIN}/areas-we-serve/` },
  openGraph: {
    title: "Areas We Serve | Rutherford",
    description:
      "Condition pages for Murfreesboro, Smyrna, Franklin, Nashville, and nearby Tennessee cities. Rutherford Spine & Wellness. Call 615-217-0097.",
    url: `${ORIGIN}/areas-we-serve/`,
  },
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
                  <Link
                    key={condition.conditionSlug}
                    href={condition.href}
                    className="surface-card hover-lift group bg-white p-5 font-medium text-[color:var(--color-brand-navy)] hover:text-[color:var(--color-brand-orange)]"
                  >
                    {condition.conditionName} in {condition.neighborhoodName}
                  </Link>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
