import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { getLocationPage } from "../../_lib/locations";
import { LocationPageTemplate } from "../../_ui/locations/LocationPageTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /spinal-decompression-murfreesboro-tn/
// Category: location-landing (Location landing page)
// Source sitemap: page-sitemap.xml
// Live title: "Murfreesboro Spinal Decompression - Chiropractic Murfreesboro TN"
export async function generateMetadata() {
  return metadataWithCMS("/spinal-decompression-murfreesboro-tn/");
}

export default function Page() {
  const data = getLocationPage("spinal-decompression-murfreesboro-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/spinal-decompression-murfreesboro-tn/")} />
      <LocationPageTemplate data={data} />
    </>
  );
}
