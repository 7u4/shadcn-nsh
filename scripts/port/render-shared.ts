/**
 * What the two picture checks share (`render.ts`, `render-theme.ts`): which ids `--only` names,
 * the browser the pages are drawn in, and the comparison of every component with its reference
 * page.
 *
 * Both are scripts, not a library: `scripts/port` is the tooling around the components, and only
 * it reads `apps/docs/demos`.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { antialiasing, cases, schemes } from "../../apps/docs/demos/render-cases";
import { catalog } from "../catalog";
import { compareWithinTolerance } from "./pixels";

/** The ids `--only` names, validated: the test narrows its table by `RENDER_ONLY`. */
export function onlyIds(): string[] | undefined {
  const at = process.argv.indexOf("--only");
  if (at < 0) return undefined;
  const value = process.argv[at + 1];
  if (!value) {
    console.error("render: --only takes a comma-separated list of ids (`--only select,combobox`)");
    process.exit(1);
  }
  const ids = value
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  if (ids.length === 0) {
    console.error("render: --only names no id");
    process.exit(1);
  }
  const unknown = ids.filter((id) => !catalog().components.some((c) => c.id === id));
  if (unknown.length > 0) {
    console.error(`render: no component is called ${unknown.join(", ")}`);
    process.exit(1);
  }
  return ids;
}

/** Where Chrome, Edge or Chromium installs, in `nsh`'s own order and paths (cut down). */
function browser(): string | undefined {
  const named = process.env.NSH_BROWSER ?? process.env.CHROME_PATH;
  if (named) return fs.existsSync(named) ? named : undefined;
  if (process.platform === "darwin") {
    const apps = [
      "Google Chrome.app/Contents/MacOS/Google Chrome",
      "Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
      "Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
      "Chromium.app/Contents/MacOS/Chromium",
    ];
    for (const app of apps) {
      for (const root of ["/Applications", path.join(os.homedir(), "Applications")]) {
        const exe = path.join(root, app);
        if (fs.existsSync(exe)) return exe;
      }
    }
    return undefined;
  }
  if (process.platform === "win32") {
    const apps = [
      "Google\\Chrome\\Application\\chrome.exe",
      "Microsoft\\Edge\\Application\\msedge.exe",
      "Chromium\\Application\\chrome.exe",
    ];
    for (const app of apps) {
      for (const root of ["ProgramFiles", "ProgramFiles(x86)", "LOCALAPPDATA"]) {
        const exe = path.join(process.env[root] ?? "", app);
        if (exe && fs.existsSync(exe)) return exe;
      }
    }
    return undefined;
  }
  for (const name of ["google-chrome", "google-chrome-stable", "microsoft-edge", "chromium"]) {
    for (const dir of (process.env.PATH ?? "").split(path.delimiter)) {
      const exe = path.join(dir, name);
      if (exe && fs.existsSync(exe)) return exe;
    }
  }
  return undefined;
}

/**
 * `exe` with the flags the comparison needs, as a script `--browser` can name. The GPU is left
 * alone: on it Chrome draws the antialiased corner of a rounded edge (a `Status` dot's) a level
 * off (1/255) now and then, so a page differs from itself (`status: pointer, dark`, about one
 * run in six); drawn on the CPU the two pictures match every time. And the user asks for less
 * motion: the test pages pass `reducedMotion`, which the web target does not emulate (only a
 * headless engine does), so the runtime's `.nsh-reduce` would never switch off transitions and
 * endless animations — a spinner would turn with the wall clock, a few degrees apart between
 * two runs. Windows spawns no script: there the check runs as it did, with `nsh`'s own browser
 * and flags.
 */
function browserWithFlags(exe: string): string | undefined {
  if (process.platform === "win32") return undefined;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "nsh-render-"));
  const script = path.join(dir, "browser");
  const quoted = `'${exe.replaceAll("'", `'\\''`)}'`;
  fs.writeFileSync(
    script,
    `#!/bin/sh\nexec ${quoted} --disable-gpu --force-prefers-reduced-motion "$@"\n`,
    {
      mode: 0o755,
    },
  );
  return script;
}

/**
 * The `--browser` script a run passes `nsh test`, or nothing when the caller named a browser
 * itself (`--browser`) or this host has none: then the check runs as `nsh` would run it.
 */
export function softwareBrowser(): { script?: string; done: () => void } {
  const given = process.argv.includes("--browser");
  const exe = given ? undefined : browser();
  const script = exe ? browserWithFlags(exe) : undefined;
  if (!given && !script) {
    console.log(
      "render: no browser found to run without the GPU or with reduced motion; a rounded corner may differ by 1/255 and endless animations move between runs",
    );
  }
  return {
    script,
    done: () => {
      if (script) fs.rmSync(path.dirname(script), { recursive: true, force: true });
    },
  };
}

/** What one picture check compares, and where its pictures are. */
export type PairCheck = {
  /** The check's own name in a message: `render`, `theme`. */
  pass: string;
  /** The directory the pictures are in. */
  shots: string;
  /** A picture's name for an id and an appearance, without `.png`. */
  name: (id: string, scheme: string) => string;
  /** The ids `--only` ran alone: the other pages' pictures are not there to compare. */
  only?: string[];
};

/** Every pair, compared: byte for byte, or within the page's tolerance (`pixels.ts`). */
export function comparePairs(check: PairCheck): number {
  let failed = 0;
  for (const { id, tolerance, selfReference } of cases) {
    if (check.only && !check.only.includes(id)) continue;
    // A self-reference has no second page: its picture is the only one.
    if (selfReference) continue;
    const allowed = tolerance ?? antialiasing;
    for (const scheme of schemes) {
      const name = check.name(id, scheme);
      const ours = path.join(check.shots, `${name}.png`);
      const theirs = path.join(check.shots, `${name}.ref.png`);
      if (!fs.existsSync(ours) || !fs.existsSync(theirs)) {
        console.error(`${check.pass}: ${name}: no screenshots to compare`);
        failed += 1;
        continue;
      }
      const a = fs.readFileSync(ours);
      const b = fs.readFileSync(theirs);
      if (a.equals(b)) continue;
      const { ok, report } = compareWithinTolerance(a, b, allowed);
      if (ok) console.log(`${check.pass}: ${name}: within the antialiasing budget — ${report}`);
      else {
        const why = tolerance ? ` (${tolerance.why})` : "";
        console.error(`${check.pass}: ${name}: outside the budget — ${report}${why}`);
        failed += 1;
      }
    }
  }
  return failed;
}
