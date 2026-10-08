import path from "path";
import { fileURLToPath } from "url";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages, Posts } from "./collections/Pages";
import { Footer, Header, SiteSettings } from "./globals/Site";
import { getCorsOrigins, getServerURL } from "./lib/cms/url";
import { publicPath } from "./lib/cms/path";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const disablePush =
  Boolean(process.env.VERCEL) ||
  process.env.CMS_IMPORT_APPLY === "1" ||
  process.env.PAYLOAD_PUSH === "false";

const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, "app/(payload)/admin/importMap.js"),
    },
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Pages, Posts],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: getServerURL(),
  cors: getCorsOrigins(),
  csrf: getCorsOrigins(),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    forceUseVercelPostgres: true,
    push: !disablePush,
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ["pages", "posts"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => (typeof doc?.title === "string" ? doc.title : ""),
      generateURL: ({ doc }) => {
        const pathValue = publicPath(
          typeof doc?.path === "string" ? doc.path : typeof doc?.slug === "string" ? `/${doc.slug}` : null,
        );
        if (!pathValue) return "";
        const origin = getServerURL();
        return pathValue === "/" ? `${origin}/` : `${origin}${pathValue}`;
      },
    }),
    vercelBlobStorage({
      enabled: Boolean(blobToken),
      collections: {
        media: true,
      },
      token: blobToken,
      clientUploads: true,
    }),
  ],
});
