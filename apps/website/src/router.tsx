// First: server-function reads get the site's base path (`src/lib/base-path-fetch.ts`).
import "./lib/base-path-fetch";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import { NotFound } from "@/components/fd/not-found";

import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultNotFoundComponent: NotFound,
  });
}
