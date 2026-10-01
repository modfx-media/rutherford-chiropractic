import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { getLocationPage } from "../../_lib/locations";
import { LocationPageTemplate } from "../../_ui/locations/LocationPageTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /sports-injuries-lebanon-tn/
// Category: location-landing (Location landing page)
// Source sitemap: page-sitemap.xml
// Live title: "Lebanon Sports Injuries - Chiropractic Murfreesboro TN"
export async function generateMetadata() {
  return metadataWithCMS("/sports-injuries-lebanon-tn/");
}

export default function Page() {
  const data = getLocationPage("sports-injuries-lebanon-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/sports-injuries-lebanon-tn/")} />
      <LocationPageTemplate data={data} />
    </>
  );
}
