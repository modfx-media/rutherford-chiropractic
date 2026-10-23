import Link from "next/link";
import { topicLinksForPost, type TopicLinks } from "../../_lib/blog-links";

function LinkedSentence({ topic }: { topic: TopicLinks }) {
  return (
    <p>
      {topic.before}{" "}
      {topic.links.map((link, index) => {
        const last = index === topic.links.length - 1;
        const joiner = index === 0 ? null : last ? (topic.links.length === 2 ? " and " : ", and ") : ", ";
        return (
          <span key={link.href}>
            {joiner}
            <Link href={link.href}>{link.label}</Link>
          </span>
        );
      })}
      {topic.after}
    </p>
  );
}

/** In-article links from a post to indexable service or condition pages. */
export function BlogTopicLinks({ slug, title }: { slug: string; title: string }) {
  const topic = topicLinksForPost(slug, title);
  if (topic.links.length < 2) return null;
  return (
    <div className="blog-prose mt-10 border-t border-[color:var(--color-border)] pt-8">
      <LinkedSentence topic={topic} />
    </div>
  );
}
