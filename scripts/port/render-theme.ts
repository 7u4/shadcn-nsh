/**
 * The render check under the themes the demos can switch to: every demo, and its reference page
 * beside it, drawn with the theme its palette names (`apps/docs/demos/palettes.ts`) — shadcn's,
 * the theme the registry installs — and the two compared, so a component drawn by hand still draws
 * what its theme says.
 *
 *   bun scripts/port/render-theme.ts [--only <id,...>] [--filter <name>]
 *
 * The test opens each page with the palette in its storage, as the site's switch leaves it, and the
 * page reads it before it mounts (`apply-palette.ts`): the theme arrives the way an app gets it,
 * not from a second `nsh.json` or a copy of the demos with a `selectTheme` added. `default` is the
 * build-time theme, whose check is `render.ts`.
 *
 * Nothing is kept as a baseline — the build-time theme's pictures are (`render.ts`) — so this
 * pass is reviewed by eye (`port:sheet`) and by what it reports: a component and its reference
 * page differ under a theme exactly when a shell overrides what the theme says.
 *
 * The pictures stay in `demos/shots-theme/`.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { PALETTES } from "../../apps/docs/demos/palettes";
import { cases } from "../../apps/docs/demos/render-cases";
import { catalog } from "../catalog";
import { repo } from "./lib";
import { comparePairs, onlyIds, softwareBrowser } from "./render-shared";

const demos = catalog().paths.demos;
const shots = path.join(demos, "shots-theme");
const only = onlyIds();
/** The themes to check: the build-time one is `render.ts`'s. */
const palettes = PALETTES.filter((palette) => palette.id !== "default");
const chosen = cases.filter(({ id }) => !only || only.includes(id));

// The runtime `nsh test` runs with is the installed CLI's (`docs/toolchain.md`); it finds its
// runtimes next to `bin/nsh`, so nothing sets `NSH_RUNTIME` here; a caller that sets it still gets
// it through `process.env`.
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
    { cwd: demos, stdio: "inherit", env },
  );
  return result.status ?? 1;
}

fs.rmSync(shots, { recursive: true, force: true });
fs.mkdirSync(shots, { recursive: true });
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

let differs = 0;
if (status === 0) {
  for (const palette of palettes) {
    differs += comparePairs({
      pass: "theme",
      shots,
      name: (id, scheme) => `${id}-${palette.id}-${scheme}`,
      only,
    });
  }
}

console.log(`screenshots: ${path.relative(repo, shots)}`);
console.log("one page of them all: bun run port:sheet");

const pairs = chosen.filter(({ selfReference }) => !selfReference).length * 2 * palettes.length;
if (differs > 0) {
  console.error(`theme: ${differs} of ${pairs} pages differ from their reference under a theme`);
  process.exit(1);
}
if (status === 0) {
  const themes = palettes.map((palette) => palette.id).join(", ");
  console.log(`theme: ${pairs} pairs match under ${themes}`);
}
process.exit(status);
