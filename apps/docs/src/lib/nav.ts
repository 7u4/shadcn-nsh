import { components } from "./components";
import type { ComponentKindId } from "./kinds";
import { url } from "./site";

export type NavSectionId = "getting-started" | "cli" | "theme" | "components";

export type SidebarGroupId = "start" | "components";

export type SidebarPage = {
  /** Route without base, e.g. `/docs/components/button`. */
  route: string;
  href: string;
  title: string;
  group: SidebarGroupId;
  /** The kind a component page is listed under; the sidebar labels each run of them. */
  kind?: ComponentKindId;
  /** Primary nav section this page belongs to. */
  section: NavSectionId;
  /** Repo path of the page, for "Edit this page". */
  source?: string;
};

export const PRIMARY_NAV: { id: NavSectionId; label: string; href: string }[] = [
  { id: "getting-started", label: "Getting started", href: url("docs/getting-started") },
  { id: "cli", label: "CLI", href: url("docs/cli") },
  { id: "theme", label: "Theme", href: url("docs/theme") },
  { id: "components", label: "Components", href: url("docs/components") },
];

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
    section: "getting-started",
    source: "apps/docs/src/pages/docs/getting-started.md",
  },
  {
    route: "/docs/cli",
    href: url("docs/cli"),
    title: "CLI",
    group: "start",
    section: "cli",
    source: "apps/docs/src/pages/docs/cli.md",
  },
  {
    route: "/docs/theme",
    href: url("docs/theme"),
    title: "Theme",
    group: "start",
    section: "theme",
    source: "apps/docs/src/pages/docs/theme.md",
  },
  {
    route: "/docs/customizing",
    href: url("docs/customizing"),
    title: "Customizing",
    group: "start",
    section: "theme",
    source: "apps/docs/src/pages/docs/customizing.md",
  },
  {
    route: "/docs/components",
    href: url("docs/components"),
    title: "All components",
    group: "components",
    section: "components",
    source: "apps/docs/src/pages/docs/components/index.astro",
  },
  ...components.map((c): SidebarPage => ({
    route: `/docs/components/${c.slug}`,
    href: url(`docs/components/${c.slug}`),
    title: c.title,
    group: "components",
    kind: c.kind,
    section: "components",
    source: `apps/docs/src/pages/docs/components/${c.slug}.md`,
  })),
];

function normalizePath(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "") || "";
  let path = pathname;
  if (base && path.startsWith(base)) path = path.slice(base.length) || "/";
  return path.replace(/\/+$/, "") || "/";
}

export function pageFromPath(pathname: string): SidebarPage | undefined {
  const current = normalizePath(pathname);
  return SIDEBAR_PAGES.find((p) => p.route === current);
}

export function activeSection(pathname: string): NavSectionId | undefined {
  const page = pageFromPath(pathname);
  if (page) return page.section;
  const current = normalizePath(pathname);
  if (current.startsWith("/docs/components")) return "components";
  if (current.startsWith("/docs/cli")) return "cli";
  if (current.startsWith("/docs/theme") || current.startsWith("/docs/customizing")) return "theme";
  if (current.startsWith("/docs/getting-started")) return "getting-started";
  return undefined;
}

export function neighbors(pathname: string): {
  prev?: SidebarPage;
  next?: SidebarPage;
} {
  const page = pageFromPath(pathname);
  if (!page) return {};
  const at = SIDEBAR_PAGES.findIndex((p) => p.route === page.route);
  return {
    prev: at > 0 ? SIDEBAR_PAGES[at - 1] : undefined,
    next: at >= 0 && at < SIDEBAR_PAGES.length - 1 ? SIDEBAR_PAGES[at + 1] : undefined,
  };
}
