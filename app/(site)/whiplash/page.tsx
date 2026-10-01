import { ConditionPageTemplate } from "../../_ui/conditions/ConditionPageTemplate";
import { JsonLdBlocks } from "../../_lib/JsonLdBlocks";
import { conditionMetadata, conditionJsonLd } from "../../_lib/conditions-seo";
import { getCondition } from "../../_lib/conditions";
import { metadataWithCMS } from "@/lib/cms/metadata";

// Route: /whiplash/
// Category: condition (new taxonomy, not on the live WordPress origin)

const condition = getCondition("whiplash")!;

export async function generateMetadata() {
  return metadataWithCMS(`/${condition.slug}/`, conditionMetadata(condition));
}

export default function Page() {
  return (
    <>
      <JsonLdBlocks blocks={conditionJsonLd(condition)} />
      <ConditionPageTemplate condition={condition} />
    </>
  );
}
