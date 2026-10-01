import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { getLocationPage } from "../../_lib/locations";
import { LocationPageTemplate } from "../../_ui/locations/LocationPageTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /chiropractic-franklin-tn/
// Category: location-landing (Location landing page)
// Source sitemap: page-sitemap.xml
// Live title: "Franklin Chiropractic - Chiropractic Murfreesboro TN"
export async function generateMetadata() {
  return metadataWithCMS("/chiropractic-franklin-tn/");
}

export default function Page() {
  const data = getLocationPage("chiropractic-franklin-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/chiropractic-franklin-tn/")} />
      <LocationPageTemplate data={data} />
    </>
  );
}
