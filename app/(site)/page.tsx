import { jsonLdFor } from "../_lib/content-map";
import { JsonLdBlocks } from "../_lib/JsonLdBlocks";
import { Hero } from "../_ui/home/Hero";
import { CareSlider } from "../_ui/home/CareSlider";
import { ServicesGrid } from "../_ui/home/ServicesGrid";
import { ConditionsCarousel } from "../_ui/home/ConditionsCarousel";
import { CovidNotice } from "../_ui/home/CovidNotice";
import { About } from "../_ui/home/About";
import { DoctorSnippet } from "../_ui/home/DoctorSnippet";
import { DetailedServices } from "../_ui/home/DetailedServices";
import { ReviewsSection } from "../_ui/home/ReviewsSection";
import { FinancingOptions } from "../_ui/FinancingOptions";
import { LocationMap } from "../_ui/home/LocationMap";
import { metadataWithCMS } from "@/lib/cms/metadata";
import { HOME_DESCRIPTION, HOME_TITLE } from "../_lib/home-meta";

export async function generateMetadata() {
  const meta = await metadataWithCMS("/");
  return {
    ...meta,
    title: { absolute: HOME_TITLE },
    description: HOME_DESCRIPTION,
    openGraph: {
      ...meta.openGraph,
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image" as const,
      ...(meta.twitter && typeof meta.twitter === "object" ? meta.twitter : {}),
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
    },
  };
}

export default function Page() {
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/")} />
      <main>
        <Hero />
        <section className="bg-white pt-16 pb-4 ">
          <div className="container-wide">
            <CareSlider />
          </div>
        </section>
        <ServicesGrid />
        <ConditionsCarousel />
        <CovidNotice />
        <About />
        <DoctorSnippet />
        <DetailedServices />
        <FinancingOptions />
        <ReviewsSection />
        <LocationMap />
      </main>
    </>
  );
}

