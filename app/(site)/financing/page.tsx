import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { FinancingPage } from "../../_ui/utility/FinancingPage";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /financing/
// Category: utility (Utility page)
// Source sitemap: page-sitemap.xml
// Live title: "Flexible Financing Options | Rutherford Spine & Wellness"

export async function generateMetadata() {
  return metadataWithCMS("/financing/");
}

export default function Page() {
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/financing/")} />
      <FinancingPage />
    </>
  );
}
