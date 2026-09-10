// One-off: add "7-day-home-plan-for-chronic-pain-relief-in-murfreesboro" (2026-09-01)
// and "chronic-pain-care-tips-for-murfreesboro-patients" (2026-09-08) blog posts,
// and backfill featuredImage on 9 legacy WP posts that never had one (rendered
// as blank gray cards on /blog/).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ORIGIN = "https://rutherfordchiropractic.com";

const h2 = (text) => `<h2 class="wp-block-heading"><strong>${text}</strong></h2>`;
const p = (html) => `<p class="wp-block-paragraph">${html}</p>`;
const ul = (items) =>
  `<ul class="wp-block-list">\n${items.map((i) => `<li>${i}</li>`).join("\n\n\n\n")}\n</ul>`;

const NEW_POSTS = [
  {
    slug: "7-day-home-plan-for-chronic-pain-relief-in-murfreesboro",
    path: "/7-day-home-plan-for-chronic-pain-relief-in-murfreesboro/",
    title: "7-Day Home Plan for Chronic Pain Relief in Murfreesboro",
    category: "Back Pain",
    publishedAt: "2026-09-01T17:00:00+00:00",
    imageSrc: "/media/blog/7-day-home-plan-for-chronic-pain-relief-in-murfreesboro-featured.png",
    imageAlt: "7-Day Home Pain Relief Plan",
    imageWidth: 1280,
    imageHeight: 720,
    excerpt:
      "Follow a simple 7-day routine for chronic pain relief in Murfreesboro, TN with sleep setup, walking doses, heat/ice timing, and posture tips",
    sections: [
      h2("Reset Your Week: A 7-Day Non-Drug Pain Relief Plan"),
      p(
        "Chronic pain can make even a normal day feel hard. When pain keeps showing up for more than a few months, it can change how you move, how you sleep, and how you feel about your body. Many people reach for pain pills first, but simple, steady changes in how you move and how you set up your home can calm pain signals without adding more medication."
      ),
      p(
        "Late summer around Murfreesboro is a natural reset point. Routines are shifting, kids are heading back to school, traffic and screen time are picking up again. This is a good time to put a simple plan in place before life gets even busier. What we are sharing here is a chiropractor-approved 7-day starter plan that focuses on movement snacks and small ergonomic tweaks you can do at home. It is not a cure, but it can help cut down flare-ups and support long-term chronic pain relief in Murfreesboro, TN."
      ),
      p(
        "Movement snacks are short bits of movement you sprinkle through your day, and they are often easier on painful joints than one long, intense workout. Ergonomic tweaks are small changes to your sleep setup, desk, car, and couch that keep your spine in a safer, more relaxed position. Together, these tools help your body feel safer, which often means less guarding, less muscle tension, and less pain over time."
      ),

      h2("Day 1, 2: Reset Your Sleep Setup for Overnight Healing"),
      p(
        "Sleep is when your body does most of its repair work. If your mattress, pillow, or sleep habits are off, your body can spend the night fighting instead of healing. Start by checking your mattress and pillow for a few common signs that your setup is working against you:"
      ),
      ul([
        "Look for sagging spots or deep body dents",
        "Notice if you wake with more neck or back stiffness than when you went to bed",
        "Check if you need two or three pillows to get comfortable",
      ]),
      p(
        "If your mattress sags, you can try a few short-term fixes to improve support while you consider longer-term options:"
      ),
      ul([
        "Placing a plywood board or firm support under the sagging area",
        "Rotating or flipping the mattress if the design allows",
        "Using a folded towel under your hips or low back to fill a gap",
      ]),
      p(
        "If the pillow is the bigger issue, a small towel roll can be a simple way to add targeted support without buying anything new. For neck support, roll a hand towel and place it inside your pillowcase at the bottom so it sits under your neck, not under your head. For low back relief, place a towel roll under your knees if you sleep on your back or between your knees if you sleep on your side."
      ),
      p(
        "Next, aim for a neutral spine position based on how you sleep. Side sleepers do best with a pillow that keeps the nose in line with the center of the chest, not tipped up or down, and a pillow or folded blanket between the knees so the top leg does not twist the low back. Back sleepers usually feel better with a flat to medium pillow so the chin is not pushed to the chest, plus a pillow or rolled towel under the knees to relax the low back. Stomach sleeping is the hardest on the spine; if you cannot change yet, use a very thin pillow or none under the head and place a small pillow under one hip to reduce low back twist."
      ),
      p("To finish Day 1 and Day 2, add a gentle evening wind-down that signals your nervous system to downshift:"),
      ul([
        "Do light stretching for 5 to 10 minutes, focused on hips, chest, and neck",
        "Use mild heat on stiff muscles for about 10 to 15 minutes, but avoid very hot packs that redden the skin",
        "For sharp, recent flare-ups, a short round of ice wrapped in a thin towel may feel better",
        "Try to limit bright screens at least 30 to 60 minutes before bed so your brain and nerves can calm",
      ]),

      h2("Day 3, 4: Walking Doses and Gentle Movement That Calm Pain"),
      p(
        "Your body often responds better to small, regular movement than to big bursts of activity once or twice a week. In hot late-summer weather, shorter walks can also be easier to manage without overheating. Instead of trying to &#8220;do it all at once,&#8221; think in walking doses:"
      ),
      ul([
        "Aim for 5 to 10 minutes at a time, at a pace that lets you talk in full sentences",
        "Choose cooler times of day, like early morning or later evening",
        "Stay in shaded routes or indoor areas if heat or humidity triggers your pain",
      ]),
      p(
        "If it helps to see how that fits into a real day, here is one sample movement day you can borrow and adjust:"
      ),
      ul([
        "Morning: 5 to 7-minute walk near your home, plus 5 gentle chin tucks and 10 shoulder blade squeezes",
        "Midday: Stand up every 45 to 60 minutes for a 2 to 3 minute posture break and a short walk indoors",
        "Evening: Easy neighborhood stroll or store-walking lap, then a few light stretches before bed",
      ]),
      p("To keep yourself from accidentally overdoing it, use a simple 0 to 10 pain scale while you move:"),
      ul([
        "Try to keep pain during activity at or below a 3 or 4 out of 10",
        "If it rises above that and stays there, slow down or shorten the walk",
        "Mild muscle soreness the next day can be normal, sharp or spreading nerve pain is a signal to ease back",
      ]),
      p(
        "You can also add a few safe, low-impact moves that many people tolerate well. Move slowly, keep the effort gentle, and focus on smooth breathing:"
      ),
      ul([
        "Pelvic tilts: Lie on your back with knees bent. Gently flatten your low back into the surface as you breathe out, then relax as you breathe in. Repeat 8 to 10 times.",
        "Chin tucks: Sitting or standing tall, draw your chin straight back like you are making a double chin, hold for a few seconds, then relax. Repeat 8 to 10 times.",
        "Shoulder blade squeezes: While sitting or standing, gently squeeze your shoulder blades together and down, hold for a few seconds, then relax. Repeat 8 to 10 times.",
      ]),
      p("Stop these movements and get checked if any red-flag symptoms show up:"),
      ul([
        "Pain shoots down an arm or leg",
        "You notice new numbness, tingling, or weakness",
        "Your pain spikes and does not settle within a short time after stopping",
      ]),

      h2("Day 5: Heat, Ice, and Timing Your Relief the Smart Way"),
      p(
        "Heat and ice can both help, but using them the wrong way can stir things up. A few simple rules of thumb can help you match the tool to the situation:"
      ),
      ul([
        "Ice is usually better for recent flare-ups, sharp pain, or swelling",
        "Heat is usually better for stiff, achy muscles or long-term arthritis-type pain",
        "Nerve pain can be tricky; sometimes gentle heat around, not directly on, the painful area feels safer",
      ]),
      p(
        "Timing matters as much as the temperature. Use a straightforward plan that protects your skin and helps the effect last:"
      ),
      ul([
        "Keep both heat and ice sessions to about 10 to 15 minutes at a time",
        "Always place a thin cloth between your skin and the pack",
        "Give your skin time to return to normal temperature between sessions",
        "Pair heat with easy stretching, and pair ice with a short rest or slow walk afterward",
      ]),
      p(
        "Late summer adds its own challenges in Murfreesboro, especially if you are already warm and inflamed from being outside or sitting in traffic. Keep these local-season tips in mind:"
      ),
      ul([
        "If you are already hot from yard work, sports, or traffic, skip extra heat right away; use ice or a cool shower first",
        "Use heat later in the day once your body has cooled, if stiffness sets in",
        "Get same-day evaluation if you notice severe swelling, sudden loss of strength, or pain that feels like a tearing or ripping event",
      ]),

      h2("Day 6, 7: Fix Your Desk, Car, and Couch Posture"),
      p(
        "Now it is time to look at where you spend much of your day: desk, car, and couch. Small changes here can take a lot of pressure off your spine, especially when you repeat them daily. Start with desk setup basics:"
      ),
      ul([
        "Top of your screen near eye level so you are not looking down for hours",
        "Elbows close to your sides, bent about 90 degrees, wrists relaxed, not cocked up",
        "Hips slightly higher than your knees, with your back against the chair",
        "A small pillow or rolled towel behind your low back for lumbar support",
        "Feet flat on the floor or on a small footrest, not hanging",
      ]),
      p(
        "Driving posture matters too, particularly with daily commutes and school drop-offs. The goal is to stay supported and avoid creeping forward over the steering wheel:"
      ),
      ul([
        "Slide the seat so you can press the pedals without locking your knee",
        "Slight bend in your elbows when holding the steering wheel",
        "Headrest adjusted so the middle rests near the back of your head",
        "Sit back so your shoulders touch the seat, not hunched forward",
        "At long red lights, you can do small shoulder rolls or gentle chin tucks",
      ]),
      p(
        "Finally, make &#8220;relaxing&#8221; at home a little smarter so the couch does not become a pain trigger. The key is support plus frequent small position changes:"
      ),
      ul([
        "Avoid slumping deep into one corner of the couch for long periods",
        "Use a small cushion at your low back and keep both feet supported",
        "Try lying on your side with a pillow between your knees for part of TV time",
        "Change positions every 20 to 30 minutes and stand up for a quick stretch break",
      ]),

      h2("Turn Your 7-Day Reset Into a Long-Term Pain Strategy"),
      p(
        "Once you finish this 7-day plan, do not feel like you have to stop. You can repeat the week, add more walking doses, or slowly increase the time you spend on gentle exercises. Many people also do better when they track patterns, because chronic pain often flares for specific, repeatable reasons. Keep a small notebook or a note on your phone with:"
      ),
      ul([
        "When your pain flares up",
        "Which positions feel best and worst",
        "How sleep, stress, and activity affect symptoms",
      ]),
      p(
        "Bringing these notes to a chiropractic visit can help make your care more personal and focused on what your body is actually telling you day to day."
      ),
      p(
        "At Rutherford Spine &amp; Wellness Center, we build on these home strategies with non-invasive options like spinal decompression, targeted rehabilitation, care for neuropathy-related pain, and lifestyle coaching that fits real life in Murfreesboro, TN. When home changes and movement snacks are paired with a skilled, whole-person plan, your body often has a better chance to calm overactive pain signals and move toward steadier, drug-free relief."
      ),

      h2("Take The Next Step Toward Lasting Pain Relief"),
      p(
        `If ongoing discomfort is holding you back from work, family time, or the activities you love, we are ready to help you move forward. At Rutherford Spine &amp; Wellness Center, we offer personalized care focused on safe, effective <a href="/back-pain-relief/">chronic pain relief in Murfreesboro, TN</a>. Our team will take the time to understand your health history, explain your options clearly, and build a plan that fits your goals. To schedule your visit or ask questions, simply <a href="/contact-us/">contact us</a> today.`
      ),
    ],
  },
  {
    slug: "chronic-pain-care-tips-for-murfreesboro-patients",
    path: "/chronic-pain-care-tips-for-murfreesboro-patients/",
    title: "Chronic Pain Care Tips for Murfreesboro Patients",
    category: "Back Pain",
    publishedAt: "2026-09-08T17:00:00+00:00",
    imageSrc: "/media/blog/chronic-pain-care-tips-for-murfreesboro-patients-featured.jpeg",
    imageAlt: "Talking to Your Doctor About Chronic Pain",
    imageWidth: 681,
    imageHeight: 450,
    excerpt:
      "Learn how to talk to your doctor about chronic pain treatments in Murfreesboro, TN, including meds, imaging, and drug-free options.",
    sections: [
      h2("Start the Conversation About Your Chronic Pain with Confidence"),
      p(
        "Living with chronic pain is exhausting. Your body hurts, your energy is low, and on top of that, you are expected to keep up with appointments, test results, and decisions about medications. It can feel like a full-time job, and it is easy to leave the doctor&#8217;s office thinking, &#8220;I forgot to ask half of what I wanted to ask.&#8221;"
      ),
      p(
        "As the weather cools and routines shift in Murfreesboro, many people decide it is time to finally deal with nagging back pain, neck stiffness, or nerve pain before it gets worse. That is a smart move. Having a clear plan before pain flares up can make the months ahead much easier."
      ),
      p(
        "We want to share a simple, down-to-earth guide to help you talk with your doctor. You will learn how to get ready for your visit, how to ask clear questions about pain meds and imaging, and how to bring up non-drug options, including chiropractic and spinal decompression, as part of your plan for chronic pain relief in Murfreesboro, TN."
      ),

      h2("Get Ready Before You Go: Tracking, Goals, and Questions"),
      p(
        "A good visit starts before you ever walk into the office. When you show up with clear notes and goals, your doctor can understand you faster and help you better."
      ),
      p(
        "For 1 or 2 weeks before your appointment, try keeping a simple pain and function journal. It does not have to be fancy. A notebook or notes on your phone works fine. Write down things like:"
      ),
      ul([
        "Where the pain is and what it feels like",
        "What activities or weather seem to trigger it",
        "How you are sleeping and how rested you feel",
        "Your mood and stress level",
        "What makes the pain better or worse",
      ]),
      p("These notes give your doctor a real-life snapshot, not just a quick pain score in the office."),
      p(
        `Next, think about your goals. Instead of only saying &#8220;I want less pain,&#8221; ask yourself, &#8220;What do I want to be able to do?&#8221; For example, you might want to:`
      ),
      ul([
        "Walk a comfortable distance on the Greenway",
        "Sit through a football game without shifting every few minutes",
        "Stand long enough to cook dinner",
        "Pick up and play with your grandkids",
      ]),
      p(
        "When you share these kinds of goals, your doctor can shape a plan that fits your daily life, not just your X-ray."
      ),
      p("Before the visit, also:"),
      ul([
        "Write down a short list of your top 3 to 5 questions about medications, imaging, and non-drug options",
        "Bring an up-to-date list of your medications and supplements",
        "Bring any past imaging reports you have, like X-rays or MRIs",
      ]),
      p(
        "This helps avoid repeating tests and keeps the appointment focused on what matters most to you."
      ),

      h2("Talking Clearly About Pain Medications and Safety"),
      p(
        "Many people feel a bit nervous talking about pain meds, especially if they are worried about long-term use. Being open and honest is the safest path."
      ),
      p("Tell your doctor exactly what you are taking now, including:"),
      ul([
        "Over-the-counter meds like ibuprofen or acetaminophen",
        "Prescription pain meds or muscle relaxers",
        "How often you actually take them",
        "Side effects you notice, such as stomach upset, sleep problems, or brain fog",
      ]),
      p(
        "This honest picture helps your doctor see what is helping, what is not, and what might be unsafe over time, especially with long-term opioid use."
      ),
      p("You can ask clear, respectful questions like:"),
      ul([
        "What are the benefits and risks of this medication for me?",
        "Is this meant for short-term or long-term use?",
        "Are there non-drug options we can try along with or instead of this?",
      ]),
      p(
        `If you are already on pain meds and feel worried about side effects, dependency, or feeling &#8220;out of it,&#8221; say so directly. You might say, &#8220;I am concerned about being on this dose long term. Can we talk about tapering, changing the plan, or adding other treatments?&#8221;`
      ),
      p(
        "It can also be reasonable to ask when a referral to a pain specialist, neurologist, or another provider would make sense, or when a second opinion might help you feel more confident about your plan."
      ),

      h2("Making Sense of X-Rays, MRIs, and Other Imaging"),
      p(
        "Imaging can be helpful, but it can also be confusing and sometimes unnecessary. Not every ache needs an X-ray, and not every backache needs an MRI."
      ),
      p("Imaging is often most helpful when:"),
      ul([
        "There is a new, serious injury",
        "You have red-flag symptoms like sudden weakness, loss of bladder or bowel control, or major changes in sensation",
        "Nerve symptoms are getting worse or not changing at all over time",
      ]),
      p("When your doctor suggests imaging, good questions to ask include:"),
      ul([
        "What are you looking for with this test?",
        "How will the results change my treatment plan?",
        "Are there any risks or downsides, like radiation or tests I may not really need?",
      ]),
      p(
        "Many people already have old imaging that mentions things like bulging discs, arthritis, or degeneration. It is important to know that these findings do not always match the amount of pain you feel. Some people have scary-sounding reports and very little pain. Others have a lot of pain with fairly mild changes on imaging."
      ),
      p(
        "Talking about this with your doctor can open the door to more active, non-invasive approaches. Instead of rushing straight to injections or surgery, you can ask about options such as chiropractic care, supervised rehab exercises, and spinal decompression that may help you move and feel better over time."
      ),

      h2("Bringing up Chiropractic and Non-Drug Options Confidently"),
      p(
        "It is okay to say you want to focus more on natural and non-drug care where possible. You do not have to choose between your medical doctor and other types of care. They can work together."
      ),
      p(
        `You might say something like, &#8220;I would like to focus on more natural, whole-person options if we can. Can we talk about chiropractic, spinal decompression, or physical rehabilitation as part of my plan?&#8221;`
      ),
      p("Share your preferences and worries openly:"),
      ul([
        "You want to stay active and keep working or caring for family",
        "You hope to avoid long-term use of strong pain meds",
        "You want to delay or avoid surgery if that is safe",
        "You are interested in treatments that help the body move and heal better over time",
      ]),
      p(
        `Then ask, &#8220;How could non-drug options fit with what we are already doing?&#8221; This shows you are not trying to ignore medical care. You are trying to build a more complete plan.`
      ),
      p(
        "In Murfreesboro, chiropractic and related services, like spinal decompression, neuropathy care, and lifestyle guidance, can be part of a whole-person approach. A clinic like Rutherford Spine &amp; Wellness Center can work alongside your primary doctor to share information, respect your goals, and support the chronic pain relief in Murfreesboro, TN, that you are looking for."
      ),

      h2("Partnering with Your Care Team for the Long Haul"),
      p(
        "Chronic pain is usually not fixed in one visit. It is more like a long-term partnership between you and your care team, with steady check-ins and small adjustments along the way."
      ),
      p(
        "Medical care, chiropractic care, and lifestyle changes can work best when they are combined, not when they compete. Over time, this kind of teamwork can help you:"
      ),
      ul([
        "Understand your body&#8217;s patterns",
        "Catch flare-ups early",
        "Adjust medications and therapies as your life changes",
        "Stay focused on the daily activities and personal goals that matter most",
      ]),
      p(
        "As seasons change and stress levels rise and fall, your plan can change too. Keep bringing your pain journal, your updated goals, and your questions to each visit. This keeps you in the driver&#8217;s seat, speaking up for what you need."
      ),
      p(
        "At Rutherford Spine &amp; Wellness Center, we focus on non-invasive, whole-person care for spine, joint, neuropathy, and chronic pain conditions. We are here in Murfreesboro to help you explore a personalized plan that fits your life, supports your other medical care, and helps you feel more confident every time you talk with your healthcare team."
      ),

      h2("Start Your Path To Lasting Pain Relief Today"),
      p(
        `If chronic pain is limiting your life, we are here to help you find real solutions that fit your needs and goals. Learn how our personalized approach to <a href="/back-pain-relief/">chronic pain relief in Murfreesboro, TN</a> can help you move more comfortably and get back to what matters most. At Rutherford Spine &amp; Wellness Center, we take time to understand your health history and design care that supports long-term wellness. Ready to take the next step toward feeling better? <a href="/contact-us/">Contact us</a> to schedule your visit.`
      ),
    ],
  },
];

// Legacy WP posts that migrated with no featured image at all (rendered as
// blank gray cards on /blog/) — backfill with a thematically matching image
// already used elsewhere on the site.
const IMAGE_BACKFILLS = {
  "fixing-work-related-spine-misalignment-with-spinal-decompression": {
    src: "/media/blog/how-spinal-decompression-can-help-with-spine-misalignment-from-work-injuries-featured.jpg",
    alt: "Spine Misalignment",
    width: 1080,
    height: 675,
  },
  "neuropathy-murfreesboro-tn": {
    src: "/media/blog/signs-of-neuropathy-featured.jpg",
    alt: "Neuropathy",
    width: 1080,
    height: 675,
  },
  "chiropractors-murfreesboro-tn": {
    src: "/media/blog/when-to-see-chiropractor-featured.jpg",
    alt: "Chiropractor",
    width: 1080,
    height: 675,
  },
  "chiropractic-spinal-decompression-murfreesboro-tn": {
    src: "/media/blog/chronic-back-pain-needs-spinal-decompression-featured.jpg",
    alt: "Spinal Decompression",
    width: 1080,
    height: 675,
  },
  "chiropractic-care-for-sports-injuries-murfreesboro-tn": {
    src: "/media/blog/preventing-summer-sports-injuries-featured.jpg",
    alt: "Sports Injury",
    width: 1080,
    height: 675,
  },
  "best-chiropractor-murfreesboro-tn": {
    src: "/media/blog/everyday-habits-quietly-damage-spine-featured.jpg",
    alt: "Chiropractor",
    width: 1080,
    height: 675,
  },
  "car-injury-chiropractic-care-murfreesboro-tn": {
    src: "/media/blog/neck-pain-after-car-accident-needs-chiropractor-featured.jpg",
    alt: "Car Injury",
    width: 1080,
    height: 675,
  },
  "chiropractic-care-murfreesboro-tn": {
    src: "/media/blog/pain-medication-chiropractic-care-featured.jpg",
    alt: "Chiropractic Care",
    width: 1080,
    height: 675,
  },
  "sports-injury-chiropractor-mufreesboro-tn": {
    src: "/media/blog/choosing-spine-doctor-after-sports-injury-featured.jpg",
    alt: "Sports Injury",
    width: 1080,
    height: 675,
  },
};

function buildRouteEntry(post) {
  return {
    path: post.path,
    url: `${ORIGIN}${post.path}`,
    lastmod: post.publishedAt,
    source: "post",
    category: "blog-post",
    fetchError: null,
    meta: {
      title: post.title,
      description: post.excerpt,
      canonical: `${ORIGIN}${post.path}`,
      robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
      openGraph: {
        title: post.title,
        description: post.excerpt,
        image: post.imageSrc,
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
              "@id": `${ORIGIN}${post.imageSrc}`,
              url: `${ORIGIN}${post.imageSrc}`,
              width: String(post.imageWidth),
              height: String(post.imageHeight),
              caption: post.imageAlt,
              inLanguage: "en-US",
            },
            {
              "@type": "WebPage",
              "@id": `${ORIGIN}${post.path}#webpage`,
              url: `${ORIGIN}${post.path}`,
              name: post.title,
              datePublished: post.publishedAt,
              dateModified: post.publishedAt,
              isPartOf: { "@id": `${ORIGIN}/#website` },
              primaryImageOfPage: { "@id": `${ORIGIN}${post.imageSrc}` },
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
              headline: post.title,
              datePublished: post.publishedAt,
              dateModified: post.publishedAt,
              articleSection: post.category,
              author: { "@id": `${ORIGIN}/author/palashseo/`, name: "Palash" },
              publisher: { "@id": `${ORIGIN}/#person` },
              description: post.excerpt,
              name: post.title,
              "@id": `${ORIGIN}${post.path}#richSnippet`,
              isPartOf: { "@id": `${ORIGIN}${post.path}#webpage` },
              image: { "@id": `${ORIGIN}${post.imageSrc}` },
              inLanguage: "en-US",
              mainEntityOfPage: { "@id": `${ORIGIN}${post.path}#webpage` },
            },
          ],
        },
      ],
    },
  };
}

// --- 1. blog-data.json: prepend new meta entries (newest-first order) ---
const blogDataPath = path.join(ROOT, "app/_lib/blog-data.json");
const blogData = JSON.parse(readFileSync(blogDataPath, "utf8"));

// Sort newest-first (Sept 8 before Sept 1), then unshift so both land above
// the current newest post.
const sortedNewPosts = [...NEW_POSTS].sort(
  (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
);
for (const post of sortedNewPosts) {
  if (!blogData.some((p) => p.slug === post.slug)) {
    blogData.unshift({
      slug: post.slug,
      path: post.path,
      title: post.title,
      category: post.category,
      publishedAt: post.publishedAt,
      featuredImage: {
        src: post.imageSrc,
        alt: post.imageAlt,
        width: post.imageWidth,
        height: post.imageHeight,
      },
      excerpt: post.excerpt,
    });
  }
}

// Backfill missing featuredImage on legacy posts.
for (const entry of blogData) {
  const backfill = IMAGE_BACKFILLS[entry.slug];
  if (backfill && entry.featuredImage === null) {
    entry.featuredImage = backfill;
  }
}

writeFileSync(blogDataPath, JSON.stringify(blogData, null, 2) + "\n");

// --- 2. blog-body.json: add sanitized WP-style HTML bodies ---
const bodyDataPath = path.join(ROOT, "app/_lib/blog-body.json");
const bodyData = JSON.parse(readFileSync(bodyDataPath, "utf8"));
for (const post of NEW_POSTS) {
  bodyData[post.slug] = post.sections.join("\n\n\n\n");
}
writeFileSync(bodyDataPath, JSON.stringify(bodyData, null, 2) + "\n");

// --- 3. content-map.json: add route entries + update totals + grouped copy ---
const cmPath = path.join(ROOT, "content-map.json");
const cm = JSON.parse(readFileSync(cmPath, "utf8"));

for (const post of sortedNewPosts) {
  if (cm.routes.some((r) => r.path === post.path)) continue;
  const routeEntry = buildRouteEntry(post);
  cm.routes.splice(1, 0, routeEntry); // right after "/" home route
  cm.totals.all += 1;
  cm.totals["blog-post"] += 1;
  cm.totals.routes += 1;
  if (Array.isArray(cm.grouped?.["blog-post"])) {
    cm.grouped["blog-post"].unshift(routeEntry);
  }
}
writeFileSync(cmPath, JSON.stringify(cm, null, 2) + "\n");

// --- 4. Scaffold the page.tsx files (generate-blog-pages.mjs fills them in) ---
for (const post of NEW_POSTS) {
  const pageDir = path.join(ROOT, "app", post.slug);
  mkdirSync(pageDir, { recursive: true });
  const pageFile = path.join(pageDir, "page.tsx");
  if (!existsSync(pageFile)) {
    writeFileSync(pageFile, "");
  }
}

console.log("Done:", NEW_POSTS.map((p) => p.slug).join(", "));
console.log("Image backfills applied:", Object.keys(IMAGE_BACKFILLS).length);
