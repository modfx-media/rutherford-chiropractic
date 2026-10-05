import config from "@payload-config";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import type { PayloadRequest } from "payload";
import { publicPath } from "@/lib/cms/path";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");
  const previewSecret = searchParams.get("previewSecret");

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response("You are not allowed to preview this page", { status: 403 });
  }

  if (!path || path.includes("null") || path.includes("undefined")) {
    return new Response("Invalid path", { status: 400 });
  }

  if (!path.startsWith("/")) {
    return new Response("This endpoint can only be used for relative previews", {
      status: 400,
    });
  }

  const dest = publicPath(path);
  if (!dest) {
    return new Response("Invalid path", { status: 400 });
  }

  const payload = await getPayload({ config });
  let user = null;
  try {
    const authResult = await payload.auth({
      req: request as unknown as PayloadRequest,
      headers: request.headers,
    });
    user = authResult.user;
  } catch (error) {
    payload.logger.error({ err: error }, "Error verifying token for live preview");
    return new Response("You are not allowed to preview this page", { status: 403 });
  }

  const draft = await draftMode();
  if (!user) {
    draft.disable();
    return new Response("You are not allowed to preview this page", { status: 403 });
  }

  draft.enable();
  redirect(dest);
}
