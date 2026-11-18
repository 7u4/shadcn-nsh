/**
 * The narrow check: every demo fits a 320-point phone. `apps/docs/demos/narrow.test.tsx` opens
 * each one at that width and screenshots it; this script reads the page's right margin in every
 * picture, which must be bare page from top to bottom. A card, a field, a row of cells or a
 * skeleton line that runs past its card reaches into the margin, and the demo is named.
 *
 *   bun run check:narrow [--only <id,...>]
 *
 * Why a picture and not the layout: what a visitor sees is the page as drawn, whichever view is
 * too wide (a fixed width with no `maxWidth`, a text column that will not shrink). The rule the
 * demos follow is in `docs/port.md` § 窄屏.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { catalog } from "../catalog";
import { decodePng, type Picture } from "./pixels";
import { onlyIds, softwareBrowser } from "./render-shared";

/** The page's right margin is 20 points; the band read leaves the card's edge 4 of them. */
const BAND = 16;
/** How far a channel may stray from the page's color and still be page (antialiasing). */
const DELTA = 6;

/**
 * Demos that fill the screen with margins of their own, narrower than the page's 20: what the
 * check would read as page is their frame. Each with why.
 */
const FILLS_THE_SCREEN: Record<string, string> = {
  "nav-stack": "a stack is the whole screen: its header rule and grouped list keep 14 points",
};

const demos = catalog().paths.demos;
const shots = path.join(demos, "shots", "narrow");
fs.rmSync(shots, { recursive: true, force: true });
fs.mkdirSync(shots, { recursive: true });

const only = onlyIds();
const browserScript = softwareBrowser();
const run = (filter?: string) =>
  spawnSync(
    "nsh",
    [
      "test",
      "narrow.test.tsx",
      "--target",
      "web",
      ...(browserScript.script ? ["--browser", browserScript.script] : []),
      ...(filter ? ["--filter", filter] : []),
    ],
    { cwd: demos, stdio: "inherit" },
  ).status ?? 1;

let status = 0;
try {
  for (const filter of only ? only.map((id) => `narrow id=${id}:`) : [undefined]) {
    status ||= run(filter);
  }
} finally {
  browserScript.done();
}

/** The rows whose right margin is not bare page: `[first, last]` runs, in points. */
function overflow(picture: Picture): [number, number][] {
  const { width, height, channels, data } = picture;
  const at = (x: number, y: number) => (y * width + x) * channels;
  // The page's own color: the bottom right corner, below every demo at this height.
  const page = data.slice(at(width - 1, height - 1), at(width - 1, height - 1) + 3);
  const runs: [number, number][] = [];
  for (let y = 0; y < height; y++) {
    let bare = true;
    for (let x = width - BAND; x < width && bare; x++) {
      const p = at(x, y);
      for (let c = 0; c < 3; c++) if (Math.abs(data[p + c]! - page[c]!) > DELTA) bare = false;
    }
    if (bare) continue;
    const last = runs.at(-1);
    if (last && last[1] === y - 1) last[1] = y;
    else runs.push([y, y]);
  }
  return runs;
}

const wide: string[] = [];
for (const file of fs.readdirSync(shots).sort()) {
  const id = path.basename(file, ".png");
  if (id in FILLS_THE_SCREEN) continue;
  const runs = overflow(decodePng(fs.readFileSync(path.join(shots, file))));
  if (runs.length === 0) continue;
  wide.push(id);
  console.log(
    `narrow: ${id} runs into the margin at y ${runs.map(([a, b]) => `${a}–${b}`).join(", ")}`,
  );
}
console.log(`screenshots: ${path.relative(process.cwd(), shots)}`);
if (wide.length > 0) {
  console.log(`narrow: ${wide.length} demo(s) wider than 320 points: ${wide.join(", ")}`);
  process.exit(1);
}
if (status !== 0) process.exit(status);
console.log("narrow: every demo fits 320 points");
