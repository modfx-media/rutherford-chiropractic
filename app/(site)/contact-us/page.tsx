import { jsonLdFor } from "../../_lib/content-map";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { ContactPage } from "../../_ui/utility/ContactPage";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /contact-us/
// Category: utility (Utility page)
// Source sitemap: page-sitemap.xml
// Live title: "Contact Us | Schedule Your Wellness Appointment Online"

export async function generateMetadata() {
  return metadataWithCMS("/contact-us/");
}

export default async function Page() {
  const { reviews } = await getDisplayedGoogleReviews();

  return (
    <>
      <JsonLdBlocks blocks={jsonLdFor("/contact-us/")} />
      <ContactPage review={reviews[0] ?? null} />
    </>
  );
}
