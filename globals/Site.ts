import type { GlobalConfig } from "payload";

const navItemFields = [
  { name: "label", type: "text" as const },
  { name: "href", type: "text" as const },
];

export const Header: GlobalConfig = {
  slug: "header",
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "nav",
      type: "array",
      fields: [
        ...navItemFields,
        {
          name: "children",
          type: "array",
          fields: navItemFields,
        },
      ],
    },
  ],
};

export const Footer: GlobalConfig = {
  slug: "footer",
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "tagline",
      type: "textarea",
    },
    {
      name: "nav",
      type: "array",
      fields: navItemFields,
    },
  ],
};

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  fields: [
    { name: "siteName", type: "text" },
    { name: "tagline", type: "textarea" },
    { name: "phone", type: "text" },
    { name: "email", type: "email" },
    { name: "address", type: "textarea" },
    { name: "origin", type: "text" },
  ],
};
