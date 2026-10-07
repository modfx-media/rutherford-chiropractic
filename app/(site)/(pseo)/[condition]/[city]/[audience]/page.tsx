import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLdBlocks } from "../../../../../_lib/JsonLdBlocks";
import { pseoMetadata, pseoJsonLd, enforcePseoIndexing } from "../../../../../_lib/pseo/content";
import {
  buildPseoAudienceContent,
  getAllPseoAudienceParams,
  type PseoAudiencePageParams,
} from "../../../../../_lib/pseo/audience-content";
import { PseoPageTemplate } from "../../../../../_ui/pseo/PseoPageTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /{condition}/{city}/{audience}/ — the 3rd pSEO taxonomy layer,
// combining a condition, a representative neighborhood for one of the 10
// targeted cities, and one of the 5 `PSEO_AUDIENCES` angles.
//
// Only the 1,250 combos in `PSEO_AUDIENCE_COMBINATIONS`
// (app/_lib/pseo/audience-content.ts) are valid pages — everything else
// 404s, enforced at the routing layer via `dynamicParams = false`, same
// pattern as the 2-segment `/{condition}/{city}/` route.
export const dynamicParams = false;

export function generateStaticParams(): PseoAudiencePageParams[] {
  return getAllPseoAudienceParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PseoAudiencePageParams>;
}): Promise<Metadata> {
  const resolved = await params;
  const content = buildPseoAudienceContent(resolved);
  if (!content) return {};
  const meta = await metadataWithCMS(
    `/${resolved.condition}/${resolved.city}/${resolved.audience}/`,
    pseoMetadata(content),
  );
  return enforcePseoIndexing(meta, content);
}

export default async function Page({
  params,
}: {
  params: Promise<PseoAudiencePageParams>;
}) {
  const resolved = await params;
  const content = buildPseoAudienceContent(resolved);
  if (!content) notFound();

  return (
    <>
      <JsonLdBlocks blocks={pseoJsonLd(content)} />
      <PseoPageTemplate content={content} />
    </>
  );
}
