import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { schemaAssetUrl } from "../../_ui/blog/BlogPostingSchema";
import { ROUTES } from "../content-map";
import { CONDITIONS } from "../conditions";
import { PSEO_COMBINATIONS } from "../pseo/combinations";
import { getCustomPseoContent } from "../pseo/city-content";
import { PAGE_TITLES, resolveIndexableTitle } from "./page-titles";

/** Live titles for the 33 posts that only exist when the CMS is connected. */
export const CMS_POSTS: Array<[string, string]> = [
  ["/auto-injury-headaches-and-dizziness-signs-you-need-a-chiropractor/", "Auto Injury Headaches and Dizziness: Signs You Need a Chiropractor | Rutherford Spine & Wellness Center"],
  ["/chiropractic-care-for-chronic-pain-in-murfreesboro-what-to-expect/", "Chiropractic Care for Chronic Pain in Murfreesboro: What to Expect | Rutherford Spine & Wellness Center"],
  ["/choosing-a-spine-doctor-in-murfreesboro-after-a-sports-injury/", "Choosing a Spine Doctor in Murfreesboro After a Sports Injury | Rutherford Spine & Wellness Center"],
  ["/choosing-pain-management-in-murfreesboro-after-failed-back-surgery/", "Choosing Pain Management in Murfreesboro After Failed Back Surgery | Rutherford Spine & Wellness Center"],
  ["/chronic-pain-in-murfreesboro-how-to-talk-to-your-doctor-about-treatment/", "Chronic Pain in Murfreesboro: How to Talk to Your Doctor About Treatment | Rutherford Spine & Wellness Center"],
  ["/chronic-pain-red-flags-in-murfreesboro-when-chiropractors-should-refer/", "Chronic Pain Red Flags in Murfreesboro: When Chiropractors Should Refer | Rutherford Spine & Wellness Center"],
  ["/chronic-pain-relief-in-murfreesboro-self-assessment-to-find-the-cause/", "Chronic Pain Relief in Murfreesboro: Self-Assessment to Find the Cause | Rutherford Spine & Wellness Center"],
  ["/chronic-pain-when-to-see-a-chiropractor-in-murfreesboro/", "Chronic Pain? When to See a Chiropractor in Murfreesboro | Rutherford Spine & Wellness Center"],
  ["/everyday-habits-that-quietly-damage-your-spine-in-murfreesboro/", "Everyday Habits That Quietly Damage Your Spine in Murfreesboro | Rutherford Spine & Wellness Center"],
  ["/everyday-movements-that-quietly-aggravate-sciatica-pain/", "Everyday Movements That Quietly Aggravate Sciatica Pain | Rutherford Spine & Wellness Center"],
  ["/first-spinal-decompression-visit-in-murfreesboro-what-to-expect/", "First Spinal Decompression Visit in Murfreesboro: What to Expect | Rutherford Spine & Wellness Center"],
  ["/hidden-joint-pain-triggers-active-murfreesboro-residents-overlook/", "Hidden Joint Pain Triggers Active Murfreesboro Residents Overlook | Rutherford Spine & Wellness Center"],
  ["/inside-neuropathy-treatment-in-murfreesboro-without-drugs/", "Inside Neuropathy Treatment in Murfreesboro Without Drugs | Rutherford Spine & Wellness Center"],
  ["/massage-therapy-and-chiropractic-care-for-joint-pain-relief-in-murfreesboro/", "Massage Therapy and Chiropractic Care for Joint Pain Relief in Murfreesboro | Rutherford Spine & Wellness Center"],
  ["/massage-therapy-and-chiropractic-care-joint-pain/", "Joint Pain Relief Options in Murfreesboro, TN | Rutherford Spine & Wellness Center"],
  ["/massage-therapy-in-murfreesboro-tn-for-chronic-pain-relief/", "Massage Therapy in Murfreesboro TN for Chronic Pain Relief | Rutherford Spine & Wellness Center"],
  ["/neck-pain-treatment-in-murfreesboro-for-desk-and-remote-workers/", "Neck Pain Treatment in Murfreesboro for Desk and Remote Workers | Rutherford Spine & Wellness Center"],
  ["/non-drug-chronic-pain-relief-in-murfreesboro-7-day-movement-plan/", "Non-Drug Chronic Pain Relief in Murfreesboro: 7-Day Movement Plan | Rutherford Spine & Wellness Center"],
  ["/pain-management-after-failed-back-surgery/", "Non-Invasive Options After Failed Back Surgery | Rutherford Spine & Wellness Center"],
  ["/preventing-summer-sports-injuries-in-murfreesboro-warm-ups-and-prehab/", "Preventing Summer Sports Injuries in Murfreesboro: Warm-Ups and Prehab | Rutherford Spine & Wellness Center"],
  ["/questioning-back-pain-relief-plan/", "Back Pain Relief Steps to Reconsider in Murfreesboro | Rutherford Spine & Wellness Center"],
  ["/questioning-fibromyalgia-when-to-explore-chiropractic-care/", "Questioning Fibromyalgia? When to Explore Chiropractic Care | Rutherford Spine & Wellness Center"],
  ["/questioning-your-back-pain-relief-plan-in-murfreesboro-tn/", "Questioning Your Back Pain Relief Plan in Murfreesboro TN | Rutherford Spine & Wellness Center"],
  ["/recognizing-spinal-disc-pain-vs-muscle-strain-in-murfreesboro/", "Recognizing Spinal Disc Pain vs. Muscle Strain in Murfreesboro | Rutherford Spine & Wellness Center"],
  ["/reducing-reliance-on-pain-medication-chiropractic-care-and-safe-tapering/", "Reducing Reliance on Pain Medication: Chiropractic Care and Safe Tapering | Rutherford Spine & Wellness Center"],
  ["/rehabilitation-services-in-murfreesboro-for-chronic-spine-pain/", "Rehabilitation Services in Murfreesboro for Chronic Spine Pain | Rutherford Spine & Wellness Center"],
  ["/sciatica-morning-routine-10-minute-mobility-to-reduce-nerve-irritation/", "Sciatica Morning Routine: 10-Minute Mobility to Reduce Nerve Irritation | Rutherford Spine & Wellness Center"],
  ["/sciatica-morning-routine-10-minute-mobility/", "Ease Sciatica Fast With a 10-Minute Morning Routine | Rutherford Spine & Wellness Center"],
  ["/sciatica-while-driving-in-murfreesboro-seat-setup-posture-treatment/", "Sciatica While Driving in Murfreesboro: Seat Setup, Posture, Treatment | Rutherford Spine & Wellness Center"],
  ["/signs-your-sports-injury-needs-a-chiropractor-not-just-rest/", "Signs Your Sports Injury Needs a Chiropractor, Not Just Rest | Rutherford Spine & Wellness Center"],
  ["/understanding-whiplash-treatment-options-in-murfreesboro/", "Understanding Whiplash Treatment Options in Murfreesboro | Rutherford Spine & Wellness Center"],
  ["/when-neck-pain-after-a-car-accident-means-you-need-a-chiropractor/", "When Neck Pain After a Car Accident Means You Need a Chiropractor | Rutherford Spine & Wellness Center"],
  ["/why-your-chronic-back-pain-may-need-spinal-decompression/", "Why Your Chronic Back Pain May Need Spinal Decompression | Rutherford Spine & Wellness Center"],
];

const DANGLING = /\s(a|an|the|and|or|with|for|to|of|in|on|from|your|what|when|how|why|after|before|need|needs|may|very)\s*\|/i;

describe("indexable titles", () => {
  it("returns the same CMS title on every call", () => {
    for (const [path, raw] of CMS_POSTS) {
      const first = resolveIndexableTitle(path, raw);
      for (let i = 0; i < 5; i += 1) {
        assert.equal(resolveIndexableTitle(path, raw), first, path);
      }
    }
  });

  it("keeps CMS titles short, branded once, and free of clipped endings", () => {
    const seen = new Map<string, string>();
    for (const [path, raw] of CMS_POSTS) {
      const title = resolveIndexableTitle(path, raw);
      assert.ok(title.length <= 60, `${path} ${title.length} ${title}`);
      assert.equal((title.match(/Rutherford/g) || []).length, 1, title);
      assert.equal(title.endsWith(" | Rutherford"), true, title);
      assert.equal(DANGLING.test(title), false, title);
      assert.equal(/\bWhat Expect\b/.test(title), false, title);
      const other = seen.get(title);
      assert.equal(other, undefined, `${title} also used by ${other}`);
      seen.set(title, path);
      assert.equal(PAGE_TITLES[path], undefined);
    }
  });

  it("does not reuse a curated title for a different slug", () => {
    const title = resolveIndexableTitle(
      "/sciatica-morning-routine-10-minute-mobility/",
      "Sciatica Treatment in Murfreesboro | Rutherford Spine & Wellness Center",
    );
    assert.notEqual(title, PAGE_TITLES["/sciatica/"]);
    assert.equal(
      title,
      resolveIndexableTitle(
        "/sciatica-morning-routine-10-minute-mobility/",
        "Sciatica Treatment in Murfreesboro | Rutherford Spine & Wellness Center",
      ),
    );
    assert.ok(title.length <= 60, title);
  });
});

describe("schema asset URLs", () => {
  it("does not add a trailing slash to image files", () => {
    assert.equal(
      schemaAssetUrl("/media/blog/post-featured.jpg"),
      "https://rutherfordchiropractic.com/media/blog/post-featured.jpg",
    );
    assert.equal(
      schemaAssetUrl("/media/blog/post-featured.jpg/"),
      "https://rutherfordchiropractic.com/media/blog/post-featured.jpg",
    );
    assert.equal(
      schemaAssetUrl("https://cdn.example.com/featured.jpg/"),
      "https://cdn.example.com/featured.jpg",
    );
  });
});

describe("sitemap composition", () => {
  it("still has room for the 33 CMS posts on top of the static sitemap", () => {
    const staticUrls = new Set<string>([
      ...ROUTES.map((route) => route.path),
      ...CONDITIONS.map((condition) => `/${condition.slug}/`),
      ...PSEO_COMBINATIONS.filter((combo) =>
        getCustomPseoContent(combo.conditionSlug, combo.neighborhoodSlug),
      ).map((combo) => `/${combo.conditionSlug}/${combo.neighborhoodSlug}/`),
      "/areas-we-serve/",
      "/sitemap/",
    ]);
    for (const [path] of CMS_POSTS) {
      assert.equal(staticUrls.has(path), false, path);
    }
    assert.equal(staticUrls.size + CMS_POSTS.length, 433);
  });
});
