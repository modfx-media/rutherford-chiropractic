/**
 * Body content for `/new-patient-forms/`. Mirrors the live page: download
 * the health history, workers' compensation, personal injury, and member
 * wellness forms, then a contact CTA in place of the WordPress form.
 */

import Link from "next/link";
import { Reveal } from "../motion/primitives";
import { UtilityHero } from "./UtilityHero";

const GROUPS = [
  {
    title: "New Patient Health History Form",
    body: "This form is required. All cash, major medical and Medicare patients must complete the questionnaire both sides, front and back.",
    links: [
      {
        label: "New Patient Health History Form",
        href: "/new-patient-health-history-form/",
      },
    ],
  },
  {
    title: "Workmans Compensation Forms",
    body: "This form is required. All cash, major medical and Medicare patients must complete the questionnaire both sides, front and back.",
    links: [
      { label: "Patient History Form", href: "/workmans-comp-form/" },
      { label: "Authorization Form", href: "/compensation-authorization-form/" },
      { label: "Questionnaire Form", href: "/compensation-questionnaire-form/" },
    ],
  },
  {
    title: "Personal Injury Forms",
    body: "Personal injury patients must complete all forms and explain if the injury is due to a motor vehicle or non-motor vehicle incident.",
    links: [
      { label: "Patient History Form", href: "/pi-patient-history-form-1/" },
      { label: "Verification Form", href: "/pi-personal-verification-form/" },
      { label: "Questionnaire Form", href: "/pi-questionnaire-form/" },
      { label: "Patient Records & Doctors Lien Form", href: "/pi-doctors-lien-form/" },
    ],
  },
  {
    title: "Member Wellness Registration Form",
    body: "You can fill out this form to register for access to the member wellness section of our website. You are also welcome to sign up for our monthly newsletter to keep up on current health issues and news and events in our office. You can print it out and bring it to our office. We are happy to make your experience with our clinic and website more connected and advantageous.",
    links: [
      {
        label: "Member Wellness Registration Form",
        href: "/member-wellness-registration-form/",
      },
    ],
  },
];

export function NewPatientFormsPage() {
  return (
    <main>
      <UtilityHero
        eyebrow="Paperwork"
        h1="New Patient Forms"
        subtitle="Complete your forms at home so your first visit starts on time."
        path="/new-patient-forms/"
      />

      <section className="section-y bg-white">
        <div className="container-content">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Before You Arrive</span>
            <h2 className="h-section mt-3">For A Streamlined First Visit</h2>
            <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-body)]">
              Rutherford Spine &amp; Wellness Center offers different types of patient forms
              online, so that they can be completed in the convenience of your own home or
              office. Download the necessary forms, print them out, and fill in the required
              information. You can fax us the printed and completed forms or bring them with
              you to your appointment.
            </p>
          </Reveal>

          <div className="mx-auto mt-14 max-w-3xl space-y-8">
            {GROUPS.map((group) => (
              <Reveal key={group.title}>
                <div className="surface-card bg-white p-6 text-center lg:p-8">
                  <h2 className="text-2xl font-bold text-[color:var(--color-brand-navy)]">
                    {group.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-[color:var(--color-body)]">
                    {group.body}
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {group.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-dark section-y">
        <div className="container-content text-center">
          <Reveal>
            <h2 className="h-section !text-white">
              Fill Out The Form Below To Schedule Your Consultation
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Tell us how we can help and we will follow up to book your visit.
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
