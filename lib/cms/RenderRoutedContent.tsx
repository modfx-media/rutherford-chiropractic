import { JsonLdBlocks } from "@/app/_lib/JsonLdBlocks";
import { jsonLdFor, type JsonLd } from "@/app/_lib/content-map";
import { getCondition, type Condition } from "@/app/_lib/conditions";
import { conditionJsonLd } from "@/app/_lib/conditions-seo";
import type { BlogPostMeta } from "@/app/_lib/blog";
import type { LocationPageData } from "@/app/_lib/locations";
import type { ServicePageData } from "@/app/_lib/services";
import { buildPseoContent, pseoJsonLd } from "@/app/_lib/pseo/content";
import { buildPseoAudienceContent } from "@/app/_lib/pseo/audience-content";
import { BlogPostTemplate } from "@/app/_ui/blog/BlogPostTemplate";
import { RankedBlogPostTemplate } from "@/app/_ui/blog/RankedBlogPostTemplate";
import { ConditionPageTemplate } from "@/app/_ui/conditions/ConditionPageTemplate";
import { LocationPageTemplate } from "@/app/_ui/locations/LocationPageTemplate";
import { PseoPageTemplate } from "@/app/_ui/pseo/PseoPageTemplate";
import { ServicePageTemplate } from "@/app/_ui/services/ServicePageTemplate";
import type { BlogPostData } from "@/lib/ranked/types";
import { cmsPath, publicPath } from "./path";
import type { RoutedContent, RoutedDoc } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function jsonLdSafe(path: string | null): JsonLd[] {
  if (!path) return [];
  const publicUrl = publicPath(path) ?? path;
  try {
    return jsonLdFor(publicUrl);
  } catch {
    return [];
  }
}

function asService(content: unknown): ServicePageData | null {
  if (!isRecord(content) || typeof content.h1 !== "string" || !Array.isArray(content.sections)) {
    return null;
  }
  return content as unknown as ServicePageData;
}

function asLocation(content: unknown): LocationPageData | null {
  if (!isRecord(content) || typeof content.h1 !== "string" || typeof content.slug !== "string") {
    return null;
  }
  return content as unknown as LocationPageData;
}

function asCondition(content: unknown): Condition | null {
  if (!isRecord(content) || typeof content.slug !== "string" || typeof content.name !== "string") {
    return getCondition(typeof content === "object" && content && "slug" in content ? String((content as { slug?: string }).slug) : "") ?? null;
  }
  return content as unknown as Condition;
}

function asBlogMeta(doc: RoutedDoc): BlogPostMeta | null {
  const content = isRecord(doc.content) ? doc.content : {};
  const slug = (typeof content.slug === "string" && content.slug) || doc.slug;
  const title = (typeof content.title === "string" && content.title) || doc.title;
  if (!slug || !title) return null;
  const featured = (content.featuredImage ?? doc.featuredImage) as BlogPostMeta["featuredImage"];
  return {
    slug,
    path: publicPath(doc.path) ?? `/${slug}/`,
    title,
    category: (typeof content.category === "string" && content.category) || doc.category || "Chiropractic Care",
    publishedAt:
      (typeof content.publishedAt === "string" && content.publishedAt) ||
      doc.publishedAt ||
      null,
    featuredImage: featured ?? null,
    excerpt: (typeof content.excerpt === "string" && content.excerpt) || doc.excerpt || "",
  };
}

function asRankedPost(content: unknown): BlogPostData | null {
  if (!isRecord(content) || !Array.isArray(content.sections) || typeof content.h1 !== "string") {
    return null;
  }
  return content as unknown as BlogPostData;
}

function pseoParams(content: unknown): { condition: string; city: string; audience?: string } | null {
  if (!isRecord(content)) return null;
  const condition =
    (typeof content.conditionSlug === "string" && content.conditionSlug) ||
    (typeof content.condition === "string" && content.condition);
  const city =
    (typeof content.neighborhoodSlug === "string" && content.neighborhoodSlug) ||
    (typeof content.city === "string" && content.city);
  if (!condition || !city) return null;
  const audience =
    (typeof content.audienceSlug === "string" && content.audienceSlug) ||
    (typeof content.audience === "string" && content.audience) ||
    undefined;
  return { condition, city, audience };
}

export function RenderRoutedContent({
  routed,
  fallback,
}: {
  routed: RoutedContent;
  fallback: React.ReactNode;
}) {
  const { collection, doc } = routed;
  const path = cmsPath(doc.path);
  const template = doc.template;

  if (collection === "posts" || template === "blog-post") {
    const ranked = asRankedPost(doc.content);
    if (ranked) {
      return (
        <>
          <JsonLdBlocks blocks={jsonLdSafe(path)} />
          <RankedBlogPostTemplate post={ranked} />
        </>
      );
    }
    const post = asBlogMeta(doc);
    if (post) {
      const body =
        doc.bodyHtml ||
        (isRecord(doc.content) && typeof doc.content.bodyHtml === "string"
          ? doc.content.bodyHtml
          : undefined);
      return (
        <>
          <JsonLdBlocks blocks={jsonLdSafe(path)} />
          <BlogPostTemplate post={post} bodyHtml={body} />
        </>
      );
    }
    return fallback;
  }

  if (template === "service") {
    const data = asService(doc.content);
    if (!data) return fallback;
    return (
      <>
        <JsonLdBlocks blocks={jsonLdSafe(path)} />
        <ServicePageTemplate data={data} />
      </>
    );
  }

  if (template === "location") {
    const data = asLocation(doc.content);
    if (!data) return fallback;
    return (
      <>
        <JsonLdBlocks blocks={jsonLdSafe(path)} />
        <LocationPageTemplate data={data} />
      </>
    );
  }

  if (template === "condition") {
    const condition =
      asCondition(doc.content) ?? (doc.slug ? getCondition(doc.slug) : undefined) ?? null;
    if (!condition) return fallback;
    return (
      <>
        <JsonLdBlocks blocks={conditionJsonLd(condition)} />
        <ConditionPageTemplate condition={condition} />
      </>
    );
  }

  if (template === "pseo" || template === "pseo-audience") {
    const params = pseoParams(doc.content);
    if (!params) return fallback;
    const content =
      template === "pseo-audience" && params.audience
        ? buildPseoAudienceContent({
            condition: params.condition,
            city: params.city,
            audience: params.audience,
          })
        : buildPseoContent({ condition: params.condition, city: params.city });
    if (!content) return fallback;
    return (
      <>
        <JsonLdBlocks blocks={pseoJsonLd(content)} />
        <PseoPageTemplate content={content} />
      </>
    );
  }

  return fallback;
}
