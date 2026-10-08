import type { CollectionConfig } from "payload";
import { emptyStringToNull } from "./hooks";
import { cmsPath } from "@/lib/cms/path";
import { previewFromPath } from "@/lib/cms/preview";
import { lexicalHasContent, lexicalToHtml } from "@/lib/cms/richtext";

const draftVersions = {
  drafts: {
    schedulePublish: true,
  },
  maxPerDoc: 50,
} as const;

const seoFields: CollectionConfig["fields"] = [
  {
    name: "canonicalUrl",
    type: "text",
    admin: { position: "sidebar" },
  },
  {
    name: "noIndex",
    type: "checkbox",
    defaultValue: false,
    admin: { position: "sidebar" },
  },
  {
    name: "noFollow",
    type: "checkbox",
    defaultValue: false,
    admin: { position: "sidebar" },
  },
  {
    name: "excludeFromSitemap",
    type: "checkbox",
    defaultValue: false,
    admin: { position: "sidebar" },
  },
];

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "path", "template", "_status", "updatedAt"],
    livePreview: {
      url: ({ data }) => previewFromPath(data?.path, data?.slug),
    },
    preview: (data) => previewFromPath(data?.path, data?.slug),
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return {
        _status: {
          equals: "published",
        },
      };
    },
  },
  defaultPopulate: {
    title: true,
    slug: true,
    path: true,
    template: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [emptyStringToNull] },
    },
    {
      name: "path",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [emptyStringToNull] },
      admin: {
        description: "Public path with a leading slash and no trailing slash.",
      },
    },
    {
      name: "legacyId",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [emptyStringToNull] },
      admin: { position: "sidebar" },
    },
    {
      name: "sourceUrl",
      type: "text",
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "sourceUpdatedAt",
      type: "date",
      admin: { position: "sidebar" },
    },
    {
      name: "template",
      type: "select",
      options: [
        { label: "Home", value: "home" },
        { label: "Service", value: "service" },
        { label: "Location", value: "location" },
        { label: "Condition", value: "condition" },
        { label: "Utility", value: "utility" },
        { label: "pSEO", value: "pseo" },
        { label: "pSEO audience", value: "pseo-audience" },
        { label: "Blog index", value: "blog-index" },
        { label: "Generic", value: "generic" },
      ],
    },
    {
      name: "content",
      type: "json",
      admin: {
        description: "Structured fields that match the designed page templates.",
      },
    },
    ...seoFields,
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        if (typeof data.path === "string") {
          data.path = cmsPath(data.path) ?? null;
        } else if (typeof data.slug === "string" && data.slug) {
          data.path = data.slug === "home" ? "/" : cmsPath(`/${data.slug}`);
        }
        return data;
      },
    ],
  },
  versions: draftVersions,
};

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "path", "_status", "updatedAt"],
    livePreview: {
      url: ({ data }) => previewFromPath(data?.path, data?.slug),
    },
    preview: (data) => previewFromPath(data?.path, data?.slug),
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return {
        _status: {
          equals: "published",
        },
      };
    },
  },
  defaultPopulate: {
    title: true,
    slug: true,
    path: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [emptyStringToNull] },
    },
    {
      name: "path",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [emptyStringToNull] },
    },
    {
      name: "legacyId",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [emptyStringToNull] },
      admin: { position: "sidebar" },
    },
    {
      name: "sourceUrl",
      type: "text",
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "sourceUpdatedAt",
      type: "date",
      admin: { position: "sidebar" },
    },
    {
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "category",
      type: "text",
    },
    {
      name: "publishedAt",
      type: "date",
      admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "featuredImage",
      type: "json",
      admin: {
        position: "sidebar",
        description: "Public image data ({ src, alt, width, height }). The featured image upload fills this in.",
      },
      hooks: {
        beforeChange: [
          ({ value, previousValue }) => (value == null ? previousValue : value),
        ],
      },
    },
    {
      name: "featuredUpload",
      type: "upload",
      relationTo: "media",
      label: "Featured image",
      virtual: true,
      admin: {
        description: "Uploaded to Vercel Blob and shown on the article and blog card.",
      },
      hooks: {
        afterRead: [
          ({ siblingData, value }) => {
            if (value != null && value !== "") return value;
            const image = siblingData?.featuredImage;
            if (image && typeof image === "object" && "id" in image) {
              const id = (image as { id?: unknown }).id;
              if (typeof id === "number" || typeof id === "string") return id;
            }
            return null;
          },
        ],
        beforeChange: [
          async ({ value, siblingData, req }) => {
            const id =
              typeof value === "number" || typeof value === "string"
                ? value
                : value && typeof value === "object" && "id" in value
                  ? (value as { id?: unknown }).id
                  : null;
            if (typeof id !== "number" && typeof id !== "string") return value;

            const media = await req.payload.findByID({
              collection: "media",
              id,
              depth: 0,
              overrideAccess: true,
              req,
            });
            const existing =
              siblingData.featuredImage && typeof siblingData.featuredImage === "object"
                ? (siblingData.featuredImage as Record<string, unknown>)
                : {};
            const src = typeof media.url === "string" && media.url ? media.url : existing.src;
            siblingData.featuredImage = {
              ...existing,
              id: media.id,
              src,
              alt: (typeof media.alt === "string" && media.alt) || existing.alt || "",
              width: media.width ?? existing.width ?? 1200,
              height: media.height ?? existing.height ?? 630,
            };
            return id;
          },
        ],
      },
    },
    {
      name: "bodyHtml",
      type: "textarea",
      admin: {
        position: "sidebar",
        description: "Rendered article HTML. The article body editor fills this in.",
      },
      hooks: {
        beforeChange: [
          ({ value, previousValue }) =>
            (value == null || value === "") && typeof previousValue === "string" && previousValue
              ? previousValue
              : value,
        ],
      },
    },
    {
      name: "content",
      type: "json",
      admin: { position: "sidebar" },
      hooks: {
        beforeChange: [
          ({ value, previousValue }) => (value == null ? previousValue : value),
        ],
      },
    },
    {
      name: "articleBody",
      type: "richText",
      label: "Article body",
      virtual: true,
      admin: {
        description: "Article copy. Use the upload button for inline images.",
      },
      hooks: {
        afterRead: [
          ({ siblingData, value }) => {
            if (value) return value;
            const content = siblingData?.content;
            if (content && typeof content === "object" && "lexical" in content) {
              return (content as { lexical?: unknown }).lexical;
            }
            return value;
          },
        ],
        beforeChange: [
          async ({ value, siblingData, req }) => {
            if (!lexicalHasContent(value)) return value;
            const existing =
              siblingData.content && typeof siblingData.content === "object" && !Array.isArray(siblingData.content)
                ? (siblingData.content as Record<string, unknown>)
                : {};
            siblingData.content = { ...existing, lexical: value };
            try {
              const html = await lexicalToHtml(value, req);
              if (html) siblingData.bodyHtml = html;
            } catch (error) {
              req.payload.logger.error({ err: error, msg: "Failed to render article HTML" });
            }
            return value;
          },
        ],
      },
    },
    ...seoFields,
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        if (typeof data.path === "string") {
          data.path = cmsPath(data.path) ?? null;
        } else if (typeof data.slug === "string" && data.slug) {
          data.path = cmsPath(`/blog/${data.slug}`);
        }
        return data;
      },
    ],
  },
  versions: draftVersions,
};
