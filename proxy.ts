import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAdminHostname, isProductionSiteHost, siteApex } from "./lib/cms/url";

function hostnameOf(request: NextRequest): string {
  return (request.headers.get("host") ?? "").split(":")[0]?.toLowerCase() ?? "";
}

/** Payload admin, its API, and Next assets. Everything else on this host is off. */
function isAdminAppPath(pathname: string): boolean {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/next/")
  );
}

export function proxy(request: NextRequest) {
  const hostname = hostnameOf(request);
  const { pathname, search } = request.nextUrl;

  if (isAdminHostname(hostname)) {
    if (!isAdminAppPath(pathname)) {
      return NextResponse.redirect(new URL(`/admin${search}`, request.url));
    }
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  if (isProductionSiteHost(hostname)) {
    const apexOrigin = `https://${siteApex()}`;
    const proto = (request.headers.get("x-forwarded-proto") ?? "")
      .split(",")[0]
      ?.trim()
      .toLowerCase();
    const isWww = hostname.startsWith("www.");
    const isInsecure = proto === "http";
    const legacyHome = pathname === "/home.html" || pathname === "/home.html/";

    if (legacyHome || isWww || isInsecure) {
      const destPath = legacyHome ? "/" : pathname;
      return NextResponse.redirect(new URL(`${destPath}${search}`, apexOrigin), 301);
    }
  }

  if (
    isProductionSiteHost(hostname) &&
    (pathname === "/admin" || pathname.startsWith("/admin/"))
  ) {
    return NextResponse.redirect(
      new URL(`${pathname}${search}`, `https://admin.${siteApex()}`),
      308,
    );
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)$).*)",
  ],
};
