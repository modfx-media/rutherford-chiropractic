import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { getLocationPage } from "../../_lib/locations";
import { LocationPageTemplate } from "../../_ui/locations/LocationPageTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /sports-injuries-eagleville-tn/
// Category: location-landing (Location landing page)
// Source sitemap: page-sitemap.xml
// Live title: "Eagleville Sports Injuries - Chiropractic Murfreesboro TN"
export async function generateMetadata() {
  return metadataWithCMS("/sports-injuries-eagleville-tn/");
}

export default function Page() {
  const data = getLocationPage("sports-injuries-eagleville-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/sports-injuries-eagleville-tn/")} />
      <LocationPageTemplate data={data} />
    </>
  );
}
