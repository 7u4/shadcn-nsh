import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";

import { baseOptions } from "@/lib/layout.shared";
import { SITE_DESCRIPTION, SITE_TITLE, url } from "@/lib/site";
import { pageTree, source } from "@/lib/source";

/**
 * The site's front page: the docs' own layout and sidebar, with the three lines that say what this
 * is and where to start. It is a route rather than a content page because it answers `/`, not a
 * path below `/docs`; everything else about it is a docs page (`src/routes/docs/$.tsx`).
 *
 * The sidebar is the docs tree, which only the server can serialize — so the page asks a server
 * function for it, the way the docs route does, and a static build prerenders the answer.
 */
export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: `Docs — ${SITE_TITLE}` }, { name: "description", content: SITE_DESCRIPTION }],
  }),
  loader: () => loadHome(),
});

type HomeData = { pageTree: Awaited<ReturnType<typeof source.serializePageTree>> };

const loadHome = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .handler(async (): Promise<HomeData> => ({
    pageTree: await source.serializePageTree(pageTree()),
  }));

function Home() {
  const data = Route.useLoaderData() as HomeData;
  const { pageTree: tree } = useFumadocsLoader(data);

  return (
    <DocsLayout {...baseOptions()} tree={tree}>
      <DocsPage toc={[]}>
        <DocsTitle>Docs</DocsTitle>
        <DocsDescription>Styled NSH components — copy-into-app, monorepo-ready.</DocsDescription>
        <DocsBody>
          <p>
            Styled component layer for <a href="https://nsh.dev">Native Shell</a>: copy components
            into your app from the registry, same idea as shadcn/ui on Radix.
          </p>
          <p>
            Start with <a href={url("docs/getting-started")}>Getting started</a>, read{" "}
            <a href={url("docs/theme")}>Theme</a>, or jump to{" "}
            <a href={url("docs/components/button")}>Button</a>. Behavior and a11y deep-link to{" "}
            <a href="https://nsh.dev/elements">nsh.dev/elements</a>.
          </p>
          <blockquote>
            <p>
              Live web demos use NSH’s web target (WASM → DOM) — behaviour sketch, not a platform
              substitute. Prefer <code>apps/gallery</code> for native / a11y checks.
            </p>
          </blockquote>
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}
