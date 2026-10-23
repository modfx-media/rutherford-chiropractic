/**
 * Conditions We Treat — a new content taxonomy (not present on the live
 * WordPress origin) that groups specific medical conditions separately
 * from the existing 6 core Services (Chiropractic, Spinal Decompression,
 * Neuropathy, Sports Injuries, Auto Injuries, Back Pain Relief).
 *
 * Content is synthesized from real information already crawled from
 * rutherfordchiropractic.com's blog posts (see `scraped/html/`), grounded
 * in the clinic's actual whole-person, non-invasive, chiropractic +
 * spinal-decompression approach. This is NOT verbatim-copied text (no
 * single source page covers "Sciatica" or "Whiplash" as a structured
 * condition page on the live site), but every clinical claim traces back
 * to a real blog post already published on the origin domain.
 *
 * Each condition gets:
 *   - a homepage carousel card (name + shortDescription + icon)
 *   - a dedicated SEO page at /{slug}/ using `ConditionPageTemplate`
 *   - a "Conditions" nav dropdown entry (see `app/_ui/nav.ts`)
 */

import { requirePageTitle } from "./seo/page-titles";

export type ConditionFaq = { question: string; answer: string };
export type ConditionTreatment = { title: string; description: string };

export type Condition = {
  slug: string;
  name: string;
  /** Short card blurb for the homepage carousel. */
  shortDescription: string;
  /** Eyebrow label + one-line hero subhead for the dedicated page. */
  heroEyebrow: string;
  heroDescription: string;
  overview: string[];
  symptoms: string[];
  causes: string[];
  treatments: ConditionTreatment[];
  benefits: string[];
  faqs: ConditionFaq[];
  /** Cross-link to an existing, already-slugged core service page. */
  relatedService: { label: string; href: string };
  metaTitle: string;
  metaDescription: string;
};

export const CONDITIONS: Condition[] = [
  {
    slug: "sciatica",
    name: "Sciatica",
    shortDescription:
      "Sharp, burning pain that radiates from your lower back through the hip and leg - often fueled by everyday sitting, lifting, and sleep habits.",
    heroEyebrow: "Condition We Treat",
    heroDescription:
      "Sciatica is more than ordinary back pain - it's that sharp, burning, or tingling feeling that starts in the lower back and travels through the hip and down the leg, sometimes all the way to the foot.",
    overview: [
      "Sciatica isn't just regular back pain. It's the sharp, burning, or tingling sensation that starts in the lower back, moves through the hip, and runs down the back of the leg - sometimes all the way to the foot. It can make simple things like standing up, getting out of the car, or walking across the yard feel hard.",
      "Most sciatica doesn't come from one big injury. It builds from small, repeated movements and postures throughout the day - how you sit at a desk, bend to lift something, stand for long periods, or sleep at night can all quietly irritate the sciatic nerve. At Rutherford Spine & Wellness Center, we focus on finding those root patterns instead of just chasing the pain.",
    ],
    symptoms: [
      "Sharp, burning, or electric pain from the low back through the hip and leg",
      "Numbness or tingling that travels down one leg",
      "Weakness in the leg or foot",
      "Pain that worsens with sitting or gets better when walking",
      "Difficulty standing up straight or walking after sitting for a while",
      "Pain that flares with bending, twisting, or coughing",
    ],
    causes: [
      "Prolonged sitting with poor posture (desk work, long drives)",
      "Bending and lifting with a rounded back instead of hinging at the hips",
      "Uneven walking or standing patterns from tight hips or a weak core",
      "A disc pressing on or irritating the sciatic nerve",
      "Sleeping in positions that twist or sag the spine for hours",
      "Yard work, sports, or weekend projects involving repeated bending and twisting",
    ],
    treatments: [
      {
        title: "Chiropractic Adjustments",
        description:
          "Gentle, targeted adjustments restore motion in the low back, hips, and pelvis so the nerve has less reason to stay irritated.",
      },
      {
        title: "Spinal Decompression",
        description:
          "Non-surgical decompression gently stretches the spine to relieve disc pressure that may be pinching the sciatic nerve.",
      },
      {
        title: "Posture & Ergonomic Coaching",
        description:
          "Simple changes to how you sit, stand, and set up your workspace reduce the everyday strain that keeps flaring up sciatica.",
      },
      {
        title: "Targeted Strengthening & Stretching",
        description:
          "Exercises for the hips, core, and low back help your body share the workload evenly instead of overloading one side.",
      },
      {
        title: "Gait & Movement Pattern Correction",
        description:
          "We assess how you walk and move to catch the small compensations that quietly keep irritating the nerve.",
      },
    ],
    benefits: [
      "Non-invasive, drug-free approach to lasting relief",
      "Addresses the root cause instead of masking symptoms",
      "A plan built around your daily habits and routine",
      "Helps you avoid unnecessary surgery or long-term medication",
      "Get back to standing, walking, and sitting comfortably",
    ],
    faqs: [
      {
        question: "How long does sciatica take to heal?",
        answer:
          "It depends on the cause and how long it's been irritated, but many patients notice meaningful improvement within a few weeks of consistent chiropractic care and spinal decompression, paired with the daily-habit changes we recommend.",
      },
      {
        question: "Is it safe to keep exercising with sciatica?",
        answer:
          "Often yes, with the right modifications. We'll guide you on which movements to avoid temporarily and which gentle exercises actually help calm the nerve and rebuild support around your spine.",
      },
      {
        question: "Can sitting all day really cause sciatica?",
        answer:
          "Yes. Long stretches of sitting tighten the front of the hips, stress the spinal discs, and add pressure on the sciatic nerve - one of the most common triggers we see in our Murfreesboro patients.",
      },
      {
        question: "Do I need an MRI before treatment?",
        answer:
          "Not always. A thorough chiropractic exam can identify the likely source of your sciatica. Imaging is typically reserved for cases with red-flag symptoms or when initial care isn't producing the expected progress.",
      },
      {
        question: "When should I see a chiropractor for sciatica?",
        answer:
          "As soon as the pain starts limiting your daily activities. Early, targeted care tends to prevent sciatica from becoming a longer-term, harder-to-treat problem.",
      },
    ],
    relatedService: { label: "Spinal Decompression", href: "/spinal-decompression/" },
    metaTitle: requirePageTitle("/sciatica/"),
    metaDescription:
      "Sciatica relief in Murfreesboro, TN. Non-invasive chiropractic care and spinal decompression to calm nerve pain that radiates from your back into your leg.",
  },
  {
    slug: "herniated-disc",
    name: "Herniated & Bulging Disc",
    shortDescription:
      "When a spinal disc bulges or ruptures and presses on a nearby nerve, pain can radiate far beyond your back - often with tingling, numbness, or burning.",
    heroEyebrow: "Condition We Treat",
    heroDescription:
      "Your spine's discs act as shock-absorbing cushions between each vertebra. When one wears down, bulges, or ruptures, it can press on nearby nerves and send pain well beyond your back.",
    overview: [
      "Your spine is made up of vertebrae stacked one on top of another, with discs in between acting like small cushions - soft in the center, tougher on the outside - that absorb shock as you move, twist, lift, and bend.",
      "A disc can be injured or wear down over time, bulging outward or rupturing so its inner material presses on a nearby nerve. Early on, disc pain can feel similar to a simple muscle strain, but disc problems usually involve nerve-related symptoms - pain, tingling, or numbness that spreads away from the spine - while muscle strain tends to stay local and calm down as the muscle heals.",
    ],
    symptoms: [
      "Pain that radiates into an arm or leg, not just the back or neck",
      "Sharp, burning, or electric sensations along the nerve path",
      "Numbness or tingling in the hands, feet, arms, or legs",
      "Weakness gripping objects or lifting your foot/leg",
      "Pain that worsens with sitting, coughing, sneezing, or bending forward",
      "Stiffness that lingers well past the normal healing window for a strain",
    ],
    causes: [
      "Natural disc wear and dehydration that builds up over the years",
      "A sudden awkward lift, twist, or fall",
      "Repetitive bending and loading at work or during sports",
      "Poor lifting mechanics (rounding the back instead of hinging at the hips)",
      "A prior back injury that never fully healed",
    ],
    treatments: [
      {
        title: "Gentle Chiropractic Adjustments",
        description:
          "Restoring proper motion and alignment reduces the mechanical stress that keeps a disc irritated.",
      },
      {
        title: "Non-Surgical Spinal Decompression",
        description:
          "Controlled, gentle stretching creates negative pressure inside the disc, helping retract bulging material and take pressure off the nerve.",
      },
      {
        title: "Targeted Rehab Exercise",
        description:
          "Specific strengthening and mobility work supports the spine so it can share load more evenly going forward.",
      },
      {
        title: "Posture & Ergonomic Guidance",
        description:
          "Adjusting how you sit, lift, and move day-to-day protects the healing disc and helps prevent re-injury.",
      },
      {
        title: "Whole-Person Care Plan",
        description:
          "We look beyond the sore spot at your daily habits, work setup, and activity level to build a plan that actually fits your life.",
      },
    ],
    benefits: [
      "Relieves nerve pressure without surgery",
      "Restores disc-friendly movement patterns for the long term",
      "Drug-free approach to pain management",
      "Improves circulation and supports natural healing",
      "A recovery timeline built around your specific injury",
    ],
    faqs: [
      {
        question: "How do I know if it's a disc problem or just a muscle strain?",
        answer:
          "Disc-related pain usually radiates away from the spine with nerve symptoms like tingling, numbness, or weakness, while muscle strain tends to stay local and improve within one to two weeks. A chiropractic exam can help sort out which one you're dealing with.",
      },
      {
        question: "Will I need imaging like an X-ray or MRI?",
        answer:
          "Sometimes. If your history and exam point toward a disc injury, or if you have red-flag symptoms, we may recommend imaging to confirm the diagnosis and rule out other causes before building your care plan.",
      },
      {
        question: "How long does recovery from a herniated disc take?",
        answer:
          "Many patients notice real improvement within a few weeks of consistent care, with continued progress over two to three months as the disc heals and the supporting muscles strengthen.",
      },
      {
        question: "Are there activities I should avoid?",
        answer:
          "During the early, irritated phase, we'll guide you on which movements (like heavy lifting or deep forward bending) to modify temporarily while keeping you as active as safely possible.",
      },
      {
        question: "When is a herniated disc an emergency?",
        answer:
          "Loss of bladder or bowel control, or rapidly progressing weakness in both legs, are red flags that need immediate medical attention rather than routine chiropractic care.",
      },
    ],
    relatedService: { label: "Spinal Decompression", href: "/spinal-decompression/" },
    metaTitle: requirePageTitle("/herniated-disc/"),
    metaDescription:
      "Non-surgical relief for herniated and bulging discs in Murfreesboro, TN. Spinal decompression and chiropractic care to take pressure off irritated nerves.",
  },
  {
    slug: "migraines-headaches",
    name: "Migraines & Headaches",
    shortDescription:
      "Recurring headaches and migraines can trace back to tension and misalignment in your neck and upper spine - not just stress.",
    heroEyebrow: "Condition We Treat",
    heroDescription:
      "Headaches and migraines can disrupt your life in more ways than one - the throbbing pain, sensitivity to light, or trouble concentrating can make even simple tasks unbearable. Often, the root of the discomfort lies in the spine.",
    overview: [
      "Your spine plays a critical role in your overall health, especially your nervous system. Misalignments or compression in the cervical spine (your neck) can affect nearby nerves, leading to tension headaches or even triggering migraines by disrupting the flow of oxygen and nutrients to the brain.",
      "At Rutherford Spine & Wellness Center, we look at the connection between your neck, posture, and nervous system, using non-invasive chiropractic care and spinal decompression to address the mechanical causes behind recurring head pain.",
    ],
    symptoms: [
      "Throbbing or pounding head pain",
      "Sensitivity to light or sound during flare-ups",
      "Neck stiffness that shows up alongside the headache",
      "Tension headaches that build through the day, especially at a desk",
      "Headaches that start or worsen after long periods of screen time",
      "Reduced ability to concentrate during a flare-up",
    ],
    causes: [
      "Misalignment in the cervical spine (neck)",
      "Forward-head posture from long hours at a desk or on a phone",
      "Muscle tension built up in the neck and shoulders",
      "Nerve irritation stemming from the cervical spine",
      "Stress combined with prolonged sitting",
      "Herniated discs or nerve irritation in the neck",
    ],
    treatments: [
      {
        title: "Cervical Chiropractic Adjustments",
        description:
          "Restoring alignment in the neck reduces pressure and irritation on nerves linked to tension headaches and migraines.",
      },
      {
        title: "Spinal Decompression",
        description:
          "Gently stretching the spine relieves pressure on discs and improves circulation, which can reduce inflammation tied to headaches.",
      },
      {
        title: "Posture & Ergonomic Coaching",
        description:
          "Correcting forward-head posture and desk setup removes a major daily trigger for tension headaches.",
      },
      {
        title: "Muscle Tension Release",
        description:
          "Targeted work on tight neck and shoulder muscles helps calm the muscle tension that often feeds into headaches.",
      },
      {
        title: "Lifestyle & Stress Guidance",
        description:
          "Simple daily adjustments help reduce the compounding effect of stress and posture on headache frequency.",
      },
    ],
    benefits: [
      "Fewer, less intense headaches over time",
      "A drug-free alternative to daily pain medication",
      "Improved neck mobility and posture",
      "Better sleep as neck tension eases",
      "Addresses the mechanical root cause in the spine, not just the symptom",
    ],
    faqs: [
      {
        question: "Can a chiropractor really help with migraines?",
        answer:
          "When migraines are linked to cervical spine issues, poor posture, or nerve irritation, chiropractic care and spinal decompression can meaningfully reduce their frequency and intensity for many patients.",
      },
      {
        question: "How quickly will I notice a difference?",
        answer:
          "Some patients feel relief after the first few visits, while others need a few weeks of consistent care to see a clear reduction in headache frequency.",
      },
      {
        question: "Is spinal decompression safe for neck-related headaches?",
        answer:
          "Yes - it's a gentle, controlled, non-surgical stretch designed specifically to relieve pressure on the discs and nerves in the neck.",
      },
      {
        question: "Do I need to change my desk setup too?",
        answer:
          "Often, yes. Posture and ergonomics are frequently part of what's driving the headaches in the first place, so we'll walk you through practical changes alongside your care plan.",
      },
      {
        question: "What if my headaches are stress-related, not spinal?",
        answer:
          "Stress and spinal tension frequently feed each other. We'll evaluate your neck and posture directly to see how much of a role the spine is playing in your specific case.",
      },
    ],
    relatedService: { label: "Chiropractic Care", href: "/chiropractic/" },
    metaTitle: requirePageTitle("/migraines-headaches/"),
    metaDescription:
      "Non-invasive migraine and headache relief in Murfreesboro, TN. Chiropractic care and spinal decompression that target neck misalignment and nerve irritation.",
  },
  {
    slug: "whiplash",
    name: "Whiplash",
    shortDescription:
      "The rapid back-and-forth motion from a car accident, sports hit, or fall can strain your neck long after the initial impact feels okay.",
    heroEyebrow: "Condition We Treat",
    heroDescription:
      "Whiplash can turn simple things like backing out of the driveway or looking over your shoulder into painful chores. It happens when your head and neck are snapped back and forth quickly.",
    overview: [
      "Whiplash usually happens in a rear-end car accident, a hard hit in sports, or a slip and fall - anything that snaps the head and neck quickly in one direction, then back in the other. Even if nothing is broken, the soft tissue and joint strain underneath can be very real.",
      "Swelling and inflammation often build over time, which is why whiplash symptoms may not show up until hours or days after the incident. Feeling okay right after a fender-bender doesn't always mean there's no injury underneath - early, targeted care makes a real difference in preventing long-term problems.",
    ],
    symptoms: [
      "Neck pain and stiffness",
      "Headaches that start hours or days after the incident",
      "Pain in the shoulders or upper back",
      "Dizziness or trouble focusing",
      "Reduced range of motion turning the head",
      "Symptoms that were mild at first but worsen over the following days",
    ],
    causes: [
      "Rear-end or other sudden-impact car accidents",
      "Sports collisions",
      "Slips and falls",
      "Any rapid snap-back motion of the head and neck",
      "Strain to the small joints and soft tissue in the cervical spine",
    ],
    treatments: [
      {
        title: "Chiropractic Evaluation & Adjustments",
        description:
          "We check for joints in the neck that have become stuck or move unevenly, then use gentle, targeted adjustments to restore proper motion.",
      },
      {
        title: "Spinal Decompression (When Needed)",
        description:
          "If whiplash has led to a disc bulge or herniation, controlled decompression can relieve pressure on affected nerves.",
      },
      {
        title: "Rehab Exercises",
        description:
          "Focused exercises rebuild strength and stability in the neck to help prevent re-injury.",
      },
      {
        title: "Complementary Soft-Tissue Therapies",
        description:
          "Supporting therapies work alongside chiropractic care to calm inflammation and support healing tissue.",
      },
      {
        title: "Ergonomic & Home-Care Guidance",
        description:
          "Practical tips for driving, sleeping, and working help protect your neck while it heals.",
      },
    ],
    benefits: [
      "Addresses joint mechanics that medication alone can't fix",
      "A non-surgical, step-by-step recovery plan",
      "Reduces the risk of chronic neck pain down the road",
      "Helps restore full, comfortable range of motion",
      "A personalized, gradual return to driving, work, and sports",
    ],
    faqs: [
      {
        question: "My pain started days after the accident - is that normal?",
        answer:
          "Yes, this is common with whiplash. Swelling and inflammation can build gradually, so symptoms often appear or worsen hours or even days after the original incident.",
      },
      {
        question: "Do I need an X-ray after a whiplash injury?",
        answer:
          "Imaging can help rule out fractures or more serious injury, especially after a higher-impact accident. Your exam findings will help determine whether imaging is needed.",
      },
      {
        question: "How long does whiplash recovery typically take?",
        answer:
          "Many people improve significantly within a few weeks of consistent care, though full recovery and long-term stability can take longer depending on the severity of the injury.",
      },
      {
        question: "Can I keep working and driving during treatment?",
        answer:
          "In most cases, yes, with some temporary adjustments. We'll guide you on safe limits and gradually help you return to normal activity as your neck heals.",
      },
      {
        question: "Will my symptoms come back if I don't get treated?",
        answer:
          "Untreated joint and soft-tissue strain from whiplash can lead to chronic neck pain, recurring headaches, and extra spinal wear over time - which is why early, structured care matters.",
      },
    ],
    relatedService: { label: "Auto Injury Care", href: "/auto-injuries/" },
    metaTitle: requirePageTitle("/whiplash/"),
    metaDescription:
      "Whiplash treatment in Murfreesboro, TN after auto accidents, sports collisions, or falls. Chiropractic care and spinal decompression for lasting neck relief.",
  },
  {
    slug: "arthritis",
    name: "Arthritis & Joint Numbness",
    shortDescription:
      "Stiff, aching joints paired with numbness or tingling often point to nerve compression in the spine - not just wear-and-tear in the joint itself.",
    heroEyebrow: "Condition We Treat",
    heroDescription:
      "Arthritis doesn't just cause joint pain and stiffness - it can also lead to numbness and tingling, especially when it affects the spine and puts pressure on nearby nerves.",
    overview: [
      "When people think of arthritis, they usually picture joint pain, swelling, and stiffness. But arthritis can also cause numbness and tingling, particularly when it narrows the space between vertebrae and puts pressure on nearby nerves - a process called nerve compression.",
      "As arthritis progresses, it can also wear down the discs that cushion the spine, sometimes leading to herniated discs or bone spurs that irritate nerves further. When a nerve is compressed, signals don't travel the way they should, which shows up as numbness, tingling, or weakness in the hands or feet.",
    ],
    symptoms: [
      "Joint stiffness and aching, especially first thing in the morning",
      "Swelling around affected joints",
      "Numbness or tingling in the hands or feet",
      "Weakness in the arms or legs",
      "Joints that feel \u201Clocked up\u201D after periods of rest",
      "Reduced grip strength or trouble with fine motor tasks",
    ],
    causes: [
      "Narrowing of the space between vertebrae as arthritis progresses",
      "Bone spurs pressing on nearby nerves",
      "Degenerative changes in the spinal discs",
      "General wear-and-tear on the joints over time",
      "Nerve compression from long-term spinal changes",
    ],
    treatments: [
      {
        title: "Spinal Decompression",
        description:
          "Gently stretching the spine creates space for compressed nerves, helping reduce numbness and tingling and allowing nerves to heal.",
      },
      {
        title: "Chiropractic Care",
        description:
          "Improving joint motion throughout the spine reduces compensatory stress on already-irritated areas.",
      },
      {
        title: "Circulation-Focused Therapy",
        description:
          "Better blood flow to affected areas brings oxygen and nutrients that support healing and reduce inflammation.",
      },
      {
        title: "Targeted Mobility Exercises",
        description:
          "Gentle, specific movement keeps joints as mobile and comfortable as possible without overloading them.",
      },
      {
        title: "Whole-Person Lifestyle Guidance",
        description:
          "We look at daily habits and activity levels that may be adding unnecessary stress to already-sensitive joints.",
      },
    ],
    benefits: [
      "Less numbness and tingling in the hands and feet",
      "Improved circulation and a better healing environment",
      "Reduced inflammation and joint discomfort",
      "A drug-free, non-surgical approach",
      "Better grip strength and day-to-day joint function",
    ],
    faqs: [
      {
        question: "Why does arthritis cause numbness, not just pain?",
        answer:
          "As arthritis narrows the space around the spinal nerves or contributes to disc wear, it can compress nerves directly - which shows up as numbness, tingling, or weakness rather than just localized joint pain.",
      },
      {
        question: "Is spinal decompression safe if I have arthritis?",
        answer:
          "Yes, when appropriately tailored to your condition. Decompression is a controlled, gentle stretch designed to relieve nerve pressure, and your plan will be built around your specific exam findings.",
      },
      {
        question: "How long until I notice improvement?",
        answer:
          "Many patients start noticing changes within a few sessions, with more significant relief often building over two to three months of consistent care.",
      },
      {
        question: "Can this help me avoid surgery?",
        answer:
          "For many patients, yes - non-surgical, non-invasive care is often effective for arthritis-related nerve symptoms before more invasive options are considered.",
      },
      {
        question: "Will exercise make my arthritis worse?",
        answer:
          "The right kind of gentle, targeted movement generally helps joints stay mobile and can reduce stiffness - we'll guide you toward exercises that support rather than strain your joints.",
      },
    ],
    relatedService: { label: "Neuropathy Care", href: "/neuropathy/" },
    metaTitle: requirePageTitle("/arthritis/"),
    metaDescription:
      "Relief for arthritis-related joint pain and nerve numbness in Murfreesboro, TN. Spinal decompression and chiropractic care to ease compressed nerves.",
  },
  {
    slug: "degenerative-disc-disease",
    name: "Degenerative Disc Disease",
    shortDescription:
      "Discs naturally lose height and hydration over time - often leading to chronic stiffness, radiating tingling, and reduced flexibility in the neck or back.",
    heroEyebrow: "Condition We Treat",
    heroDescription:
      "Chronic neck and back stiffness is more than just a physical discomfort - it can affect your mood, productivity, and quality of life. Often, the root cause is degenerative changes in the spinal discs.",
    overview: [
      "For many people, chronic neck and back pain stems from issues like herniated discs, degenerative disc disease, or poor posture. These changes can compress the nerves in the spine, leading to pain, stiffness, and even radiating symptoms like tingling in the arms or legs.",
      "Degenerative disc disease develops gradually as discs lose hydration and height with age, prior injury, or years of repetitive strain. Spinal decompression and chiropractic care work together to relieve pressure on the affected discs and nerves, restoring alignment and improving circulation to the area.",
    ],
    symptoms: [
      "Chronic stiffness in the neck or lower back",
      "Pain that worsens after long periods of sitting or standing",
      "Radiating tingling or numbness into the arms or legs",
      "Reduced flexibility and range of motion",
      "Pain that flares with activity, then eases with rest",
      "A feeling that the spine \u201Ccatches\u201D or feels less stable than before",
    ],
    causes: [
      "Natural disc wear and dehydration with age",
      "Years of poor posture, especially at a desk",
      "A past injury that never fully healed",
      "Repetitive strain from physical work or sports",
      "Reduced disc height and cushioning over time",
    ],
    treatments: [
      {
        title: "Spinal Decompression",
        description:
          "Gently stretching the spine restores space between the vertebrae, improving circulation and taking pressure off compressed discs and nerves.",
      },
      {
        title: "Chiropractic Adjustments",
        description:
          "Restoring alignment reduces compensatory strain and helps the spine move more efficiently overall.",
      },
      {
        title: "Posture Correction",
        description:
          "Addressing years of postural habits helps slow further wear and reduces daily irritation.",
      },
      {
        title: "Targeted Strengthening",
        description:
          "Building support around the spine helps it handle daily loads with less strain on the affected discs.",
      },
      {
        title: "Activity Modification Guidance",
        description:
          "Practical adjustments to work and daily routines protect the spine while you build strength and mobility.",
      },
    ],
    benefits: [
      "Relief without relying on daily medication",
      "A non-surgical alternative for chronic disc-related pain",
      "Improved nerve and disc health over time",
      "Better long-term spinal function and flexibility",
      "A personalized, ongoing maintenance plan",
    ],
    faqs: [
      {
        question: "Is degenerative disc disease reversible?",
        answer:
          "The natural wear itself can't be fully reversed, but spinal decompression and chiropractic care can relieve pressure on the discs and nerves, reduce pain, and significantly improve day-to-day function.",
      },
      {
        question: "What's the difference between this and a herniated disc?",
        answer:
          "Degenerative disc disease describes the gradual wear of a disc over time, which can eventually lead to a herniation. The two are related, and care approaches often overlap.",
      },
      {
        question: "How many sessions will I need?",
        answer:
          "Most patients start noticing improvement within a few sessions, with significant relief often achieved within two to three months of consistent care.",
      },
      {
        question: "Can I still be active with degenerative disc disease?",
        answer:
          "Yes - in fact, the right kind of movement and strengthening is part of an effective, long-term plan. We'll guide you on which activities to modify and which ones actually help.",
      },
      {
        question: "Will this come back after treatment?",
        answer:
          "Ongoing maintenance care and the postural/lifestyle changes we recommend are designed to slow further wear and keep symptoms from returning as intensely.",
      },
    ],
    relatedService: { label: "Spinal Decompression", href: "/spinal-decompression/" },
    metaTitle: requirePageTitle("/degenerative-disc-disease/"),
    metaDescription:
      "Non-surgical care for degenerative disc disease in Murfreesboro, TN. Spinal decompression and chiropractic care to relieve chronic neck and back stiffness.",
  },
  {
    slug: "joint-pain",
    name: "Joint Pain & Stiffness",
    shortDescription:
      "Popping, cracking, or stiff joints often signal that your body is compensating for a deeper alignment issue - not just \u201Cgetting older.\u201D",
    heroEyebrow: "Condition We Treat",
    heroDescription:
      "Joint pain has a way of sneaking up on active people. One month you feel fine on runs or in the garden; the next, your knee twinges on every step or your shoulder feels tight overhead.",
    overview: [
      "Many joint problems don't start on the field or in the gym - they build up from everyday habits. Desk posture, footwear, and sudden jumps in activity level quietly load your joints over and over until they finally start to hurt or make noise.",
      "Even with good habits, joint pain can come from deeper alignment issues you can't see in a mirror. When the spine or pelvis isn't lined up well, the rest of the body compensates - certain joints end up taking the brunt of every step, swing, or lift, which is often why the knee or shoulder hurts even though the real trigger is somewhere else.",
    ],
    symptoms: [
      "Popping, cracking, or clicking joints during movement",
      "Stiffness after rest or first thing in the morning",
      "Joint pain that shows up after activity, not during it",
      "Uneven wear - one side of the body working harder than the other",
      "Tightness that limits your normal range of motion",
      "Aches that seem to move around from one joint to another",
    ],
    causes: [
      "Spinal or postural misalignment forcing other joints to compensate",
      "Muscle imbalances (tight on one side, weak on the other)",
      "Old injuries that quietly changed how you move",
      "Sudden jumps in activity level after a period of rest",
      "Prolonged sitting or repetitive motion at work",
    ],
    treatments: [
      {
        title: "Chiropractic Adjustments",
        description:
          "Restoring alignment throughout the spine reduces the compensation that overloads other joints.",
      },
      {
        title: "Movement & Mobility Rehab",
        description:
          "Targeted exercises restore smoother joint motion and help joints share load more evenly.",
      },
      {
        title: "Posture & Ergonomic Coaching",
        description:
          "Correcting daily posture habits removes one of the biggest hidden contributors to joint stress.",
      },
      {
        title: "Gradual Activity-Return Plans",
        description:
          "We help you ease back into sports or exercise in a way that builds tolerance instead of overwhelming the joint.",
      },
      {
        title: "Whole-Person Evaluation",
        description:
          "We assess your nerves, muscles, and alignment together - not just the joint that hurts - to find the real trigger.",
      },
    ],
    benefits: [
      "Fewer and quieter joint sounds over time",
      "Improved range of motion",
      "Less compensation-related wear on other joints",
      "More confidence returning to sports and activity",
      "A non-invasive, whole-body approach to lasting comfort",
    ],
    faqs: [
      {
        question: "Is joint popping always something to worry about?",
        answer:
          "No - occasional, painless popping is usually just a harmless change in joint pressure, similar to cracking your knuckles. It's worth getting checked when popping is paired with stiffness, reduced motion, or discomfort.",
      },
      {
        question: "Can chiropractic care actually reduce the popping?",
        answer:
          "Often, yes. When the spine is properly aligned, the body distributes movement more evenly, which frequently reduces both stiffness and how often joints pop or click.",
      },
      {
        question: "Do I need imaging before starting care?",
        answer:
          "Not usually for typical joint stiffness or popping. A hands-on evaluation of your posture, alignment, and movement is often enough to build an effective plan.",
      },
      {
        question: "How long until I notice less stiffness?",
        answer:
          "Many patients notice improved movement within the first few visits, with continued improvement as alignment and muscle balance are restored over several weeks.",
      },
      {
        question: "I'm active in sports - will this help me perform better?",
        answer:
          "Yes. Reducing compensation and improving joint mechanics often helps patients move more efficiently and with more confidence during sports and everyday activity.",
      },
    ],
    relatedService: { label: "Sports Injury Care", href: "/sports-injuries/" },
    metaTitle: requirePageTitle("/joint-pain/"),
    metaDescription:
      "Relief for joint pain, popping, and stiffness in Murfreesboro, TN. Chiropractic care that addresses the alignment issues behind chronic joint discomfort.",
  },
];

const bySlug = new Map(CONDITIONS.map((c) => [c.slug, c]));

export function getCondition(slug: string): Condition | undefined {
  return bySlug.get(slug);
}
