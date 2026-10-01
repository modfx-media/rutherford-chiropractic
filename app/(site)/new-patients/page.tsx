import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { NewPatientsPage } from "../../_ui/utility/NewPatientsPage";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /new-patients/
// Category: utility (Utility page)
// Source sitemap: page-sitemap.xml
// Live title: "New Patients Portal | Rutherford Spine & Wellness"

export async function generateMetadata() {
  return metadataWithCMS("/new-patients/");
}

export default function Page() {
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/new-patients/")} />
      <NewPatientsPage />
    </>
  );
}
