"use client";

/**
 * <BlogIndexPage> — /blog/ index. Renoregen.com-inspired blog listing
 * pattern (featured post + card grid with category/date/excerpt) re-themed
 * with this repo's own components: `UtilityHero` (dark hero, matches the
 * other utility pages), `BlogCard`, `Reveal`/`Stagger`/`StaggerItem`, and
 * the shared dark CTA pattern from `ServicePageTemplate`.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { UtilityHero } from "../utility/UtilityHero";
import { BlogCard } from "./BlogCard";
import { Reveal } from "../motion/primitives";
import { businessInfo } from "../nav";
import type { BlogPostMeta } from "../../_lib/blog";

export function BlogIndexPage({ posts }: { posts: BlogPostMeta[] }) {
  const categories = useMemo(
    () => ["All Posts", ...[...new Set(posts.map((p) => p.category))].sort()],
    [posts]
  );
  const [active, setActive] = useState("All Posts");

  const [featured, ...rest] = posts;
  const filtered =
    active === "All Posts" ? rest : rest.filter((p) => p.category === active);

  return (
    <main>
      <UtilityHero
        eyebrow="Chiropractic Health Blog"
        h1="Our Blog"
        subtitle="Read our health blog for useful tips on healing back pain & staying active. Rutherford Spine & Wellness Center shares simple ways to improve your daily health."
        bgImage="/media/blog-banner.jpeg"
        path="/blog/"
      />

      <section className="section-y">
        <div className="container-wide">
          {active === "All Posts" && featured && (
            <Reveal as="div" className="mb-12">
              <span className="eyebrow block">Latest From The Blog</span>
              <div className="mt-4">
                <BlogCard post={featured} featured />
              </div>
            </Reveal>
          )}

          <Reveal as="div" className="mb-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.06em] transition-colors ${
                  active === c
                    ? "bg-[color:var(--color-brand-blue)] text-white"
                    : "bg-[color:var(--color-surface-muted)] text-[color:var(--color-body)] hover:bg-[color:var(--color-brand-blue)]/10 hover:text-[color:var(--color-brand-blue)]"
                }`}
              >
                {c}
              </button>
            ))}
          </Reveal>

          {/* Plain (non-staggered) grid - a per-card scroll-triggered cascade
              is impractical at this list size (60+ cards): with even a small
              per-child delay the last rows would stay invisible for several
              seconds after scrolling into view. Cards render immediately;
              only the elements above (hero/featured post/category pills)
              use scroll-reveal motion. */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-[color:var(--color-body)]">
              No posts in this category yet.
            </p>
          )}
        </div>
      </section>

      <section className="surface-dark section-y relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(45% 60% at 90% 20%, rgba(252,143,0,0.22) 0%, transparent 60%)",
          }}
        />
        <div className="container-content relative text-center">
          <Reveal as="div">
            <span className="eyebrow !text-[color:var(--color-brand-orange)]">
              Take the Next Step
            </span>
            <h2 className="h-section mt-3 !text-white">
              Have Questions About Your Symptoms?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/80">
              Schedule a consultation with Rutherford Spine &amp; Wellness
              Center in Murfreesboro, TN, and get a care plan built around
              your specific symptoms and goals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact-us/" className="btn btn-primary-on-dark">
                Schedule Your Consultation
              </Link>
              <a
                href={businessInfo.phoneHref}
                className="btn btn-outline-navy !border-white/30 !text-white hover:!bg-white/10"
              >
                Call {businessInfo.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
