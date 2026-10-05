import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { NewPatientFormsPage } from "../../_ui/utility/NewPatientFormsPage";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /new-patient-forms/
// Category: utility (Utility page)
// Source sitemap: page-sitemap.xml
// Live title: "New Patient Forms - Chiropractic Murfreesboro TN"

export async function generateMetadata() {
  return metadataWithCMS("/new-patient-forms/");
}

export default function Page() {
  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/new-patient-forms/")} />
      <NewPatientFormsPage />
    </>
  );
}
