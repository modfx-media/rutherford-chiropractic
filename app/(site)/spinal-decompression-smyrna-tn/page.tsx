import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { getLocationPage } from "../../_lib/locations";
import { LocationPageTemplate } from "../../_ui/locations/LocationPageTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /spinal-decompression-smyrna-tn/
// Category: location-landing (Location landing page)
// Source sitemap: page-sitemap.xml
// Live title: "Smyrna Spinal Decompression - Chiropractic Murfreesboro TN"
export async function generateMetadata() {
  return metadataWithCMS("/spinal-decompression-smyrna-tn/");
}

export default function Page() {
  const data = getLocationPage("spinal-decompression-smyrna-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/spinal-decompression-smyrna-tn/")} />
      <LocationPageTemplate data={data} />
    </>
  );
}
