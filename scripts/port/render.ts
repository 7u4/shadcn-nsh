/**
 * Runs the render check (`<root>/demos/render.test.tsx`) in a headless browser. The test writes
 * its screenshots to `shots/` beside it, relative to the directory it runs in, so it runs there.
 *
 *   bun scripts/port/render.ts [--only <id,...>] [--filter <name>] [--no-baseline]
 *
 * `--only` runs the pages of the ids named (a comma-separated list of catalog ids, matched
 * whole: `--only table` leaves `data-table` alone), which is what a family's change needs. The
 * test names carry `id=` so `nsh test`'s substring `--filter` can name one alone.
 * `--no-baseline` skips the comparison with `baseline/`, which was recorded on macOS: another
 * platform draws text differently, so there only the component ↔ reference pairs are a gate.
 *
 * The pictures are compared here, after the test, which only takes them: byte for byte, or
 * within a page's `tolerance` (the avatar's circular photos) or the antialiasing budget every
 * page shares (`render-cases.ts`). A difference beyond that fails the gate.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { catalog } from "../catalog";
import { repo } from "./lib";
import { comparePairs, onlyIds, softwareBrowser } from "./render-shared";

const demos = catalog().paths.demos;

const only = onlyIds();
/** The same list for `baseline.ts`: it re-records (or checks) those pictures alone. */
const onlyArg = only ? ["--only", only.join(",")] : [];
const shots = path.join(demos, "shots");
fs.rmSync(shots, { recursive: true, force: true });
fs.mkdirSync(shots, { recursive: true });

// An installed CLI finds its runtimes next to `bin/nsh`, so nothing sets `NSH_RUNTIME`
// here; a caller that sets it still gets it through `process.env`.
const env = { ...process.env };

/** The arguments `nsh test` takes: everything but our own (`--only <ids>`, `--no-baseline`). */
const passthrough = process.argv.slice(2).filter((arg, index, all) => {
  if (arg === "--no-baseline" || arg === "--only") return false;
  return all[index - 1] !== "--only";
});

const browserScript = softwareBrowser();

/** One `nsh test` run: the whole table, or the pages of one id (`id=<id>:`, a substring). */
function run(filter?: string): number {
  const result = spawnSync(
    "nsh",
    [
      "test",
      "render.test.tsx",
      "--target",
      "web",
      ...(browserScript.script ? ["--browser", browserScript.script] : []),
      ...(filter ? ["--filter", filter] : passthrough),
    ],
    { cwd: demos, stdio: "inherit", env },
  );
  return result.status ?? 1;
}

let status = 0;
if (only) {
  for (const id of only) {
    if (status !== 0) break;
    status = run(`id=${id}:`);
  }
} else {
  status = run();
}
browserScript.done();
console.log(`screenshots: ${path.relative(repo, shots)}`);
console.log("one page of them all: bun run port:sheet");

const differs =
  status === 0
    ? comparePairs({
        pass: "render",
        shots,
        name: (id, scheme) => `${id}-pointer-${scheme}`,
        only,
      })
    : 0;

if (differs > 0) process.exit(1);
// A filtered run holds only some of the shots, so it cannot be compared with the whole baseline;
// a `--only` run holds exactly the ids it names, which `baseline.ts` checks on their own.
if (status === 0) {
  if (process.argv.includes("--filter")) {
    console.log("baseline: skipped for a filtered run");
  } else if (process.argv.includes("--no-baseline")) {
    console.log("baseline: skipped (--no-baseline)");
  } else {
    const compare = spawnSync("bun", [path.join(import.meta.dir, "baseline.ts"), ...onlyArg], {
      cwd: repo,
      stdio: "inherit",
    });
    if ((compare.status ?? 1) !== 0) process.exit(compare.status ?? 1);
  }
}
process.exit(status);
