import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { ServicePageTemplate } from "../../_ui/services/ServicePageTemplate";
import { getServicePage } from "../../_lib/services";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /spinal-decompression/
// Category: core-service (Core service page)
// Source sitemap: page-sitemap.xml
// Live title: "Spinal Decompression in Murfreesboro | Back Pain Relief"

const service = getServicePage("spinal-decompression");

export async function generateMetadata() {
  return metadataWithCMS("/spinal-decompression/");
}

export default function Page() {
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/spinal-decompression/")} />
      <ServicePageTemplate data={service} />
    </>
  );
}
