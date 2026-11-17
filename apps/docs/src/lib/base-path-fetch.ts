/**
 * Server-function reads on a site served under a base path.
 *
 * A static server function answers from a file the build wrote to `__tsr/staticServerFnCache/…`,
 * and the router asks for server functions at `/_serverFn/…`. Both are written as *site-root*
 * absolute URLs, which a GitHub Pages project site (served under `/shadcn-nsh/`) does not have —
 * the request would leave the site. This puts the base back in front of exactly those two
 * prefixes; nothing else in the app touches `fetch`.
 *
 * Imported once, for its side effect, from `src/router.tsx`.
 */
import { BASE } from "./site";

const siteRoot = BASE.replace(/\/+$/, "");
const ROOTED = ["/__tsr/", "/_serverFn/"];

if (typeof window !== "undefined" && siteRoot) {
  const native = window.fetch.bind(window);
  window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const href = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    if (ROOTED.some((prefix) => href.startsWith(prefix))) {
      return native(`${siteRoot}${href}`, init);
    }
    return native(input, init);
  }) as typeof fetch;
}
