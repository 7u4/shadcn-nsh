/** What every layout names the site: its title, the route the docs live on, and where it is edited. */
import { REPO_URL, SITE_TITLE } from "./site";

export const appName = SITE_TITLE;

export const docsRoute = "/docs";

export const gitConfig = {
  repo: REPO_URL.replace(/^https:\/\/github\.com\//, ""),
  branch: "main",
};
