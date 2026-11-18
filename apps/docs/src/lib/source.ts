import type { Item, Node, Root } from "fumadocs-core/page-tree";
import { loader } from "fumadocs-core/source";
import { pageSchema } from "fumadocs-core/source/schema";
import { defineDocs } from "fumadocs-mdx/macro";
import { z } from "zod";

import { KIND_LABELS, KINDS } from "./kinds";
import { SIDEBAR_GROUPS, SIDEBAR_PAGES } from "./nav";

/**
 * A component page's frontmatter, declared once: Fumadocs' own fields plus the three the old
 * Astro pages carried — whether the page is a component's (`component`), the demo its Preview runs
 * (`demo`, a name in `apps/docs/demos`), and `demoHeight`, kept because the pages still write it
 * (the panel sizes its frame itself, so it is read and unused, as in `DemoFrame.astro`).
 */
const componentPageSchema = pageSchema.extend({
  component: z.boolean().optional(),
  demo: z.string().optional(),
  demoHeight: z.union([z.number(), z.string()]).optional(),
});

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    async: true,
    schema: componentPageSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
});

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

/**
 * The sidebar, in the order `src/lib/nav.ts` keeps: "Start here", then the component pages one run
 * per kind ("NSH Base", then "Shadcn Copy"), each run labelled with a separator, as the Astro
 * `Sidebar.astro` did. Pages the content does not have yet are left out: the tree is the pages
 * that exist, ordered by the list, so a half-migrated content folder still navigates.
 */
export function pageTree(): Root {
  const existing = new Set(source.getPages().map((page) => page.url));
  const item = (page: (typeof SIDEBAR_PAGES)[number]): Item => ({
    type: "page",
    name: page.title,
    url: page.route,
  });
  const listed = SIDEBAR_PAGES.filter((page) => existing.has(page.route));

  const start = listed.filter((page) => page.group === "start");
  const components = listed.filter((page) => page.group === "components");

  const children: Node[] = [];
  if (start.length > 0) {
    children.push({ type: "separator", name: SIDEBAR_GROUPS.start });
    children.push(...start.map(item));
  }
  // "All components" and "Coverage" are the group's own pages, above the two runs (they carry no
  // kind: they list the set rather than belong to one).
  const group = components.filter((page) => page.kind === undefined);
  if (components.length > 0) {
    children.push({ type: "separator", name: SIDEBAR_GROUPS.components });
    children.push(...group.map(item));
  }
  const runs = KINDS.map((kind) => ({
    kind,
    pages: components.filter((page) => page.kind === kind),
  })).filter((run) => run.pages.length > 0);
  for (const run of runs) {
    children.push({ type: "separator", name: KIND_LABELS[run.kind] });
    children.push(...run.pages.map(item));
  }

  return { name: "Docs", children };
}
