/**
 * Clean article HTML pasted into the "Body HTML" field so it fits the blog
 * template: drop document/script/style tags, unwrap layout containers
 * (section/div/header/...) that break the page structure and the
 * `blog-prose` child selectors, and strip inline style/class/event attributes.
 */
const DROP_WITH_CONTENT = ["script", "style", "noscript", "iframe", "object", "embed", "head", "title", "template", "form"];
const DROP_TAG_ONLY = ["html", "body", "meta", "link", "base"];
const UNWRAP = ["section", "article", "div", "header", "footer", "main", "aside", "nav", "figure", "font", "center"];
const ALLOWED = new Set([
  "p", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "a", "strong", "b", "em", "i", "u",
  "blockquote", "img", "br", "hr", "span", "sup", "sub", "table", "thead", "tbody", "tr", "th", "td", "figcaption", "code", "pre",
]);

function cleanAttrs(tag: string, attrs: string): string {
  const keep: string[] = [];
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("[^"]*"|'[^']*'|[^\s"'>]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(attrs))) {
    const name = m[1].toLowerCase();
    let value = m[2].replace(/^["']|["']$/g, "");
    if (tag === "a" && (name === "href" || name === "target" || name === "rel")) {
      if (name === "href" && /^\s*javascript:/i.test(value)) continue;
    } else if (tag === "img" && ["src", "alt", "width", "height"].includes(name)) {
      if (name === "src" && /^\s*javascript:/i.test(value)) continue;
    } else if ((tag === "td" || tag === "th") && (name === "colspan" || name === "rowspan")) {
      // keep
    } else {
      continue;
    }
    value = value.replace(/"/g, "&quot;");
    keep.push(`${name}="${value}"`);
  }
  return keep.length ? " " + keep.join(" ") : "";
}

export function sanitizeArticleHtml(input: string): string {
  let html = input;
  html = html.replace(/<!--[\s\S]*?-->/g, "").replace(/<!doctype[^>]*>/gi, "");
  for (const tag of DROP_WITH_CONTENT) {
    html = html.replace(new RegExp(`<${tag}\\b[\\s\\S]*?</${tag}\\s*>`, "gi"), "");
  }
  html = html.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (full, rawTag: string, attrs: string) => {
    const tag = rawTag.toLowerCase();
    const closing = full.startsWith("</");
    if (DROP_TAG_ONLY.includes(tag) || UNWRAP.includes(tag) || DROP_WITH_CONTENT.includes(tag)) return "";
    if (tag === "h1") return closing ? "</h2>" : "<h2>";
    if (!ALLOWED.has(tag)) return "";
    if (closing) return `</${tag}>`;
    const selfClose = /\/\s*$/.test(attrs) || tag === "br" || tag === "hr" || tag === "img";
    return `<${tag}${cleanAttrs(tag, attrs)}${selfClose && tag !== "br" && tag !== "hr" ? " /" : ""}>`;
  });
  // Bare text left directly at the top level (from unwrapped containers) stays readable.
  html = html.replace(/<p>\s*<\/p>/g, "").replace(/\n{3,}/g, "\n\n");
  return html.trim();
}
