import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { getLocationPage } from "../../_lib/locations";
import { LocationPageTemplate } from "../../_ui/locations/LocationPageTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /spinal-decompression-woodbury-tn/
// Category: location-landing (Location landing page)
// Source sitemap: page-sitemap.xml
// Live title: "Woodbury Spinal Decompression - Chiropractic Murfreesboro TN"
export async function generateMetadata() {
  return metadataWithCMS("/spinal-decompression-woodbury-tn/");
}

export default function Page() {
  const data = getLocationPage("spinal-decompression-woodbury-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/spinal-decompression-woodbury-tn/")} />
      <LocationPageTemplate data={data} />
    </>
  );
}
