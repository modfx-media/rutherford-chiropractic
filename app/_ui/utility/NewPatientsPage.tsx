/**
 * <NewPatientsPage> — body content for `/new-patients/`. Reproduces the
 * live "What To Expect For New Patients" copy verbatim: the "Your First
 * Visit" intro paragraph, then the 5-step process (Intake, Pre-Consult,
 * Chiropractic Exam, Post-Consult, Treatment and Wellness). The live page's
 * secondary contact form is a WordPress "Forminator" plugin form tied to
 * WP-only backend infra (nonces, AJAX action) that can't be ported to a
 * static site, so it's replaced with a CTA to `/contact-us/` (the page
 * whose lead-capture form WAS explicitly requested to be rebuilt).
 */

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "../motion/primitives";
import { UtilityHero } from "./UtilityHero";

const STEPS = [
  {
    title: "Intake",
    body: "You will meet our receptionist and start the intake process before you see the chiropractor. Prior to your appointment, you should download and fill out the necessary forms on our online patient forms page. While you are going through the intake session, you will also need to complete a series of forms and other paperwork to give us a general idea of your health history, present condition, recurring issues, and other information that will help in the creation of your initial records. Consent forms for examination and possible treatment will also need to be filled out.",
  },
  {
    title: "Pre-Consult",
    body: "Once the intake is over, you will have a consultation with our chiropractor, Dr. Wesley Stewart. It is at this time that you will discuss your symptoms, health history, and concerns. This is a one-on-one session where you can get to know the chiropractor, and he can learn more about you. You will talk about treatment alternatives and options, set a few goals, and be able to relay your expectations.",
  },
  {
    title: "Chiropractic Exam",
    body: "Following the consultation, you will receive an examination with a thorough assessment. This includes a battery of tests that allow for an evaluation of your flexibility, reflexes, orthopedic, postural, and neurological conditions. Depending on your initial assessment, X-rays may be taken to establish a baseline for treatment, standard protocol for certain conditions.",
  },
  {
    title: "Post-Consult",
    body: "After your examination, Dr. Stewart will provide you with a detailed report of his findings. You will then have an opportunity to ask questions, while getting the best recommendations from the doctor on how to proceed, the best treatment plans, and pros and cons of the treatment.",
  },
  {
    title: "Treatment and Wellness",
    body: "Once you are made aware of the doctor\u2019s recommendations, you may schedule your first treatment. The treatment options can vary depending on your condition but may include variations of physical therapy, massages, and spinal adjustments.",
    extra:
      "Because our clinic takes a holistic approach to care, our doctor will also recommend a wellness program to include into your treatment plan for better results. This program is designed by an entire team of wellness specialists and includes diet, exercise, and maintenance. The customized plan associated with your treatment will help you get back to your standard quality of life, or better!",
  },
];

export function NewPatientsPage() {
  return (
    <main>
      <UtilityHero eyebrow="Welcome" h1="New Patients" />

      <section className="section-y bg-white">
        <div className="container-content">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">What To Expect For New Patients</span>
            <h2 className="h-section mt-3">Your First Visit</h2>
            <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-body)]">
              It&rsquo;s common to feel a little apprehensive when starting chiropractic care, but
              rest assured you will be in good hands! On your first visit, we welcome you with
              open arms, ready to provide the care and attention you need. Once you walk in the
              door, you will become part of the family here at Rutherford Spine &amp; Wellness
              Center &ndash; where everyone is a priority. Here&rsquo;s what you can expect:
            </p>
          </Reveal>


          <Stagger as="ul" className="mx-auto mt-14 max-w-3xl space-y-8">
            {STEPS.map((step, i) => (
              <StaggerItem as="li" key={step.title}>
                <div className="hover-lift surface-card flex gap-5 bg-white p-6 lg:p-8">
                  <span className="icon-badge h-12 w-12 shrink-0 text-lg font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-[color:var(--color-brand-navy)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-[color:var(--color-body)]">
                      {step.body}
                    </p>
                    {step.extra && (
                      <p className="mt-3 leading-relaxed text-[color:var(--color-body)]">
                        {step.extra}
                      </p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="surface-dark section-y">
        <div className="container-content text-center">
          <Reveal>
            <h2 className="h-section !text-white">Ready To Schedule Your Consultation?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Reach out today and take the first step toward better health.
            </p>
            <Link href="/contact-us/" className="btn btn-primary-on-dark mt-8">
              Schedule Your Consultation
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
