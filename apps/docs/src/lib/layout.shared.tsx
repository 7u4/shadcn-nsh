import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { appName, gitConfig } from "./shared";
import { REPO_URL } from "./site";

/** The chrome the home layout and the docs layout share: the name, and the repo it is edited in. */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: appName },
    githubUrl: REPO_URL,
  };
}
