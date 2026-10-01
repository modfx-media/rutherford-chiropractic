export type CmsMeta = {
  title?: string | null;
  description?: string | null;
  image?: unknown;
};

export type RoutedDoc = {
  id?: string | number;
  title?: string | null;
  slug?: string | null;
  path?: string | null;
  template?: string | null;
  content?: unknown;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
  noFollow?: boolean | null;
  excludeFromSitemap?: boolean | null;
  excerpt?: string | null;
  category?: string | null;
  publishedAt?: string | null;
  bodyHtml?: string | null;
  featuredImage?: unknown;
  meta?: CmsMeta | null;
  updatedAt?: string | null;
  sourceUpdatedAt?: string | null;
};

export type RoutedContent = {
  collection: "pages" | "posts";
  doc: RoutedDoc;
};
