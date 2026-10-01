import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { getLocationPage } from "../../_lib/locations";
import { LocationPageTemplate } from "../../_ui/locations/LocationPageTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /chiropractic-shelbyville-tn/
// Category: location-landing (Location landing page)
// Source sitemap: page-sitemap.xml
// Live title: "Shelbyville Chiropractic - Chiropractic Murfreesboro TN"
export async function generateMetadata() {
  return metadataWithCMS("/chiropractic-shelbyville-tn/");
}

export default function Page() {
  const data = getLocationPage("chiropractic-shelbyville-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/chiropractic-shelbyville-tn/")} />
      <LocationPageTemplate data={data} />
    </>
  );
}
