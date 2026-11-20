import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Metadata } from "next";
import { blogSeoOverride } from "@/app/_lib/blog-seo";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/app/_lib/home-meta";
import { locationLandingTitle } from "@/app/_lib/location-seo";
import { buildPseoAudienceContent } from "@/app/_lib/pseo/audience-content";
import { buildPseoContent, enforcePseoIndexing, pseoMetadata } from "@/app/_lib/pseo/content";
import { PAGE_TITLES, resolveIndexableTitle } from "@/app/_lib/seo/page-titles";
import type { RoutedDoc } from "./types";
import { resolveRoutedMetadata, withHomeFallback } from "./resolve-metadata";

const LONG_TITLE =
  "Our Story | Drug-Free Pain Relief in Saint Louis Park and the Surrounding Neighborhoods";
const LONG_DESCRIPTION =
  "Published Payload description that is intentionally longer than the usual search snippet and must be rendered exactly as the editor saved it, with no rewrite.";

function absoluteTitle(meta: Metadata): string | undefined {
  const title = meta.title;
  if (typeof title === "string") return title;
  if (title && typeof title === "object" && "absolute" in title && typeof title.absolute === "string") {
    return title.absolute;
  }
  return undefined;
}

function socialTitle(meta: Metadata): string | undefined {
  const og = meta.openGraph?.title;
  return typeof og === "string" ? og : undefined;
}

function socialDescription(meta: Metadata): string | undefined {
  const og = meta.openGraph?.description;
  return typeof og === "string" ? og : undefined;
}

function twitterTitle(meta: Metadata): string | undefined {
  const twitter = meta.twitter;
  if (!twitter || typeof twitter !== "object" || !("title" in twitter)) return undefined;
  return typeof twitter.title === "string" ? twitter.title : undefined;
}

function doc(path: string, meta: RoutedDoc["meta"], title = "Document headline"): RoutedDoc {
  return { path, title, meta };
}

describe("published CMS SEO fields", () => {
  it("renders a CMS title verbatim on the homepage, including social titles", () => {
    const meta = withHomeFallback(
      resolveRoutedMetadata("/", doc("/", { title: LONG_TITLE, description: LONG_DESCRIPTION }), {
        title: "Chiropractor in Murfreesboro, TN | Rutherford Spine & Wellness Center",
        description: HOME_DESCRIPTION,
      }),
    );
    assert.ok(LONG_TITLE.length > 60);
    assert.equal(absoluteTitle(meta), LONG_TITLE);
    assert.equal(meta.description, LONG_DESCRIPTION);
    assert.equal(socialTitle(meta), LONG_TITLE);
    assert.equal(socialDescription(meta), LONG_DESCRIPTION);
    assert.equal(twitterTitle(meta), LONG_TITLE);
    assert.equal(absoluteTitle(meta)?.endsWith(" | Rutherford"), false);
    assert.notEqual(absoluteTitle(meta), HOME_TITLE);
  });

  it("keeps the homepage fallback when CMS title and description are empty", () => {
    for (const published of [null, doc("/", { title: "  ", description: "" }, "Home headline")]) {
      const meta = withHomeFallback(
        resolveRoutedMetadata("/", published, {
          title: "scraped long title",
          description: "scraped description",
        }),
      );
      assert.equal(absoluteTitle(meta), HOME_TITLE);
      assert.equal(meta.description, HOME_DESCRIPTION);
      assert.equal(socialTitle(meta), HOME_TITLE);
      assert.equal(twitterTitle(meta), HOME_TITLE);
      assert.equal(HOME_TITLE, PAGE_TITLES["/"]);
    }
  });

  it("lets a CMS title replace a curated page title and keeps the curated title when empty", () => {
    const path = "/chiropractic/";
    const curated = PAGE_TITLES[path];
    assert.equal(curated, "Chiropractic Clinic in Murfreesboro | Rutherford");

    const published = resolveRoutedMetadata(
      path,
      doc(path, { title: LONG_TITLE, description: "" }, "Chiropractic"),
      { description: "fallback description" },
    );
    assert.equal(absoluteTitle(published), LONG_TITLE);
    assert.equal(socialTitle(published), LONG_TITLE);
    assert.equal(twitterTitle(published), LONG_TITLE);
    assert.equal(published.description, "fallback description");

    const empty = resolveRoutedMetadata(
      path,
      doc(path, { title: null, description: null }, "Chiropractic"),
      { description: "fallback description", title: "ignored scraped title" },
    );
    assert.equal(absoluteTitle(empty), curated);
    assert.equal(absoluteTitle(empty), resolveIndexableTitle(path, "Chiropractic"));
    assert.equal(empty.description, "fallback description");
  });

  it("lets a CMS title replace a location title and keeps the location title when empty", () => {
    const path = "/chiropractic-brentwood-tn/";
    const generated = locationLandingTitle(path);
    assert.equal(generated, "Chiropractic Care in Brentwood | Rutherford");

    const published = resolveRoutedMetadata(
      path,
      doc(path, { title: LONG_TITLE }),
      { description: "location fallback" },
    );
    assert.equal(absoluteTitle(published), LONG_TITLE);
    assert.notEqual(absoluteTitle(published), generated);

    const empty = resolveRoutedMetadata(
      path,
      doc(path, { title: "", description: "" }, "Brentwood headline"),
      { description: "location fallback" },
    );
    assert.equal(absoluteTitle(empty), generated);
    assert.equal(absoluteTitle(empty), resolveIndexableTitle(path, "Brentwood headline"));
    assert.equal(empty.description, "location fallback");
  });

  it("lets a CMS title replace a shortened blog title and keeps the short title when empty", () => {
    const path = "/when-neck-pain-after-a-car-accident-means-you-need-a-chiropractor/";
    const headline =
      "When Neck Pain After a Car Accident Means You Need a Chiropractor | Rutherford Spine & Wellness Center";
    const shortened = "When Neck Pain After a Crash Needs Care | Rutherford";

    const published = resolveRoutedMetadata(path, doc(path, { title: headline }, headline), {});
    assert.equal(absoluteTitle(published), headline);
    assert.ok(headline.length > 60);
    assert.equal((absoluteTitle(published)?.match(/Rutherford/g) || []).length, 1);

    const empty = resolveRoutedMetadata(path, doc(path, { title: "" }, headline), {});
    assert.equal(absoluteTitle(empty), shortened);
    assert.equal(absoluteTitle(empty), resolveIndexableTitle(path, headline));
  });

  it("keeps fitCmsTitle for a blog post whose SEO title was left blank", () => {
    const path = "/auto-injury-headaches-and-dizziness-signs-you-need-a-chiropractor/";
    const headline =
      "Auto Injury Headaches and Dizziness: Signs You Need a Chiropractor | Rutherford Spine & Wellness Center";
    const empty = resolveRoutedMetadata(path, doc(path, {}, headline), {});
    assert.equal(absoluteTitle(empty), "Auto Injury Headaches and Dizziness | Rutherford");
    assert.equal(absoluteTitle(empty), resolveIndexableTitle(path, headline));

    const published = resolveRoutedMetadata(
      path,
      doc(path, { title: "Signs You Need a Chiropractor After an Auto Injury" }, headline),
      {},
    );
    assert.equal(absoluteTitle(published), "Signs You Need a Chiropractor After an Auto Injury");
  });

  it("uses a CMS description verbatim and keeps fixed or blog descriptions when empty", () => {
    const areas = "/areas-we-serve/";
    const fixed =
      "Condition pages for Murfreesboro, Smyrna, Franklin, Nashville, and nearby Tennessee cities. Rutherford Spine & Wellness. Call 615-217-0097.";
    const areasEmpty = resolveRoutedMetadata(areas, doc(areas, { description: "   " }), {
      description: "scraped",
    });
    assert.equal(areasEmpty.description, fixed);
    assert.equal(socialDescription(areasEmpty), fixed);

    const areasSet = resolveRoutedMetadata(areas, doc(areas, { description: LONG_DESCRIPTION }), {
      description: "scraped",
    });
    assert.equal(areasSet.description, LONG_DESCRIPTION);
    assert.equal(socialDescription(areasSet), LONG_DESCRIPTION);

    const post = "/i-just-stood-up-and-my-leg-gave-out-what-sciatica-pain-is-really-telling-you/";
    const blogDescription = blogSeoOverride(post)?.description;
    assert.ok(blogDescription);
    const postEmpty = resolveRoutedMetadata(post, doc(post, { description: "" }), {
      description: "scraped",
    });
    assert.equal(postEmpty.description, blogDescription);
    const postSet = resolveRoutedMetadata(post, doc(post, { title: "", description: LONG_DESCRIPTION }), {});
    assert.equal(postSet.description, LONG_DESCRIPTION);
    assert.equal(absoluteTitle(postSet), resolveIndexableTitle(post, "Document headline"));
  });

  it("does not change canonical or robots when a CMS title is applied", () => {
    const path = "/chiropractic/";
    const meta = resolveRoutedMetadata(
      path,
      {
        path,
        title: "Chiropractic",
        canonicalUrl: "https://rutherfordchiropractic.com/chiropractic/",
        noIndex: true,
        noFollow: false,
        meta: { title: LONG_TITLE, description: LONG_DESCRIPTION },
      },
      {
        description: "fallback",
        alternates: { canonical: "https://example.com/old" },
        robots: { index: true, follow: true },
      },
    );
    assert.equal(absoluteTitle(meta), LONG_TITLE);
    assert.equal(meta.alternates && "canonical" in meta.alternates ? meta.alternates.canonical : undefined, "https://rutherfordchiropractic.com/chiropractic/");
    assert.deepEqual(meta.robots, { index: false, follow: true });
  });
});

describe("generated pages keep CMS SEO fields", () => {
  it("uses the CMS title on a condition neighborhood page and the generated title otherwise", () => {
    const content = buildPseoContent({ condition: "sciatica", city: "blackman-murfreesboro" });
    assert.ok(content);
    const path = "/sciatica/blackman-murfreesboro/";
    const fallback = pseoMetadata(content);

    const published = enforcePseoIndexing(
      resolveRoutedMetadata(path, doc(path, { title: LONG_TITLE, description: LONG_DESCRIPTION }), fallback),
      content,
    );
    assert.equal(absoluteTitle(published), LONG_TITLE);
    assert.equal(published.description, LONG_DESCRIPTION);
    assert.equal(socialTitle(published), LONG_TITLE);

    const empty = enforcePseoIndexing(
      resolveRoutedMetadata(path, doc(path, { title: "", description: "" }, "Neighborhood headline"), fallback),
      content,
    );
    assert.equal(absoluteTitle(empty), content.metaTitle);
    assert.equal(empty.description, content.metaDescription);

    const missing = enforcePseoIndexing(resolveRoutedMetadata(path, null, fallback), content);
    assert.equal(absoluteTitle(missing), content.metaTitle);
    assert.equal(missing.description, content.metaDescription);
    assert.equal(absoluteTitle(missing), absoluteTitle(empty));
  });

  it("keeps noindex on audience pages when a CMS title is present", () => {
    const content = buildPseoAudienceContent({
      condition: "sciatica",
      city: "blackman-murfreesboro",
      audience: "truck-drivers",
    });
    assert.ok(content);
    const path = "/sciatica/blackman-murfreesboro/truck-drivers/";
    const meta = enforcePseoIndexing(
      resolveRoutedMetadata(path, doc(path, { title: LONG_TITLE }), pseoMetadata(content)),
      content,
    );
    assert.equal(absoluteTitle(meta), LONG_TITLE);
    assert.equal(meta.description, content.metaDescription);
    assert.deepEqual(meta.robots, { index: false, follow: true });
  });
});
