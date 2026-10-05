import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { ServicePageTemplate } from "../../_ui/services/ServicePageTemplate";
import { getServicePage } from "../../_lib/services";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /back-pain-relief/
// Category: core-service (Core service page)
// Source sitemap: page-sitemap.xml
// Live title: "Back Pain Relief in Murfreesboro | Spinal Therapy Clinic"

const service = getServicePage("back-pain-relief");

export async function generateMetadata() {
  return metadataWithCMS("/back-pain-relief/");
}

export default function Page() {
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/back-pain-relief/")} />
      <ServicePageTemplate data={service} />
    </>
  );
}
