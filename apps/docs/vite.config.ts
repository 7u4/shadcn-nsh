import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { fumadocsMdx } from "fumadocs-mdx/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

/** The prefix GitHub Pages serves the site under; `src/lib/site.ts` reads it back from Vite. */
const BASE = "/shadcn-nsh/";

/**
 * The site is served from `https://aningdev.github.io/shadcn-nsh/`, so both the assets and the
 * router live under that prefix: Vite's `base` prefixes the URLs it emits, TanStack Router's
 * `basepath` prefixes the ones it matches. The static build writes the *site* into `.output/public`
 * as its root — the prefix is not a directory of the artifact, GitHub Pages serves the same
 * directory at `/shadcn-nsh/`.
 */
export default defineConfig({
  base: BASE,
  server: {
    port: 4321,
  },
  plugins: [
    fumadocsMdx(),
    tailwindcss(),
    tanstackStart({
      router: { basepath: BASE.replace(/\/+$/, "") },
      spa: {
        enabled: true,
        prerender: {
          enabled: true,
          crawlLinks: true,
        },
      },
      // The search index is a prerendered response (`/api/search`), the only server route the
      // static site keeps: `src/routes/api/search.ts` answers it with `staticGET`.
      pages: [{ path: "/docs/getting-started" }, { path: "/api/search" }],
    }),
    react(),
    nitro(),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: {
      tslib: "tslib/tslib.es6.js",
    },
  },
});
