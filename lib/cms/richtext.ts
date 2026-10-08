import { convertLexicalToHTMLAsync } from "@payloadcms/richtext-lexical/html-async";
import { getPayload, type PayloadRequest } from "payload";
import type { RoutedDoc } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function nodeHasContent(node: unknown): boolean {
  if (!isRecord(node)) return false;
  if (node.type === "upload" || node.type === "horizontalrule" || node.type === "linebreak") {
    return true;
  }
  if (node.type === "text") return typeof node.text === "string" && node.text.trim().length > 0;
  if (Array.isArray(node.children) && node.children.some((child) => nodeHasContent(child))) {
    return true;
  }
  return false;
}

/** True when the editor has text or an inline upload, not just an empty paragraph. */
export function lexicalHasContent(value: unknown): boolean {
  if (!isRecord(value) || !isRecord(value.root) || !Array.isArray(value.root.children)) return false;
  return value.root.children.some((node) => nodeHasContent(node));
}

export function lexicalFromDoc(doc: RoutedDoc): unknown {
  if (!isRecord(doc.content)) return null;
  const lexical = doc.content.lexical;
  return lexicalHasContent(lexical) ? lexical : null;
}

type PopulateArgs = { id: number | string; collectionSlug: string };

async function populateMedia(args: PopulateArgs, req?: PayloadRequest) {
  const payload =
    req?.payload ??
    (await getPayload({ config: (await import("@payload-config")).default }));
  return payload.findByID({
    collection: args.collectionSlug as "media",
    id: args.id,
    depth: 0,
    overrideAccess: true,
    req,
  });
}

export async function lexicalToHtml(value: unknown, req?: PayloadRequest): Promise<string> {
  if (!lexicalHasContent(value)) return "";
  const html = await convertLexicalToHTMLAsync({
    data: value as never,
    disableContainer: true,
    populate: (async (args: PopulateArgs) => populateMedia(args, req)) as never,
  });
  return html.trim();
}

export async function articleBodyHtml(doc: RoutedDoc): Promise<string | undefined> {
  const lexical = lexicalFromDoc(doc);
  if (lexical) {
    try {
      const html = await lexicalToHtml(lexical);
      if (html) return html;
    } catch (error) {
      console.error("[cms] lexical", error);
    }
  }

  if (typeof doc.bodyHtml === "string" && doc.bodyHtml.trim()) return doc.bodyHtml;
  if (isRecord(doc.content) && typeof doc.content.bodyHtml === "string" && doc.content.bodyHtml.trim()) {
    return doc.content.bodyHtml;
  }
  return undefined;
}
