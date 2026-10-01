import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { getLocationPage } from "../../_lib/locations";
import { LocationPageTemplate } from "../../_ui/locations/LocationPageTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /sports-injuries-brentwood-tn/
// Category: location-landing (Location landing page)
// Source sitemap: page-sitemap.xml
// Live title: "Brentwood Sports Injuries - Chiropractic Murfreesboro TN"
export async function generateMetadata() {
  return metadataWithCMS("/sports-injuries-brentwood-tn/");
}

export default function Page() {
  const data = getLocationPage("sports-injuries-brentwood-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/sports-injuries-brentwood-tn/")} />
      <LocationPageTemplate data={data} />
    </>
  );
}
