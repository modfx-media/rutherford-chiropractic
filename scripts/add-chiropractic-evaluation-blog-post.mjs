// One-off: add "what-to-expect-at-a-chiropractic-evaluation-in-murfreesboro" (2026-09-21).
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SLUG = "what-to-expect-at-a-chiropractic-evaluation-in-murfreesboro";
const PATH_ = `/${SLUG}/`;
const TITLE = "What to Expect at a Chiropractic Evaluation in Murfreesboro";
const DESCRIPTION =
  "Learn what happens during your first visit, including history, exam, and imaging when needed, for chiropractic care in Murfreesboro and pain relief plans";
const CATEGORY = "Chiropractic Care";
const PUBLISHED_AT = "2026-09-21T17:00:00+00:00";
const IMAGE_SRC = `/media/blog/${SLUG}-featured.jpg`;
const IMAGE_ALT = "Woman with low back pain carrying a grocery bag";
const ORIGIN = "https://rutherfordchiropractic.com";

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) break;
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  throw new Error("Could not read JPEG dimensions");
}

const srcImage = path.join(ROOT, "public/images/blog/Gemini_Generated_Image_o9otcdo9otcdo9ot.jpg");
const destDir = path.join(ROOT, "public/media/blog");
mkdirSync(destDir, { recursive: true });
const destImage = path.join(destDir, `${SLUG}-featured.jpg`);
copyFileSync(srcImage, destImage);
const { width: IMAGE_WIDTH, height: IMAGE_HEIGHT } = jpegSize(readFileSync(destImage));

const blogDataPath = path.join(ROOT, "app/_lib/blog-data.json");
const blogData = JSON.parse(readFileSync(blogDataPath, "utf8"));
if (!blogData.some((p) => p.slug === SLUG)) {
  blogData.unshift({
    slug: SLUG,
    path: PATH_,
    title: TITLE,
    category: CATEGORY,
    publishedAt: PUBLISHED_AT,
    featuredImage: {
      src: IMAGE_SRC,
      alt: IMAGE_ALT,
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
    },
    excerpt: DESCRIPTION,
  });
  writeFileSync(blogDataPath, JSON.stringify(blogData, null, 2) + "\n");
}

const bodyDataPath = path.join(ROOT, "app/_lib/blog-body.json");
const bodyData = JSON.parse(readFileSync(bodyDataPath, "utf8"));

const h2 = (text) => `<h2 class="wp-block-heading"><strong>${text}</strong></h2>`;
const p = (html) => `<p class="wp-block-paragraph">${html}</p>`;
const ul = (items) =>
  `<ul class="wp-block-list">\n${items.map((i) => `<li>${i}</li>`).join("\n\n\n\n")}\n</ul>`;

const sections = [
  h2("Start Your Chronic Pain Relief Journey Confidently"),
  p(
    "Chronic pain can wear you down. Neck pain, low back pain, headaches, sciatica, and aching joints can all make work, family time, and simple daily tasks feel harder than they should. When pain sticks around for months, it often affects sleep, mood, and energy too."
  ),
  p(
    "Many people put off getting help. They may feel nervous about what will happen at a first visit, or worry they will be rushed, judged, or pushed into care that does not feel right. Knowing exactly what an initial chiropractic evaluation includes can take away a lot of that stress and help you feel more in control."
  ),
  p(
    "Our team focuses on whole-person, non-invasive chiropractic care in Murfreesboro, with attention on root causes instead of quick symptom cover-ups. At the first visit, we take time to learn your story, examine how your spine and nerves are working, use imaging when it is actually helpful, and build a personalized plan that fits your real life and schedule."
  ),

  h2("What to Expect From Your First Visit"),
  p(
    "When you walk into a new office with chronic pain, feeling at ease matters. Our goal is to create a calm, low-pressure space where you can speak freely and move at a comfortable pace, even if you are nervous about chiropractic for the first time."
  ),
  p("A typical first visit usually follows a simple flow:"),
  ul([
    "Check-in and new patient paperwork",
    "One-on-one consultation about your pain and health history",
    "Physical and neurological exams",
    "Imaging if it is appropriate",
    "Discussion of what we found and next steps",
  ]),
  p("To feel prepared, it helps to bring:"),
  ul([
    "Insurance information",
    "A list of current medications and supplements",
    "Any past X-ray, MRI, or other imaging reports you have",
    "Comfortable clothing you can move in",
  ]),
  p(
    "Many people wonder if they will get adjusted on day one. That depends on your case. If we need imaging first, or if something in your history suggests we should pause, we will tell you clearly. Exams are done with respect for your pain levels, and we explain what we are doing as we go. Costs and insurance details are discussed up front so there are no surprises later."
  ),

  h2("Your Story Matters Most: Thorough Health History"),
  p("The first real step is a detailed conversation. We want to understand:"),
  ul([
    "Where your pain is",
    "What it feels like",
    "How intense it is",
    "What makes it better or worse",
  ]),
  p("We will ask how your pain affects:"),
  ul([
    "Work duties or school",
    "Household chores and yardwork",
    "Exercise and hobbies",
    "Sleep and focus",
  ]),
  p(
    "Past events matter too. Old injuries, car accidents, surgeries, pregnancies, sports, or repetitive job tasks can all add up over time and show up years later as chronic spine or joint problems."
  ),
  p("We also talk about lifestyle factors such as:"),
  ul([
    "Desk posture and screen time",
    "Lifting habits and physical workload",
    "Regular exercise or lack of it",
    "Stress levels and coping habits",
    "Sleep patterns and mattress comfort",
    "Seasonal activities like outdoor work, school sports, or frequent travel",
  ]),
  p(
    "This whole-person history helps us connect the dots between your nerves, joints, and muscles. It also helps us shape care that fits your routine in Murfreesboro, including busy seasons at work, school events, and family demands, instead of forcing you into a generic plan that ignores real-life pressure."
  ),

  h2("Gentle Exams That Look Beyond the Pain"),
  p(
    "After the conversation, we move into exams that look not only at where it hurts, but at how your body is moving as a whole. We usually start with a basic posture and gait assessment, watching how you stand and walk. This can reveal if you are favoring one side, leaning forward, or carrying your head in front of your shoulders."
  ),
  p("Physical tests may include:"),
  ul([
    "Spinal range of motion, like bending and turning within your comfort",
    "Muscle tone and flexibility checks",
    "Joint movement testing to see which areas are stiff or irritated",
    "Palpation, which means gently feeling along muscles and joints for tension or tenderness",
  ]),
  p("We often add simple neurological checks, such as:"),
  ul([
    "Reflex testing",
    "Light touch or pin sensation checks on arms and legs",
    "Balance or coordination tests",
    "Orthopedic tests that help point to disc, nerve, or joint issues",
  ]),
  p(
    "Everything is done within your tolerance. If something hurts, you can say so and we will adjust what we are doing. We explain each step in plain language so you know what we are checking and why it matters. These findings help confirm what may be driving your pain and guide whether chiropractic adjustments, spinal decompression, rehab exercises, or other tools are likely to help."
  ),

  h2("When Imaging Helps Clarify the Root Cause"),
  p("Imaging is sometimes helpful, but it is not a default step for everyone. We may recommend X-rays or an MRI if:"),
  ul([
    "There is a history of trauma or a serious fall",
    "Pain is severe and long-standing",
    "You have red-flag symptoms like major weakness or certain changes in bowel or bladder control",
    "We suspect disc problems or significant joint degeneration",
    "Prior care has not helped and the reason is not clear",
  ]),
  p(
    "Imaging gives a picture of spinal alignment, disc spacing, and joint wear that may be adding to chronic pain. It can also help rule out serious problems. Our focus is to use imaging as a tool, not as the main driver of care."
  ),
  p(
    "When we review imaging, we talk through what we see in clear terms, and we connect those findings to how you feel during your normal day. The goal is a safety-first, conservative approach that makes sure any chiropractic care in Murfreesboro is appropriate, targeted, and designed to protect your long-term spinal health."
  ),

  h2("Building Your Personalized Chiropractic Care Plan"),
  p(
    "Once we have your history, exam findings, and any needed imaging, we put all the pieces together. This leads to a clear working diagnosis and a customized care plan. Depending on what you need, your plan may include:"
  ),
  ul([
    "Chiropractic adjustments to improve joint motion",
    "Spinal decompression to gently relieve pressure on certain areas of the spine",
    "Soft tissue work to calm tight or irritated muscles",
    "Rehab exercises to support strength, stability, and flexibility",
  ]),
  p(
    "We talk about how often visits are recommended at first and how long that phase is expected to last. We also set progress checkpoints to see how you are responding and to adjust the plan if needed."
  ),
  p("Lifestyle guidance is often part of care too. That can include:"),
  ul([
    "Simple home stretching routines",
    "Ergonomic tips for desk or remote work",
    "Safer ways to lift, carry, or do chores",
    "Strategies to protect your back during busier seasons",
  ]),
  p(
    "Our goal is not only less pain. We want better function, more resilience, and a stronger base for long-term wellness so you can stay active at work, at home, and at community events around Murfreesboro without always worrying about the next flare-up."
  ),

  h2("Take the Next Step Toward Relief in Murfreesboro"),
  p(
    "Living with chronic pain can make every season feel harder than it should. Knowing what to expect at an initial chiropractic evaluation can make it easier to take that first step. A careful history, gentle exams, and thoughtful use of imaging all come together to give you answers and options."
  ),
  p(
    "At Rutherford Spine &amp; Wellness Center, we are here to help you understand what is going on with your spine, joints, and nerves, and to build a plan that fits your life. When you feel informed and heard, it is easier to move forward with confidence and work toward getting back to the activities you enjoy."
  ),

  h2("Start Relieving Pain And Restoring Your Active Life Today"),
  p(
    "If pain or stiffness is holding you back, we are here at Rutherford Spine &amp; Wellness Center to help you move with confidence again. Learn how personalized chiropractic care in Murfreesboro can address the root cause of your discomfort and support long-term wellness. Ready to talk with our team and schedule a visit that fits your routine? Simply contact us and we will help you take the next step toward feeling better."
  ),
];

bodyData[SLUG] = sections.join("\n\n\n\n");
writeFileSync(bodyDataPath, JSON.stringify(bodyData, null, 2) + "\n");

const cmPath = path.join(ROOT, "content-map.json");
const cm = JSON.parse(readFileSync(cmPath, "utf8"));

const routeEntry = {
  path: PATH_,
  url: `${ORIGIN}${PATH_}`,
  lastmod: PUBLISHED_AT,
  source: "post",
  category: "blog-post",
  fetchError: null,
  meta: {
    title: TITLE,
    description: DESCRIPTION,
    canonical: `${ORIGIN}${PATH_}`,
    robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      image: IMAGE_SRC,
      type: "article",
    },
    twitter: { card: "summary_large_image" },
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["Person", "Organization"],
            "@id": `${ORIGIN}/#person`,
            name: "Chiropractic Murfreesboro TN",
          },
          {
            "@type": "WebSite",
            "@id": `${ORIGIN}/#website`,
            url: ORIGIN,
            name: "Chiropractic Murfreesboro TN",
            publisher: { "@id": `${ORIGIN}/#person` },
            inLanguage: "en-US",
          },
          {
            "@type": "ImageObject",
            "@id": `${ORIGIN}${IMAGE_SRC}`,
            url: `${ORIGIN}${IMAGE_SRC}`,
            width: String(IMAGE_WIDTH),
            height: String(IMAGE_HEIGHT),
            caption: IMAGE_ALT,
            inLanguage: "en-US",
          },
          {
            "@type": "WebPage",
            "@id": `${ORIGIN}${PATH_}#webpage`,
            url: `${ORIGIN}${PATH_}`,
            name: TITLE,
            datePublished: PUBLISHED_AT,
            dateModified: PUBLISHED_AT,
            isPartOf: { "@id": `${ORIGIN}/#website` },
            primaryImageOfPage: { "@id": `${ORIGIN}${IMAGE_SRC}` },
            inLanguage: "en-US",
          },
          {
            "@type": "Person",
            "@id": `${ORIGIN}/author/palashseo/`,
            name: "Palash",
            url: `${ORIGIN}/author/palashseo/`,
          },
          {
            "@type": "BlogPosting",
            headline: TITLE,
            datePublished: PUBLISHED_AT,
            dateModified: PUBLISHED_AT,
            articleSection: CATEGORY,
            author: { "@id": `${ORIGIN}/author/palashseo/`, name: "Palash" },
            publisher: { "@id": `${ORIGIN}/#person` },
            description: DESCRIPTION,
            name: TITLE,
            "@id": `${ORIGIN}${PATH_}#richSnippet`,
            isPartOf: { "@id": `${ORIGIN}${PATH_}#webpage` },
            image: { "@id": `${ORIGIN}${IMAGE_SRC}` },
            inLanguage: "en-US",
            mainEntityOfPage: { "@id": `${ORIGIN}${PATH_}#webpage` },
          },
        ],
      },
    ],
  },
};

if (!cm.routes.some((r) => r.path === PATH_)) {
  cm.routes.splice(1, 0, routeEntry);
  cm.totals.all += 1;
  cm.totals["blog-post"] += 1;
  cm.totals.routes += 1;
  if (Array.isArray(cm.grouped?.["blog-post"])) {
    cm.grouped["blog-post"].unshift(routeEntry);
  }
  writeFileSync(cmPath, JSON.stringify(cm, null, 2) + "\n");
}

const pageDir = path.join(ROOT, "app", SLUG);
mkdirSync(pageDir, { recursive: true });
const pageFile = path.join(pageDir, "page.tsx");
if (!existsSync(pageFile)) {
  writeFileSync(pageFile, "");
}

console.log("Done:", SLUG, `${IMAGE_WIDTH}x${IMAGE_HEIGHT}`);
