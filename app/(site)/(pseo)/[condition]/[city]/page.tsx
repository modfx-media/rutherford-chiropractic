import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLdBlocks } from "../../../../_lib/JsonLdBlocks";
import { buildPseoContent, pseoMetadata, pseoJsonLd, enforcePseoIndexing, getAllPseoParams, type PseoPageParams } from "../../../../_lib/pseo/content";
import { PseoPageTemplate } from "../../../../_ui/pseo/PseoPageTemplate";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /{condition}/{city}/ (URL has no `(pseo)` segment — see
// route-groups.md; the parens folder is purely organizational so these
// programmatic pages live apart from the many hand-migrated top-level
// route folders).
//
// Only the curated pairs in `PSEO_COMBINATIONS` (app/_lib/pseo/combinations.ts)
// are valid pages — everything else 404s. `dynamicParams = false` makes
// Next.js reject any param combination not returned by
// `generateStaticParams` before the page component even runs, so the
// curated-list constraint is enforced at the routing layer, not just in
// content.ts.
export const dynamicParams = false;

export function generateStaticParams(): PseoPageParams[] {
  return getAllPseoParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PseoPageParams>;
}): Promise<Metadata> {
  const resolved = await params;
  const content = buildPseoContent(resolved);
  if (!content) return {};
  const meta = await metadataWithCMS(
    `/${resolved.condition}/${resolved.city}/`,
    pseoMetadata(content),
  );
  return enforcePseoIndexing(meta, content);
}

export default async function Page({
  params,
}: {
  params: Promise<PseoPageParams>;
}) {
  const resolved = await params;
  const content = buildPseoContent(resolved);
  if (!content) notFound();

  return (
    <>
      <JsonLdBlocks blocks={pseoJsonLd(content)} />
      <PseoPageTemplate content={content} />
    </>
  );
}
