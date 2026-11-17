import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
} from "fumadocs-ui/layouts/docs/page";
import { Suspense, use } from "react";

import { DemoPanel } from "@/components/fd/demo-panel";
import { useMDXComponents } from "@/components/fd/mdx";
import { PaletteSwitch } from "@/components/fd/palette-switch";
import { getComponentBySlug } from "@/lib/components";
import { CONTENT_PATHS } from "@/lib/content-paths";
import { baseOptions } from "@/lib/layout.shared";
import { SIDEBAR_PAGES } from "@/lib/nav";
import { nshElementUrl, shadcnUrl } from "@/lib/official";
import { EDIT_BASE, SITE_TITLE } from "@/lib/site";
import { docs, pageTree, source } from "@/lib/source";

/** What the page loader returns; `useLoaderData` does not carry it through `head` as an argument. */
type PageData = {
  path: string;
  title: string;
  description?: string;
  markdownUrl: string;
  pageTree: Awaited<ReturnType<typeof source.serializePageTree>>;
};

/**
 * The demo sources, for the panel's Source tab: the same files the demos are packaged from, read
 * when the tab opens (`?raw`, lazily — the page's script should not carry every demo).
 */
const DEMO_SOURCES = import.meta.glob("../../../demos/*.tsx", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

export const Route = createFileRoute("/docs/$")({
  component: Page,
  head: ({ loaderData }) => {
    const page = loaderData as PageData | undefined;
    return {
      meta: page
        ? [
            { title: `${page.title} — ${SITE_TITLE}` },
            { name: "description", content: page.description ?? "" },
          ]
        : [],
    };
  },
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/").filter(Boolean) ?? [];
    // An unknown path is the router's not-found here: a static build has no server function
    // answer for a page it did not prerender (`content-paths.ts`).
    if (!CONTENT_PATHS.has(slugs.length === 0 ? "index.md" : `${slugs.join("/")}.md`)) {
      throw notFound();
    }
    const data = await loader({ data: slugs });
    if (!data) throw notFound();
    await docs.getPage(data.path)?.preload();
    return data;
  },
});

const loader = createServerFn({ method: "GET" })
  .validator((slugs: string[]) => slugs)
  .middleware([staticFunctionMiddleware])
  .handler(async ({ data: slugs }): Promise<PageData | null> => {
    const page = source.getPage(slugs);
    // `null`, not `throw notFound()`: a static server function answers with a value, and the
    // router is the one that turns the miss into its not-found route.
    if (!page) return null;

    return {
      path: page.path,
      title: page.data.title,
      description: page.data.description,
      markdownUrl: `${page.url}.md`,
      pageTree: await source.serializePageTree(pageTree()),
    };
  });

/**
 * What `src/layouts/Docs.astro` added around a page's markdown, in the same order: the Official
 * links, the Preview panel, then the "Behavior & a11y" and "Source" sections a component page
 * ends with. None of it is written in the `.md`.
 *
 * One difference from the Astro page: the standfirst (the markdown before its first `##`) used to
 * sit above Preview, which the layout could do because it had the rendered HTML. Here Preview
 * comes first, and the page's own sections follow, so nothing is cut out of the markdown.
 */
function Content({ path, markdownUrl }: { path: string; markdownUrl: string }) {
  const page = docs.getPage(path);
  if (!page) throw new Error(`unknown page: ${path}`);

  const { toc } = use(page.load());
  const MDX = page.body;

  const slug = /^components\/([^/]+)\.md$/.exec(path)?.[1];
  const componentDoc = page.component === true && slug ? getComponentBySlug(slug) : undefined;
  const shadcnHref = componentDoc?.shadcn ? shadcnUrl(componentDoc.shadcn) : undefined;
  const nshHref =
    componentDoc?.nshElement != null ? nshElementUrl(componentDoc.nshElement) : undefined;
  const demo = page.demo;
  const editPath = SIDEBAR_PAGES.find(
    (entry) => entry.route === `/docs/${path.replace(/\.md$/, "")}`,
  )?.source;
  const authoringFile = componentDoc ? `packages/ui/${componentDoc.slug}.tsx` : undefined;

  return (
    <DocsPage toc={toc}>
      <DocsTitle>{page.title}</DocsTitle>
      <DocsDescription>{page.description}</DocsDescription>
      <div className="flex flex-wrap items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <PaletteSwitch />
      </div>
      <DocsBody>
        {componentDoc && (shadcnHref || nshHref) ? (
          <p className="text-fd-muted-foreground text-sm">
            Official:{" "}
            {shadcnHref ? (
              <a href={shadcnHref} rel="noopener noreferrer">
                shadcn/ui · {componentDoc.shadcn}
              </a>
            ) : null}
            {shadcnHref && nshHref ? " | " : null}
            {nshHref ? (
              <>
                <a href={nshHref} rel="noopener noreferrer">
                  NSH · nsh.dev/elements/{componentDoc.nshElement}
                </a>{" "}
                <a
                  className="text-fd-muted-foreground"
                  href={`${nshHref}.md`}
                  rel="noopener noreferrer"
                >
                  .md
                </a>
              </>
            ) : null}
          </p>
        ) : null}
        {demo ? (
          <>
            <h2 id="preview">Preview</h2>
            <DemoPanel name={demo} loadSource={DEMO_SOURCES[`../../../demos/${demo}.tsx`]} />
          </>
        ) : null}
        <MDX components={useMDXComponents()} />
        {componentDoc && nshHref ? (
          <>
            <h2 id="behavior-a11y">Behavior &amp; a11y</h2>
            <p>
              Keyboard, focus, platform notes, and the full unstyled API live on nsh — not on this
              page. See{" "}
              <a href={nshHref} rel="noopener noreferrer">
                {componentDoc.title} on nsh.dev
              </a>
              . This package is a curated styled wrapper; only props listed under API (when present)
              are part of the public surface here.
            </p>
          </>
        ) : null}
        {componentDoc ? (
          <>
            <h2 id="source">Source</h2>
            <p>
              Authoring: <code>{authoringFile}</code>. Registry: <code>{componentDoc.slug}</code>{" "}
              (depends on <code>theme</code>).
            </p>
          </>
        ) : null}
        {editPath ? (
          <p className="text-sm">
            <a href={`${EDIT_BASE}${editPath}`} target="_blank" rel="noopener noreferrer">
              Edit this page on GitHub
            </a>
          </p>
        ) : null}
      </DocsBody>
    </DocsPage>
  );
}

function Page() {
  const data = Route.useLoaderData() as PageData;
  const { pageTree: tree, path, markdownUrl } = useFumadocsLoader(data);

  return (
    <DocsLayout {...baseOptions()} tree={tree}>
      <Suspense>
        <Content path={path} markdownUrl={markdownUrl} />
      </Suspense>
    </DocsLayout>
  );
}
