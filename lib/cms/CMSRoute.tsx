import { draftMode } from "next/headers";
import { LivePreviewListener } from "./LivePreviewListener";
import { cmsPath } from "./path";
import { queryRoutedContentByPath } from "./queries";
import { RenderRoutedContent } from "./RenderRoutedContent";

/** `/blog/[slug]` renders the CMS article itself so the response stays 200. */
function blogArticleRoute(path: string): boolean {
  const normalized = cmsPath(path);
  return Boolean(normalized && /^\/blog\/[^/]+$/.test(normalized));
}

export async function CMSRoute({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const [routed, draft] = await Promise.all([
    queryRoutedContentByPath(path),
    draftMode(),
  ]);

  if (!routed || blogArticleRoute(path)) {
    return (
      <>
        {draft.isEnabled ? <LivePreviewListener /> : null}
        {children}
      </>
    );
  }

  return (
    <>
      {draft.isEnabled ? <LivePreviewListener /> : null}
      <RenderRoutedContent routed={routed} fallback={children} />
    </>
  );
}
