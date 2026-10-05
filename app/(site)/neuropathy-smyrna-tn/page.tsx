import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { getLocationPage } from "../../_lib/locations";
import { LocationPageTemplate } from "../../_ui/locations/LocationPageTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /neuropathy-smyrna-tn/
// Category: location-landing (Location landing page)
// Source sitemap: page-sitemap.xml
// Live title: "Smyrna Neuropathy - Chiropractic Murfreesboro TN"
export async function generateMetadata() {
  return metadataWithCMS("/neuropathy-smyrna-tn/");
}

export default function Page() {
  const data = getLocationPage("neuropathy-smyrna-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/neuropathy-smyrna-tn/")} />
      <LocationPageTemplate data={data} />
    </>
  );
}
