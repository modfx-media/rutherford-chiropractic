import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { ServicePageTemplate } from "../../_ui/services/ServicePageTemplate";
import { getServicePage } from "../../_lib/services";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /chiropractic/
// Category: core-service (Core service page)
// Source sitemap: page-sitemap.xml
// Live title: "Chiropractic Care in Murfreesboro | Pain Relief & Wellness"

const service = getServicePage("chiropractic");

export async function generateMetadata() {
  return metadataWithCMS("/chiropractic/");
}

export default function Page() {
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/chiropractic/")} />
      <ServicePageTemplate data={service} />
    </>
  );
}
