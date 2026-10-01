import fs from "node:fs";
import path from "node:path";
import { buildContentExport } from "./cms/inventory";

const outDir = path.resolve("data");
const outFile = path.join(outDir, "content-export.json");

const exported = buildContentExport();
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(exported, null, 2));

console.log(
  `Wrote ${exported.records.length} records to ${outFile} (${exported.records.filter((r) => r.collection === "pages").length} pages, ${exported.records.filter((r) => r.collection === "posts").length} posts)`,
);
