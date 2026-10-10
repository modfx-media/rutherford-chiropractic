/**
 * <BlogCard> — renoregen.com-inspired blog listing card (featured image,
 * category pill, date, title, excerpt, "Read Article ->" link) re-themed
 * with this repo's brand palette + `surface-card`/`hover-lift` primitives
 * so it matches every other card pattern on the site.
 */

import Image from "next/image";
import { imageUnoptimized } from "@/lib/cms/media";
import Link from "next/link";
import type { BlogPostMeta } from "../../_lib/blog";
import { formatBlogDate } from "../../_lib/blog";
import { ArrowRightIcon, CalendarIcon, TagIcon } from "../icons";

export function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPostMeta;
  featured?: boolean;
}) {
  return (
    <Link
      href={post.path}
      className={`hover-lift surface-card group flex overflow-hidden bg-white ${
        featured ? "flex-col lg:flex-row" : "flex-col"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-[color:var(--color-surface-muted)] ${
          featured ? "aspect-[16/10] lg:aspect-auto lg:w-[46%]" : "aspect-[16/10]"
        }`}
      >
        {post.featuredImage ? (
          <Image
            src={post.featuredImage.src}
            alt={post.featuredImage.alt}
            fill
            sizes={featured ? "(min-width: 1024px) 46vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            unoptimized={imageUnoptimized(post.featuredImage.src)}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : null}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-brand-navy)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
          <TagIcon size={12} />
          {post.category}
        </span>
        {featured && (
          <span className="absolute right-4 top-4 rounded-full bg-[color:var(--color-brand-orange)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
            Featured
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-8 lg:justify-center" : ""}`}>
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[color:var(--color-brand-gray-muted)]">
          <CalendarIcon size={13} />
          {formatBlogDate(post.publishedAt)}
        </span>
        <h3
          className={`mt-3 font-bold leading-snug text-[color:var(--color-foreground)] transition-colors group-hover:text-[color:var(--color-brand-blue)] ${
            featured ? "text-2xl lg:text-3xl" : "text-lg"
          }`}
        >
          {post.title}
        </h3>
        <p
          className={`mt-3 leading-relaxed text-[color:var(--color-body)] ${
            featured ? "text-base line-clamp-3" : "text-sm line-clamp-3"
          }`}
        >
          {post.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[color:var(--color-brand-blue)]">
          Read Article
          <ArrowRightIcon size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
