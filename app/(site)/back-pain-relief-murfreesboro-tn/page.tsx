import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { getLocationPage } from "../../_lib/locations";
import { LocationPageTemplate } from "../../_ui/locations/LocationPageTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /back-pain-relief-murfreesboro-tn/
// Category: location-landing (Location landing page)
// Source sitemap: page-sitemap.xml
// Live title: "Murfreesboro Back Pain Relief - Chiropractic Murfreesboro TN"
export async function generateMetadata() {
  return metadataWithCMS("/back-pain-relief-murfreesboro-tn/");
}

export default function Page() {
  const data = getLocationPage("back-pain-relief-murfreesboro-tn")!;
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/back-pain-relief-murfreesboro-tn/")} />
      <LocationPageTemplate data={data} />
    </>
  );
}
