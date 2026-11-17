import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";

import { PRIMARY_NAV } from "./nav";
import { appName, gitConfig } from "./shared";
import { REPO_URL } from "./site";

/** The chrome the home layout and the docs layout share: the name, and the repo it is edited in. */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: appName },
    githubUrl: REPO_URL,
    links: primaryLinks(),
  };
}

/**
 * `PRIMARY_NAV` in the same place the Astro `Nav.astro` put it: Getting started, CLI, Theme,
 * Components. Nested matching, so a component page keeps "Components" lit, as `activeSection`
 * does for the sidebar. The urls are the routes below the base, not `url()`: the router's `Link`
 * puts the base on itself, and its pathname is base-less too, which is what "active" compares.
 */
function primaryLinks(): LinkItemType[] {
  return PRIMARY_NAV.map((item) => ({
    type: "main",
    text: item.label,
    url: item.route,
    active: "nested-url",
  }));
}
