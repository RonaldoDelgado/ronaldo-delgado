const DEVELOPMENT_ORIGIN = "http://localhost:3000";

export function getSiteUrl(): URL {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredOrigin) {
    try {
      const url = new URL(configuredOrigin);
      if (url.protocol === "https:" || url.protocol === "http:") return new URL(url.origin);
    } catch {
      // Invalid deployment configuration falls back to the documented local origin.
    }
  }

  return new URL(DEVELOPMENT_ORIGIN);
}
