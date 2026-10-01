import type { CollectionConfig } from "payload";
import { emptyStringToNull } from "./hooks";
import { cmsPath } from "@/lib/cms/path";
import { previewFromPath } from "@/lib/cms/preview";

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
    },
    {
      name: "bodyHtml",
      type: "textarea",
    },
    {
      name: "content",
      type: "json",
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
          data.path = cmsPath(`/${data.slug}`);
        }
        return data;
      },
    ],
  },
  versions: draftVersions,
};
