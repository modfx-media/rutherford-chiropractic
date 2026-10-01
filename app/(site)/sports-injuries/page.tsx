import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { ServicePageTemplate } from "../../_ui/services/ServicePageTemplate";
import { getServicePage } from "../../_lib/services";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /sports-injuries/
// Category: core-service (Core service page)
// Source sitemap: page-sitemap.xml
// Live title: "SPORTS INJURIES - Chiropractic Murfreesboro TN"

const service = getServicePage("sports-injuries");

export async function generateMetadata() {
  return metadataWithCMS("/sports-injuries/");
}

export default function Page() {
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/sports-injuries/")} />
      <ServicePageTemplate data={service} />
    </>
  );
}
