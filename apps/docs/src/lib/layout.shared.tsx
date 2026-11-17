import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { appName } from "./shared";
import { REPO_URL } from "./site";

/**
 * The chrome the home layout and the docs layout share: the name, and the repo it is edited in. No
 * `links`: the sidebar's tree already starts with Getting started, CLI, Theme and the components,
 * and the docs layout draws `links` in that same sidebar, so they would be listed twice.
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: appName },
    githubUrl: REPO_URL,
  };
}
