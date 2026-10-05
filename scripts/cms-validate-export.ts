import fs from "node:fs";
import path from "node:path";
import { buildContentExport, expectedPublicPaths, recordPublicPath } from "./cms/inventory";

const exportFile = path.resolve("data/content-export.json");
const expected = new Set(expectedPublicPaths());
const exported = fs.existsSync(exportFile)
  ? (JSON.parse(fs.readFileSync(exportFile, "utf8")) as ReturnType<typeof buildContentExport>)
  : buildContentExport();

const got = new Set<string>();
for (const record of exported.records) {
  const publicUrl = recordPublicPath(record);
  if (publicUrl) got.add(publicUrl);
}

const missing = [...expected].filter((item) => !got.has(item));
const extra = [...got].filter((item) => !expected.has(item));

console.log(`Expected sitemap paths: ${expected.size}`);
console.log(`Export records: ${exported.records.length} (${got.size} unique paths)`);

if (missing.length) {
  console.error(`Missing ${missing.length} sitemap paths:`);
  for (const item of missing.slice(0, 50)) console.error(`  ${item}`);
  if (missing.length > 50) console.error(`  …and ${missing.length - 50} more`);
}

if (extra.length) {
  console.log(`Export has ${extra.length} extra paths beyond the current sitemap (ok).`);
}

if (missing.length) {
  process.exit(1);
}

console.log("Export covers every sitemap path.");
