import { createFileRoute } from "@tanstack/react-router";
import { createFromSource } from "fumadocs-core/search/server";

import { source } from "@/lib/source";

/**
 * The search index, built at prerender time: a static site has no search server, so the route is
 * answered once by the build and shipped as `api/search` (`vite.config.ts` prerenders it).
 */
const server = createFromSource(source);

export const Route = createFileRoute("/api/search")({
  server: {
    handlers: {
      GET: () => server.staticGET(),
    },
  },
});
