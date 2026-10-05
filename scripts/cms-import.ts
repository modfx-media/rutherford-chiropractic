import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { getPayload } from "payload";
import config from "../payload.config";
import type { ContentExport, ExportRecord } from "./cms/inventory";

dotenv.config({ path: ".env.local" });
dotenv.config();

function hasApplyFlag() {
  return process.argv.includes("--apply") && process.env.CMS_IMPORT_APPLY === "1";
}

function skipRef(value: unknown): unknown {
  if (value && typeof value === "object") {
    if ("$ref" in (value as Record<string, unknown>)) return null;
    if (Array.isArray(value)) return value.map(skipRef).filter((item) => item !== null);
    const next: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      const resolved = skipRef(nested);
      if (resolved !== null) next[key] = resolved;
    }
    return next;
  }
  return value;
}

async function findExisting(
  payload: Awaited<ReturnType<typeof getPayload>>,
  record: ExportRecord,
) {
  const legacyId = typeof record.data.legacyId === "string" ? record.data.legacyId : record.legacyId;
  if (legacyId) {
    const byLegacy = await payload.find({
      collection: record.collection,
      where: { legacyId: { equals: legacyId } },
      limit: 1,
      depth: 0,
      draft: true,
      overrideAccess: true,
    });
    if (byLegacy.docs[0]) return byLegacy.docs[0];
  }
  if (record.sourceUrl) {
    const bySource = await payload.find({
      collection: record.collection,
      where: { sourceUrl: { equals: record.sourceUrl } },
      limit: 1,
      depth: 0,
      draft: true,
      overrideAccess: true,
    });
    if (bySource.docs[0]) return bySource.docs[0];
  }
  return null;
}

async function upsertRecord(
  payload: Awaited<ReturnType<typeof getPayload>>,
  record: ExportRecord,
  apply: boolean,
) {
  const data = {
    ...(skipRef(record.data) as Record<string, unknown>),
    _status: "draft",
  };
  const existing = await findExisting(payload, record);
  if (!apply) {
    console.log(`${existing ? "update" : "create"} ${record.collection} ${record.data.path}`);
    return;
  }
  if (existing) {
    await payload.update({
      collection: record.collection,
      id: existing.id as string,
      data,
      draft: true,
      overrideAccess: true,
    });
    return;
  }
  await payload.create({
    collection: record.collection,
    data,
    draft: true,
    overrideAccess: true,
  });
}

async function main() {
  const apply = hasApplyFlag();
  if (process.argv.includes("--publish")) {
    console.error("Refusing to bulk-publish. Import is draft-only.");
    process.exit(1);
  }
  if (process.argv.includes("--apply") && process.env.CMS_IMPORT_APPLY !== "1") {
    console.error("Set CMS_IMPORT_APPLY=1 with --apply to write drafts.");
    process.exit(1);
  }

  const file = path.resolve(process.argv.find((arg) => arg.endsWith(".json")) ?? "data/content-export.json");
  if (!fs.existsSync(file)) {
    console.error(`Missing export file: ${file}. Run npm run cms:export first.`);
    process.exit(1);
  }

  const exported = JSON.parse(fs.readFileSync(file, "utf8")) as ContentExport;
  const payload = await getPayload({ config });

  console.log(`${apply ? "Applying" : "Dry run"} ${exported.records.length} records as drafts`);

  for (const record of exported.records) {
    try {
      await upsertRecord(payload, record, apply);
    } catch (error) {
      console.error(`[cms:import] skipped ${record.collection} ${record.data.path}`, error);
    }
  }

  if (apply) {
    await payload.updateGlobal({
      slug: "header",
      data: exported.globals.header,
      overrideAccess: true,
    });
    await payload.updateGlobal({
      slug: "footer",
      data: exported.globals.footer,
      overrideAccess: true,
    });
    await payload.updateGlobal({
      slug: "site-settings",
      data: exported.globals["site-settings"],
      overrideAccess: true,
    });
  }

  console.log(apply ? "Draft import complete. Public pages stay on designed fallback until publish." : "Dry run complete.");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
