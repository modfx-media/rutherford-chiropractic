import path from "node:path";

const imported = await import("../payload.config");
const config = await imported.default;
const root = process.cwd();

config.admin.importMap.baseDir = root;
config.admin.importMap.importMapFile = path.resolve(root, "app/(payload)/admin/importMap.js");
config.typescript.outputFile = path.resolve(root, "payload-types.ts");

const wantsTypes = process.argv.includes("types") || process.argv.includes("all");
const wantsImportMap = process.argv.includes("importmap") || process.argv.includes("all") || !wantsTypes;

if (wantsImportMap) {
  const { generateImportMap } = await import(
    "../node_modules/payload/dist/bin/generateImportMap/index.js"
  );
  await generateImportMap(config);
}

if (wantsTypes) {
  const { generateTypes } = await import("../node_modules/payload/dist/bin/generateTypes.js");
  await generateTypes(config);
}
