/**
 * The render check under the shadcn theme: every demo, and its reference page beside it, drawn
 * with `themes/shadcn/` selected — the theme the registry installs — and the two compared, so a
 * component drawn by hand still draws what its theme says.
 *
 *   bun scripts/port/render-theme.ts [--only <id,...>] [--filter <name>]
 *
 * The pages are copies of the demos one directory over (`apps/docs/demos-themed/`), each with
 * `selectTheme(shadcn)` before it mounts: the app's own theme is the build-time one, so the
 * theme comes from the same switch an app makes at run time, not from a second `nsh.json`. A page
 * stays its own entry, as in the build-time check, so the two draw the same app.
 *
 * Nothing is kept as a baseline — the build-time theme's pictures are (`render.ts`) — so this
 * pass is reviewed by eye (`port:sheet`) and by what it reports: a component and its reference
 * page differ under a theme exactly when a shell overrides what the theme says.
 *
 * The copies are removed after the run; the pictures stay in `demos/shots-theme/`.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { cases } from "../../apps/docs/demos/render-cases";
import { catalog } from "../catalog";
import { repo } from "./lib";
import { comparePairs, onlyIds, softwareBrowser } from "./render-shared";

const demos = catalog().paths.demos;
const themed = path.join(path.dirname(demos), "demos-themed");
const shots = path.join(themed, "shots-theme");
const kept = path.join(demos, "shots-theme");
const only = onlyIds();
const chosen = cases.filter(({ id }) => !only || only.includes(id));

/** The two imports a copied page gains: the theme, and how to put it on. */
const HEAD = `import { selectTheme } from "@shadcn-nsh/theme";
import { shadcn } from "@shadcn-nsh/theme-shadcn";

`;

/** Whether a source is a page: its last statement mounts one (every demo and reference page). */
const isPage = (source: string) =>
  /^mount\(/m.test(source.trimEnd().split("\n").at(-1)?.trim() ?? "");

/** A page, with the theme put on before it mounts: the first render is already the theme's. */
function withTheme(source: string): string {
  const at = source.lastIndexOf("\nmount(");
  const call = at < 0 ? "" : source.slice(at + 1);
  const body = at < 0 ? source : source.slice(0, at + 1);
  return `${HEAD}${body}// The shadcn theme, on before the first render: the theme the registry installs.\nselectTheme(shadcn);\n\n${call}`;
}

/** The demos' files, as a second app: the pages ask for the theme, everything else is copied. */
function copy() {
  fs.rmSync(themed, { recursive: true, force: true });
  fs.mkdirSync(themed, { recursive: true });
  fs.mkdirSync(shots, { recursive: true });
  for (const name of fs.readdirSync(demos)) {
    const from = path.join(demos, name);
    if (!fs.statSync(from).isFile()) continue;
    if (!/\.(tsx?|json)$/.test(name)) continue;
    const source = fs.readFileSync(from, "utf8");
    const text = name.endsWith(".tsx") && isPage(source) ? withTheme(source) : source;
    fs.writeFileSync(path.join(themed, name), text);
  }
  // The types host `nsh check` generated for the demos: the pages' imports of `nsh` resolve it.
  const host = path.join(demos, ".nsh");
  if (fs.existsSync(host)) fs.symlinkSync(host, path.join(themed, ".nsh"));
}

// An installed CLI finds its runtimes next to `bin/nsh`, so nothing sets `NSH_RUNTIME` here; a
// caller that sets it still gets it through `process.env`.
const env = { ...process.env };

/** The arguments `nsh test` takes: everything but our own (`--only <ids>`). */
const passthrough = process.argv.slice(2).filter((arg, index, all) => {
  if (arg === "--only") return false;
  return all[index - 1] !== "--only";
});

const browserScript = softwareBrowser();

/** One `nsh test` run: the whole table, or the pages of one id (`id=<id>:`, a substring). */
function run(filter?: string): number {
  const result = spawnSync(
    "nsh",
    [
      "test",
      "render-theme.test.tsx",
      "--target",
      "web",
      ...(browserScript.script ? ["--browser", browserScript.script] : []),
      ...(filter ? ["--filter", filter] : passthrough),
    ],
    { cwd: themed, stdio: "inherit", env },
  );
  return result.status ?? 1;
}

copy();
let status = 0;
try {
  if (only) {
    for (const id of only) {
      if (status !== 0) break;
      status = run(`id=${id}:`);
    }
  } else {
    status = run();
  }
} finally {
  browserScript.done();
}

const differs =
  status === 0
    ? comparePairs({
        pass: "theme",
        shots,
        name: (id, scheme) => `${id}-shadcn-${scheme}`,
        only,
      })
    : 0;

// The pictures stay where the other check's do, for a look by eye; the app does not.
fs.rmSync(kept, { recursive: true, force: true });
if (fs.existsSync(shots)) fs.renameSync(shots, kept);
fs.rmSync(themed, { recursive: true, force: true });
console.log(`screenshots: ${path.relative(repo, kept)}`);
console.log("one page of them all: bun run port:sheet");

const pairs = chosen.filter(({ selfReference }) => !selfReference).length * 2;
if (differs > 0) {
  console.error(`theme: ${differs} of ${pairs} pages differ from their reference under the theme`);
  process.exit(1);
}
if (status === 0) console.log(`theme: ${pairs} pairs match under the shadcn theme`);
process.exit(status);
