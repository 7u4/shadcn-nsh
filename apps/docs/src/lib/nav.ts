import { components } from "./components";
import type { ComponentKindId } from "./kinds";
import { url } from "./site";

export type SidebarGroupId = "start" | "components";

export type SidebarPage = {
  /** Route without base, e.g. `/docs/components/button`. */
  route: string;
  href: string;
  title: string;
  group: SidebarGroupId;
  /** The kind a component page is listed under; the sidebar labels each run of them. */
  kind?: ComponentKindId;
  /** Repo path of the page, for "Edit this page". */
  source?: string;
};

export const SIDEBAR_GROUPS: Record<SidebarGroupId, string> = {
  start: "Start here",
  components: "Components",
};

/**
 * Flat docs pages in sidebar / pager order (NSH-style consecutive groups), one run per component
 * kind: the generated list is already in kind order, which is the index's order too.
 */
export const SIDEBAR_PAGES: SidebarPage[] = [
  {
    route: "/docs/getting-started",
    href: url("docs/getting-started"),
    title: "Getting started",
    group: "start",
    source: "apps/docs/content/docs/getting-started.md",
  },
  {
    route: "/docs/cli",
    href: url("docs/cli"),
    title: "CLI",
    group: "start",
    source: "apps/docs/content/docs/cli.md",
  },
  {
    route: "/docs/theme",
    href: url("docs/theme"),
    title: "Theme",
    group: "start",
    source: "apps/docs/content/docs/theme.md",
  },
  // `themes`, the index and `coverage` are `.mdx`: their body is one component drawn from the
  // generated tables.
  {
    route: "/docs/themes",
    href: url("docs/themes"),
    title: "Themes",
    group: "start",
    source: "apps/docs/content/docs/themes.mdx",
  },
  {
    route: "/docs/customizing",
    href: url("docs/customizing"),
    title: "Customizing",
    group: "start",
    source: "apps/docs/content/docs/customizing.md",
  },
  {
    route: "/docs/icons",
    href: url("docs/icons"),
    title: "Icons",
    group: "start",
    source: "apps/docs/content/docs/icons.md",
  },
  {
    route: "/docs/components",
    href: url("docs/components"),
    title: "All components",
    group: "components",
    source: "apps/docs/content/docs/components.mdx",
  },
  {
    route: "/docs/components/coverage",
    href: url("docs/components/coverage"),
    title: "Coverage",
    group: "components",
    source: "apps/docs/content/docs/components/coverage.mdx",
  },
  ...components.map((c): SidebarPage => ({
    route: `/docs/components/${c.slug}`,
    href: url(`docs/components/${c.slug}`),
    title: c.title,
    group: "components",
    kind: c.kind,
    source: `apps/docs/content/docs/components/${c.slug}.md`,
  })),
];
