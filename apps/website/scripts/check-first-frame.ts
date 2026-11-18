/**
 * The first frame's budget: a demo's page must put something on screen within 2000 ms of its
 * navigation, or the check fails and names it. A component that makes every page slower — a style
 * re-read on every node, a wrapper that re-renders its subtree — shows up here first as one demo
 * over budget and then as more.
 *
 *   bun run check:first-frame [--only sidebar,plot] [--budget 2000] [--deadline 20000]
 *                             [--json <file>]
 *
 * Each demo is a run of its own (`demo-frames.ts`): its packaged page (`public/demos/<id>/`,
 * `bun run docs:demos`) in headless Chrome, at desktop size with the light theme and reduced
 * motion — the same window `check:palette` measures in, so the numbers here and there agree. The
 * recorder counts, frame by frame, the draws the page makes on its canvases and the views it has
 * put on screen; the first frame with either is the first frame.
 *
 * `--deadline <ms>` is how long a demo may take to show that frame at all (20000 by default): a
 * demo slower than that is reported as over budget, unnamed by a number.
 * `--json <file>` also writes every demo's first frame, for a before-and-after beside it.
 *
 * Nothing here compiles NSH or needs the site built: it reads the packaged demos.
 */
import fs from "node:fs";
import path from "node:path";

import { packagedDemo, publicRoot, servePackagedDemos, watchDemo } from "./demo-frames";

/** What a demo's first frame may take, in milliseconds. */
const BUDGET = 2000;

const args = process.argv.slice(2);
const named = (name: string) => {
  const at = args.indexOf(name);
  return at < 0 ? undefined : args[at + 1];
};
const only = named("--only")?.split(",");
const budget = Number(named("--budget") ?? BUDGET);
const deadline = Number(named("--deadline") ?? 20000);
const jsonOut = named("--json");

/** What the page records, frame by frame. */
type Frame = {
  /** Milliseconds since the navigation started, at the frame's start. */
  t: number;
  /** How many fills and strokes the frame drew on canvases. */
  draws: number;
  /** The views on screen at the frame's start; 0 while the page keeps them hidden. */
  views: number;
};

const demos = fs
  .readdirSync(path.join(publicRoot, "demos"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !only || only.includes(name))
  .sort();
if (demos.length === 0) {
  console.error(`check:first-frame: no demo to run${only ? ` (--only ${only.join(",")})` : ""}`);
  process.exit(1);
}
for (const demo of demos) packagedDemo("check:first-frame", demo);

const server = servePackagedDemos();
type Result = { demo: string; ms: number | null; views: number };
const results: Result[] = [];
let failed = 0;

for (const demo of demos) {
  const result = { demo, ...(await measure(demo)) };
  results.push(result);
  const timed = result.ms === null ? `over ${deadline} ms` : `${result.ms} ms`;
  const line = `${timed}\t${result.views} views\t${demo}`;
  if (result.ms === null || result.ms > budget) {
    console.error(`first frame: over budget — ${line}`);
    failed += 1;
  } else {
    console.log(`first frame: ${line}`);
  }
}

server.stop();
if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify({ budget, results }, null, 2));
if (failed > 0) {
  console.error(`first frame: ${failed} of ${demos.length} demo(s) past ${budget} ms`);
  process.exit(1);
}
console.log(`first frame: every demo is drawn within ${budget} ms (${demos.length} demos)`);

/** One demo's first painted frame: its time, or `null` if it stayed empty past the deadline. */
async function measure(demo: string): Promise<{ ms: number | null; views: number }> {
  const url = `${server.origin}/demos/${demo}/index.html?idiom=desktop&theme=light`;
  let first: Frame | undefined;
  await watchDemo({
    label: "check:first-frame",
    url,
    source: sampler(),
    deadlineMs: deadline,
    poll: async (read) => {
      const seen = await read("JSON.stringify(window.__firstFrames ?? [])");
      const frames = JSON.parse(seen || "[]") as Frame[];
      first = frames.find((frame) => frame.draws > 0 || frame.views > 0);
      return first !== undefined;
    },
  });
  return first === undefined
    ? { ms: null, views: 0 }
    : { ms: Math.round(first.t), views: first.views };
}

/**
 * The page's recorder: the views it puts on screen and the draws it makes on canvases, frame by
 * frame. The app keeps its page hidden until it has drawn it (`#app`'s visibility), so a frame
 * taken while it is hidden is not the first frame.
 */
function sampler(): string {
  return `(() => {
  const frames = [];
  Object.defineProperty(window, "__firstFrames", { value: frames });
  let views = 0;
  let draws = 0;
  const flush = () => {
    frames.push({ t: performance.now(), draws, views });
    views = 0;
    draws = 0;
  };
  // What the app draws on its canvases (icons and the like).
  const ctx = CanvasRenderingContext2D.prototype;
  for (const name of ["fillRect", "fill", "fillText", "strokeRect", "stroke", "strokeText"]) {
    const original = ctx[name];
    if (typeof original !== "function") continue;
    ctx[name] = function (...rest) {
      const page = document.getElementById("app");
      if (page && page.style.visibility === "hidden") return original.apply(this, rest);
      draws += 1;
      return original.apply(this, rest);
    };
  }
  const tick = () => {
    const page = document.getElementById("app");
    if (!(page && page.style.visibility === "hidden")) {
      const root = document.querySelector(".nsh-root");
      const counted = root ? root.querySelectorAll("[style]").length : 0;
      if (counted > views) views = counted;
    }
    flush();
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();`;
}
