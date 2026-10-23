import { getAllPseoParams, buildPseoContent } from "../app/_lib/pseo/content";
import { getAllPseoAudienceParams, buildPseoAudienceContent } from "../app/_lib/pseo/audience-content";
import { getCustomPseoContent } from "../app/_lib/pseo/city-content";
import { buildAreasWeServe } from "../app/_lib/pseo/areas-we-serve";
import { getAllLocationSlugs } from "../app/_lib/locations";
import { locationLandingTitle } from "../app/_lib/location-seo";
import { blogSeoOverride } from "../app/_lib/blog-seo";
import { topicLinksForPost, readingForPage } from "../app/_lib/blog-links";
import { ROUTES } from "../app/_lib/content-map";
import { CONDITIONS } from "../app/_lib/conditions";
import { PAGE_TITLES, resolveIndexableTitle } from "../app/_lib/seo/page-titles";

const titles = new Map<string, string>();
let bad = 0;

function check(kind: string, path: string, title: string, desc: string) {
  const brand = (title.match(/Rutherford/g) || []).length;
  const problems: string[] = [];
  if (title.length > 60) problems.push(`title ${title.length}`);
  if (brand !== 1) problems.push(`brand ${brand}`);
  if (desc.length > 160) problems.push(`meta ${desc.length}`);
  if (desc.length < 110) problems.push(`meta short ${desc.length}`);
  if (titles.has(title) && titles.get(title) !== path) problems.push(`dup of ${titles.get(title)}`);
  titles.set(title, path);
  if (problems.length) {
    bad += 1;
    console.log(kind, path, problems.join(", "));
    console.log(" ", title);
    console.log(" ", desc);
  }
}

for (const [path, title] of Object.entries(PAGE_TITLES)) {
  check("page", path, title, "x".repeat(140));
}

for (const route of ROUTES) {
  const resolved = resolveIndexableTitle(route.path, route.meta?.title);
  if (route.category === "location-landing") {
    const expected = locationLandingTitle(route.path);
    if (resolved !== expected) {
      bad += 1;
      console.log("location title mismatch", route.path, resolved, expected);
    }
  } else if (PAGE_TITLES[route.path] !== resolved) {
    bad += 1;
    console.log("missing curated title", route.path, resolved);
  }
}

for (const condition of CONDITIONS) {
  const path = `/${condition.slug}/`;
  if (condition.metaTitle !== PAGE_TITLES[path]) {
    bad += 1;
    console.log("condition metaTitle drift", path, condition.metaTitle);
  }
}

const fittedA = resolveIndexableTitle(
  "/cms-only-alpha-post/",
  "How Spinal Decompression Can Help with a Very Long CMS Title - Chiropractic Murfreesboro TN",
);
const fittedB = resolveIndexableTitle(
  "/cms-only-beta-post/",
  "How Spinal Decompression Can Help with a Very Long CMS Title - Chiropractic Murfreesboro TN",
);
check("fit", "/cms-only-alpha-post/", fittedA, "x".repeat(140));
check("fit", "/cms-only-beta-post/", fittedB, "x".repeat(140));
if (fittedA === fittedB) {
  bad += 1;
  console.log("fitted titles collided", fittedA);
}

let indexable = 0;
for (const p of getAllPseoParams()) {
  const c = buildPseoContent(p);
  if (!c) continue;
  if (getCustomPseoContent(p.condition, p.city)) indexable += 1;
  check("pseo", `/${p.condition}/${p.city}/`, c.metaTitle, c.metaDescription);
}

let aud = 0;
for (const p of getAllPseoAudienceParams()) {
  const c = buildPseoAudienceContent(p);
  if (!c) continue;
  aud += 1;
  check("aud", `/${p.condition}/${p.city}/${p.audience}/`, c.metaTitle, c.metaDescription);
}

const locs = getAllLocationSlugs();
for (const slug of locs) {
  const title = locationLandingTitle(`/${slug}/`);
  if (!title) {
    bad += 1;
    console.log("missing loc", slug);
    continue;
  }
  check("loc", `/${slug}/`, title, "x".repeat(140));
}

const blogPaths = [
  "/i-just-stood-up-and-my-leg-gave-out-what-sciatica-pain-is-really-telling-you/",
  "/why-your-back-locks-up-when-you-try-to-stand-straight-and-what-its-really-telling-you/",
  "/the-hidden-link-between-lower-back-problems-and-neuropathy-in-your-feet-and-hands-and-why-no-one-told-you-earlier/",
  "/why-your-pain-moves-around-one-day-its-your-back-the-next-its-your-leg/",
  "/why-your-joints-pop-crack-or-click-when-you-move/",
  "/neuropathy-in-young-adults/",
  "/sciatica-while-driving-seat-setup-posture-treatment/",
  "/how-spinal-decompression-can-help-with-arthritis-and-numbness/",
  "/how-spinal-decompression-can-help-with-different-types-of-neuropathy/",
  "/chronic-pain-relief-with-massage-therapy-in-murfreesboro/",
];

for (const path of blogPaths) {
  const seo = blogSeoOverride(path);
  if (!seo) {
    bad += 1;
    console.log("missing blog", path);
    continue;
  }
  check("blog", path, seo.title, seo.description);
  const slug = path.replace(/^\/|\/$/g, "");
  const links = topicLinksForPost(slug, seo.title);
  if (links.links.length < 2) {
    bad += 1;
    console.log("few links", slug);
  }
}

const areas = buildAreasWeServe();
const areaHrefs = areas.flatMap((c) => c.conditions.map((x) => x.href));
const audienceFromAreas = areaHrefs.filter((h) => h.split("/").filter(Boolean).length >= 3);

const sample = buildPseoContent({
  condition: "degenerative-disc-disease",
  city: "blackman-murfreesboro",
});
const sampleAud = buildPseoAudienceContent({
  condition: "bulging-disc",
  city: "blackman-murfreesboro",
  audience: "athletes",
});

if (bad > 0) process.exitCode = 1;

console.log(
  JSON.stringify(
    {
      bad,
      indexable,
      aud,
      locs: locs.length,
      areaCities: areas.length,
      areaLinks: areaHrefs.length,
      audienceFromAreas: audienceFromAreas.length,
      sampleTitle: sample?.metaTitle,
      sampleTitleLen: sample?.metaTitle.length,
      sampleMetaLen: sample?.metaDescription.length,
      sampleAudTitle: sampleAud?.metaTitle,
      sampleAudLen: sampleAud?.metaTitle.length,
      sampleAudMeta: sampleAud?.metaDescription.length,
      sampleLoc: locationLandingTitle("/spinal-decompression-brentwood-tn/"),
      readingSciatica: readingForPage("sciatica").length,
    },
    null,
    2,
  ),
);
