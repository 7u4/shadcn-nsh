/**
 * The `.md` pages under `content/docs`, as the routes they answer at, known before anything loads:
 * `import.meta.glob` records the files at build time, and this module only reads their names.
 *
 * A route uses it to answer an unknown path with the router's not-found *without* asking a server
 * function for it — a static build has no answer cached for a page it never prerendered, and the
 * host would hand back `404.html` where JSON was expected.
 */
const FILES = import.meta.glob("../../content/docs/**/*.md");

/** `components/button.md`, `getting-started.md`, `index.md` — every page the build has. */
export const CONTENT_PATHS: ReadonlySet<string> = new Set(
  Object.keys(FILES).map((file) => file.replace("../../content/docs/", "")),
);
