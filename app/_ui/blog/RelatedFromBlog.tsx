import Link from "next/link";
import { readingForPage } from "../../_lib/blog-links";

/** Links from a service or condition page back to the posts that cite it. */
export function RelatedFromBlog({ pageSlug }: { pageSlug: string }) {
  const posts = readingForPage(pageSlug);
  if (posts.length === 0) return null;

  return (
    <section className="section-y bg-white">
      <div className="container-content">
        <span className="eyebrow !text-[color:var(--color-brand-blue)]">From the blog</span>
        <h2 className="h-section mt-3">Related reading</h2>
        <ul className="mt-6 space-y-3">
          {posts.map((post) => (
            <li key={post.href}>
              <Link
                href={post.href}
                className="font-medium text-[color:var(--color-brand-navy)] underline-offset-4 hover:text-[color:var(--color-brand-orange)] hover:underline"
              >
                {post.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
