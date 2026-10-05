const LOCALHOST = /localhost|127\.0\.0\.1/i;

function stripSlash(value: string): string {
  return value.replace(/\/$/, "");
}

/** Apex hostname of the public site, without `www`. */
export function siteApex(): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://rutherfordchiropractic.com";
  try {
    return new URL(site).hostname.replace(/^www\./, "");
  } catch {
    return "rutherfordchiropractic.com";
  }
}

export function isAdminHostname(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return host === "admin.localhost" || host === `admin.${siteApex()}`;
}

export function isProductionSiteHost(hostname: string): boolean {
  const apex = siteApex();
  const host = hostname.toLowerCase();
  return host === apex || host === `www.${apex}`;
}

/**
 * Origin that serves Payload admin.
 * Local dev stays on the same host as the site. Production is `admin.{apex}`.
 */
export function getAdminOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_ADMIN_URL;
  if (explicit && !LOCALHOST.test(explicit)) return stripSlash(explicit);

  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!server || LOCALHOST.test(server)) return stripSlash(server || "http://localhost:3000");

  return `https://admin.${siteApex()}`;
}

/** Public https origin on Vercel; localhost is never copied into production. */
export function getServerURL(): string {
  const explicit = process.env.NEXT_PUBLIC_SERVER_URL;
  if (explicit && !LOCALHOST.test(explicit)) return stripSlash(explicit);

  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site && !LOCALHOST.test(site)) return stripSlash(site);

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return stripSlash(explicit || site || "http://localhost:3000");
}

export function getCorsOrigins(): string[] {
  const origins = new Set<string>();
  const add = (value?: string | null) => {
    if (!value) return;
    origins.add(stripSlash(value.startsWith("http") ? value : `https://${value}`));
  };

  add("https://rutherfordchiropractic.com");
  add("https://www.rutherfordchiropractic.com");
  add(`https://admin.${siteApex()}`);
  add(getAdminOrigin());
  add("http://admin.localhost:3000");
  add(process.env.NEXT_PUBLIC_SITE_URL);
  add(process.env.NEXT_PUBLIC_SERVER_URL);
  add(process.env.NEXT_PUBLIC_ADMIN_URL);
  if (process.env.VERCEL_URL) add(`https://${process.env.VERCEL_URL}`);
  add("http://localhost:3000");

  return [...origins];
}
