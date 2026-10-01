import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { getLocationPage } from "../../_lib/locations";
import { LocationPageTemplate } from "../../_ui/locations/LocationPageTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /neuropathy-lebanon-tn/
// Category: location-landing (Location landing page)
// Source sitemap: page-sitemap.xml
// Live title: "Lebanon Neuropathy - Chiropractic Murfreesboro TN"
export async function generateMetadata() {
  return metadataWithCMS("/neuropathy-lebanon-tn/");
}

export default function Page() {
  const data = getLocationPage("neuropathy-lebanon-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/neuropathy-lebanon-tn/")} />
      <LocationPageTemplate data={data} />
    </>
  );
}
