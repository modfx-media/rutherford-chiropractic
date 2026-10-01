import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { getLocationPage } from "../../_lib/locations";
import { LocationPageTemplate } from "../../_ui/locations/LocationPageTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /auto-injuries-shelbyville-tn/
// Category: location-landing (Location landing page)
// Source sitemap: page-sitemap.xml
// Live title: "Shelbyville Auto Injuries - Chiropractic Murfreesboro TN"
export async function generateMetadata() {
  return metadataWithCMS("/auto-injuries-shelbyville-tn/");
}

export default function Page() {
  const data = getLocationPage("auto-injuries-shelbyville-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/auto-injuries-shelbyville-tn/")} />
      <LocationPageTemplate data={data} />
    </>
  );
}
