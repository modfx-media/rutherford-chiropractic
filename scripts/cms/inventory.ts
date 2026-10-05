import { ROUTES, ORIGIN, type RouteEntry } from "../../app/_lib/content-map";
import { CONDITIONS } from "../../app/_lib/conditions";
import { SERVICE_PAGES } from "../../app/_lib/services";
import { getAllLocationSlugs, getLocationPage } from "../../app/_lib/locations";
import { getAllBlogPosts, getBlogBodyHtml } from "../../app/_lib/blog";
import { PSEO_COMBINATIONS } from "../../app/_lib/pseo/combinations";
import { PSEO_AUDIENCE_COMBINATIONS } from "../../app/_lib/pseo/audience-content";
import { businessInfo, primaryNav } from "../../app/_ui/nav";
import { cmsPath, publicPath } from "../../lib/cms/path";

export type ExportRecord = {
  collection: "pages" | "posts";
  legacyId: string;
  sourceUrl: string;
  data: Record<string, unknown>;
};

export type ContentExport = {
  version: 1;
  generatedAt: string;
  origin: string;
  records: ExportRecord[];
  globals: {
    header: Record<string, unknown>;
    footer: Record<string, unknown>;
    "site-settings": Record<string, unknown>;
  };
};

function slugFromPublicPath(path: string): string {
  const cms = cmsPath(path);
  if (!cms || cms === "/") return "home";
  return cms.replace(/^\//, "");
}

function seoFromRoute(route?: RouteEntry | null, path?: string) {
  const meta = route?.meta;
  const publicUrl = publicPath(path ?? route?.path) ?? "/";
  const canonical =
    meta?.canonical ??
    (publicUrl === "/" ? `${ORIGIN}/` : `${ORIGIN}${publicUrl}`);
  return {
    canonicalUrl: canonical,
    noIndex: Boolean(meta?.robots?.includes("noindex")),
    noFollow: Boolean(meta?.robots?.includes("nofollow")),
    excludeFromSitemap: false,
    meta: {
      title: meta?.title ?? null,
      description: meta?.description ?? null,
    },
  };
}

function pageRecord(args: {
  path: string;
  title: string;
  template: string;
  content?: unknown;
  route?: RouteEntry | null;
  sourceUpdatedAt?: string | null;
}): ExportRecord {
  const path = cmsPath(args.path) ?? "/";
  const publicUrl = publicPath(path) ?? "/";
  const sourceUrl = publicUrl === "/" ? `${ORIGIN}/` : `${ORIGIN}${publicUrl}`;
  const slug = slugFromPublicPath(publicUrl);
  return {
    collection: "pages",
    legacyId: `page:${path}`,
    sourceUrl,
    data: {
      title: args.title,
      slug,
      path,
      legacyId: `page:${path}`,
      sourceUrl,
      sourceUpdatedAt: args.sourceUpdatedAt ?? args.route?.lastmod ?? null,
      template: args.template,
      content: args.content ?? null,
      ...seoFromRoute(args.route, path),
    },
  };
}

function postRecord(args: {
  path: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string | null;
  featuredImage?: unknown;
  bodyHtml?: string;
  route?: RouteEntry | null;
}): ExportRecord {
  const path = cmsPath(args.path) ?? `/${args.slug}`;
  const publicUrl = publicPath(path) ?? `/${args.slug}/`;
  const sourceUrl = `${ORIGIN}${publicUrl}`;
  return {
    collection: "posts",
    legacyId: `post:${path}`,
    sourceUrl,
    data: {
      title: args.title,
      slug: args.slug,
      path,
      legacyId: `post:${path}`,
      sourceUrl,
      sourceUpdatedAt: args.route?.lastmod ?? args.publishedAt ?? null,
      excerpt: args.excerpt ?? "",
      category: args.category ?? "",
      publishedAt: args.publishedAt ?? null,
      featuredImage: args.featuredImage ?? null,
      bodyHtml: args.bodyHtml ?? "",
      content: {
        slug: args.slug,
        title: args.title,
        excerpt: args.excerpt ?? "",
        category: args.category ?? "",
        publishedAt: args.publishedAt ?? null,
        featuredImage: args.featuredImage ?? null,
        bodyHtml: args.bodyHtml ?? "",
      },
      ...seoFromRoute(args.route, path),
    },
  };
}

export function expectedPublicPaths(): string[] {
  const paths = new Set<string>();
  const add = (value: string) => {
    const next = publicPath(value);
    if (next) paths.add(next);
  };

  for (const route of ROUTES) add(route.path);
  for (const condition of CONDITIONS) add(`/${condition.slug}/`);
  for (const combo of PSEO_COMBINATIONS) {
    add(`/${combo.conditionSlug}/${combo.neighborhoodSlug}/`);
  }
  for (const combo of PSEO_AUDIENCE_COMBINATIONS) {
    add(`/${combo.conditionSlug}/${combo.neighborhoodSlug}/${combo.audienceSlug}/`);
  }
  add("/areas-we-serve/");
  add("/sitemap/");
  return [...paths].sort();
}

export function buildContentExport(): ContentExport {
  const records: ExportRecord[] = [];
  const seen = new Set<string>();
  const add = (record: ExportRecord) => {
    const path = typeof record.data.path === "string" ? record.data.path : "";
    if (!path || seen.has(path)) return;
    seen.add(path);
    records.push(record);
  };

  const routeByPath = new Map(ROUTES.map((route) => [publicPath(route.path) ?? route.path, route]));

  for (const route of ROUTES) {
    const path = cmsPath(route.path) ?? "/";
    const title = route.meta?.title || slugFromPublicPath(route.path);
    if (route.category === "blog-post" || route.source === "post") {
      const slug = slugFromPublicPath(route.path);
      const post = getAllBlogPosts().find((item) => item.slug === slug);
      add(
        postRecord({
          path: route.path,
          title: post?.title ?? title,
          slug: post?.slug ?? slug,
          excerpt: post?.excerpt,
          category: post?.category,
          publishedAt: post?.publishedAt,
          featuredImage: post?.featuredImage,
          bodyHtml: getBlogBodyHtml(slug),
          route,
        }),
      );
      continue;
    }

    if (route.category === "home" || path === "/") {
      add(
        pageRecord({
          path: "/",
          title,
          template: "home",
          route,
          content: { template: "home" },
        }),
      );
      continue;
    }

    if (route.category === "core-service") {
      const slug = slugFromPublicPath(route.path);
      const service = SERVICE_PAGES[slug];
      add(
        pageRecord({
          path: route.path,
          title,
          template: "service",
          route,
          content: service ?? { slug },
        }),
      );
      continue;
    }

    if (route.category === "location-landing") {
      const slug = slugFromPublicPath(route.path);
      add(
        pageRecord({
          path: route.path,
          title,
          template: "location",
          route,
          content: getLocationPage(slug) ?? { slug },
        }),
      );
      continue;
    }

    if (route.category === "blog-index") {
      add(
        pageRecord({
          path: route.path,
          title,
          template: "blog-index",
          route,
        }),
      );
      continue;
    }

    add(
      pageRecord({
        path: route.path,
        title,
        template: "utility",
        route,
      }),
    );
  }

  for (const slug of getAllLocationSlugs()) {
    const data = getLocationPage(slug);
    if (!data) continue;
    const publicUrl = `/${slug}/`;
    add(
      pageRecord({
        path: publicUrl,
        title: data.h1,
        template: "location",
        route: routeByPath.get(publicUrl),
        content: data,
      }),
    );
  }

  for (const condition of CONDITIONS) {
    add(
      pageRecord({
        path: `/${condition.slug}/`,
        title: condition.metaTitle,
        template: "condition",
        content: condition,
      }),
    );
  }

  for (const combo of PSEO_COMBINATIONS) {
    add(
      pageRecord({
        path: `/${combo.conditionSlug}/${combo.neighborhoodSlug}/`,
        title: `${combo.conditionSlug} in ${combo.neighborhoodSlug}`,
        template: "pseo",
        content: {
          conditionSlug: combo.conditionSlug,
          neighborhoodSlug: combo.neighborhoodSlug,
        },
      }),
    );
  }

  for (const combo of PSEO_AUDIENCE_COMBINATIONS) {
    add(
      pageRecord({
        path: `/${combo.conditionSlug}/${combo.neighborhoodSlug}/${combo.audienceSlug}/`,
        title: `${combo.conditionSlug} in ${combo.neighborhoodSlug} for ${combo.audienceSlug}`,
        template: "pseo-audience",
        content: {
          conditionSlug: combo.conditionSlug,
          neighborhoodSlug: combo.neighborhoodSlug,
          audienceSlug: combo.audienceSlug,
        },
      }),
    );
  }

  add(
    pageRecord({
      path: "/areas-we-serve/",
      title: "Areas We Serve | Rutherford Spine & Wellness",
      template: "utility",
      route: routeByPath.get("/areas-we-serve/"),
    }),
  );
  add(
    pageRecord({
      path: "/sitemap/",
      title: "Sitemap | Rutherford Spine & Wellness",
      template: "utility",
      route: routeByPath.get("/sitemap/"),
    }),
  );

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    origin: ORIGIN,
    records,
    globals: {
      header: { nav: primaryNav },
      footer: {
        tagline: "Rutherford Spine & Wellness Center",
        nav: primaryNav.flatMap((item) =>
          item.children ? item.children : [{ label: item.label, href: item.href }],
        ),
      },
      "site-settings": {
        siteName: "Rutherford Spine & Wellness Center",
        phone: businessInfo.phone,
        email: businessInfo.email,
        address: `${businessInfo.address.line1}, ${businessInfo.address.line2}`,
        origin: ORIGIN,
      },
    },
  };
}

export function recordPublicPath(record: ExportRecord): string | null {
  return publicPath(typeof record.data.path === "string" ? record.data.path : record.sourceUrl);
}
