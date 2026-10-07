/**
 * <BlogPostTemplate> — shared layout for all 65 individual blog posts.
 * One consistent template (per user request: "do not create a new look
 * per post"): scroll progress bar, dynamic dark hero (breadcrumb + category
 * + title + date/read-time), parallax featured image, a two-column article
 * layout (body content + sticky sidebar with share/quick-info/CTA cards),
 * related-posts grid, and a dark CTA footer.
 */

import Image from "next/image";
import Link from "next/link";
import { Parallax, Reveal, Stagger, StaggerItem } from "../motion/primitives";
import { businessInfo } from "../nav";
import { BlogCard } from "./BlogCard";
import { ReadingProgressBar } from "./ReadingProgressBar";
import { ShareBar } from "./ShareBar";
import { HeroBgImage } from "../HeroBgImage";
import { DEFAULT_HERO_BG } from "../../_lib/hero-images";
import {
  formatBlogDate,
  getBlogBodyHtml,
  getReadingTime,
  getRelatedPosts,
  type BlogPostMeta,
} from "../../_lib/blog";
import { CalendarIcon, ClockIcon, TagIcon } from "../icons";
import { BreadcrumbSchema } from "../BreadcrumbSchema";

export function BlogPostTemplate({
  post,
  bodyHtml: bodyOverride,
}: {
  post: BlogPostMeta;
  bodyHtml?: string;
}) {
  const bodyHtml = bodyOverride ?? getBlogBodyHtml(post.slug);
  const related = getRelatedPosts(post.slug, post.category, 3);
  const readingTime = getReadingTime(bodyHtml);

  return (
    <main>
      <ReadingProgressBar />

      <section className="surface-dark relative isolate overflow-hidden pt-14 pb-10 sm:pt-20 sm:pb-12 lg:pt-28 lg:pb-20">
        <HeroBgImage src={post.featuredImage?.src ?? DEFAULT_HERO_BG} alt="" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-80"
          style={{
            background:
              "radial-gradient(45% 45% at 85% 15%, rgba(252,143,0,0.22) 0%, transparent 60%), radial-gradient(55% 55% at 5% 95%, rgba(0,75,153,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="hero-anim-float bg-glow-orange absolute -top-10 right-[8%] -z-10 h-64 w-64 rounded-full"
        />
        <div
          aria-hidden
          className="hero-anim-float-slow bg-glow-blue absolute bottom-0 left-[4%] -z-10 h-72 w-72 rounded-full"
        />
        <div className="container-content relative">
          <Reveal as="div">
            <BreadcrumbSchema
              items={[
                { name: "Home", path: "/" },
                { name: "Blog", path: "/blog/" },
                { name: post.title, path: post.path },
              ]}
            />
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-white/60">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link href="/blog/" className="hover:text-white">
                Blog
              </Link>
              <span aria-hidden>/</span>
              <span className="text-white">{post.title}</span>
            </nav>

            <span className="eyebrow !text-[color:var(--color-brand-orange)] flex items-center gap-1.5">
              <TagIcon size={13} />
              {post.category}
            </span>
            <h1 className="h-display mt-3 max-w-3xl !text-white">{post.title}</h1>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-white/70">
              <span className="flex items-center gap-1.5">
                <CalendarIcon size={15} />
                {formatBlogDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <ClockIcon size={15} />
                {readingTime} min read
              </span>
              <span className="glass-panel rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.06em] text-white">
                Rutherford Spine &amp; Wellness Center
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {post.featuredImage && (
        <div className="container-content -mt-12 relative lg:-mt-16">
          <Reveal as="div" className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-elevated)]">
            <Parallax strength={18} className="relative aspect-[16/8]">
              <Image
                src={post.featuredImage.src}
                alt={post.featuredImage.alt}
                fill
                priority
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="scale-[1.08] object-cover"
              />
            </Parallax>
          </Reveal>
        </div>
      )}

      <section className="section-y">
        <div className="container-content grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
          {/* No scroll-reveal wrapper directly on the article body: it's a
              long-form section that can be many viewport-heights tall, and
              a percentage-of-self intersection threshold (even 0) can get
              permanently stuck at opacity:0 for elements this tall. Render
              it plainly so content is never accidentally invisible. */}
          <article className="min-w-0">
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />

            <Reveal as="div" className="surface-card mt-14 flex flex-col items-center gap-4 bg-[color:var(--color-surface-muted)] p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="text-lg font-bold text-[color:var(--color-foreground)]">
                  Ready to feel better?
                </p>
                <p className="mt-1 text-sm text-[color:var(--color-body)]">
                  Schedule a consultation with Rutherford Spine &amp; Wellness Center.
                </p>
              </div>
              <Link href="/contact-us/" className="btn btn-primary shrink-0">
                Schedule Your Consultation
              </Link>
            </Reveal>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-5">
              <Reveal as="div" className="surface-card p-5">
                <p className="eyebrow !text-[11px]">Share This Article</p>
                <div className="mt-3">
                  <ShareBar title={post.title} />
                </div>
              </Reveal>

              <Reveal as="div" delay={0.05} className="surface-card p-5">
                <p className="eyebrow !text-[11px]">Quick Info</p>
                <dl className="mt-3 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-[color:var(--color-brand-gray-muted)]">Category</dt>
                    <dd className="font-semibold text-[color:var(--color-foreground)]">{post.category}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-[color:var(--color-brand-gray-muted)]">Published</dt>
                    <dd className="font-semibold text-[color:var(--color-foreground)]">{formatBlogDate(post.publishedAt)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-[color:var(--color-brand-gray-muted)]">Read Time</dt>
                    <dd className="font-semibold text-[color:var(--color-foreground)]">{readingTime} min</dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal as="div" delay={0.1} className="surface-dark relative overflow-hidden p-6 text-center">
                <div
                  aria-hidden
                  className="bg-glow-orange absolute -right-8 -top-8 h-32 w-32 rounded-full"
                />
                <p className="relative text-lg font-bold text-white">
                  In Pain? We Can Help.
                </p>
                <p className="relative mt-2 text-sm text-white/70">
                  Get a personalized care plan in Murfreesboro, TN.
                </p>
                <Link
                  href="/contact-us/"
                  className="btn btn-primary-on-dark relative mt-5 w-full justify-center"
                >
                  Schedule Now
                </Link>
                <a
                  href={businessInfo.phoneHref}
                  className="relative mt-3 block text-sm font-semibold text-white/80 hover:text-white"
                >
                  Or call {businessInfo.phone}
                </a>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-y bg-[color:var(--color-surface-muted)]">
          <div className="container-wide">
            <Reveal as="div">
              <span className="eyebrow block">Keep Reading</span>
              <h2 className="h-section mt-3">Related Articles</h2>
            </Reveal>
            <Stagger as="div" className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <StaggerItem as="article" key={r.slug}>
                  <BlogCard post={r} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

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
            <span className="eyebrow !text-[color:var(--color-brand-orange)]">Take the Next Step</span>
            <h2 className="h-section mt-3 !text-white">Ready to Get Started?</h2>
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

