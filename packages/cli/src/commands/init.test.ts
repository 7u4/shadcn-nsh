import { afterEach, describe, expect, test } from "bun:test";
import fs from "node:fs";
import path from "node:path";

import { captured, makeFixture, type Fixture } from "../testing/fixture";
import { runAdd } from "./add";
import { runInit } from "./init";

const repo = path.resolve(import.meta.dir, "../../../..");
const source = (relative: string) => fs.readFileSync(path.join(repo, relative), "utf8");
const defaultTheme = source("packages/theme/theme.json");
const defaultFinishes = source("packages/theme/finishes.json");
const neutralTheme = source("packages/theme/themes/shadcn/theme.json");
const neutralFinishes = source("packages/theme/themes/shadcn/finishes.json");

const fixture = (): Fixture =>
  makeFixture({ items: ["theme", "theme-shadcn", "press", "spinner", "button", "label-of"] });

let current: Fixture | null = null;

afterEach(() => {
  current?.remove();
  current = null;
});

/** `nsh-ui.json` the way an app made before themes were recorded has it: no `theme`. */
function writeOldConfig(app: Fixture) {
  app.write("nsh-ui.json", `${JSON.stringify({ registry: app.url }, null, 2)}\n`);
}

const recordedTheme = (app: Fixture) =>
  (JSON.parse(app.read("nsh-ui.json")) as { theme?: string }).theme;

describe("init --theme", () => {
  test("installs the theme's own files, and records which one", async () => {
    current = fixture();
    const out = await captured(() =>
      runInit({ cwd: current!.app, registry: current!.url, theme: "shadcn" }),
    );

    expect(out.lines).toContain("write theme.json");
    expect(current.read("theme.json")).toBe(neutralTheme);
    expect(current.read("lib/finishes.json")).toBe(neutralFinishes);
    // The same data as a theme the app lists, for `selectTheme` to come back to.
    expect(current.read("themes/shadcn/theme.json")).toBe(neutralTheme);
    expect(current.read("themes/shadcn/finishes.json")).toBe(neutralFinishes);
    expect(current.read("themes/shadcn/index.ts")).toContain('from "../../lib/theme"');
    // The roles module comes with it: a theme item does not ship one of its own.
    expect(current.exists("lib/theme.ts")).toBe(true);
    expect(recordedTheme(current)).toBe("theme-shadcn");
    // The app still points its runtime at `theme.json`, whatever theme that is.
    expect((JSON.parse(current.read("nsh.json")) as { theme?: string }).theme).toBe("./theme.json");
  });

  test("--overwrite replaces colors the app has changed, and nothing else", async () => {
    current = fixture();
    await captured(() => runInit({ cwd: current!.app, registry: current!.url }));
    const own = defaultTheme.replace(/oklch\([^)]*\)/, "oklch(0.5 0.2 30)");
    current.write("theme.json", own);

    const kept = await captured(() =>
      runInit({ cwd: current!.app, registry: current!.url, theme: "shadcn" }),
    );
    expect(kept.lines).toContain("kept theme.json (the app's colors stay)");
    expect(current.read("theme.json")).toBe(own);

    const replaced = await captured(() =>
      runInit({ cwd: current!.app, registry: current!.url, theme: "shadcn", overwrite: true }),
    );
    expect(replaced.lines.some((line) => line.startsWith("overwrite theme.json"))).toBe(true);
    expect(current.read("theme.json")).toBe(neutralTheme);
    expect(current.read("lib/finishes.json")).toBe(neutralFinishes);
    expect(recordedTheme(current)).toBe("theme-shadcn");
  });

  test("defaults to the library's own theme, and records that", async () => {
    current = fixture();
    await captured(() => runInit({ cwd: current!.app, registry: current!.url }));

    expect(current.read("theme.json")).toBe(defaultTheme);
    expect(recordedTheme(current)).toBe("theme");
  });

  test("an unknown theme is an error naming the ones there are, and writes nothing", async () => {
    current = fixture();
    let error: unknown;
    try {
      await runInit({ cwd: current.app, registry: current.url, theme: "solarized" });
    } catch (caught) {
      error = caught;
    }

    expect(String(error)).toContain('Unknown theme "solarized". Choose one of: default, shadcn.');
    expect(current.exists("nsh-ui.json")).toBe(false);
    expect(current.exists("theme.json")).toBe(false);
  });
});

describe("the app's theme", () => {
  /** An app that installed the neutral theme, and a component in it. */
  async function neutral(): Promise<Fixture> {
    const app = fixture();
    await captured(() => runInit({ cwd: app.app, registry: app.url, theme: "shadcn" }));
    await captured(() => runAdd(["button"], { cwd: app.app, registry: app.url }));
    return app;
  }

  test("an nsh-ui.json without the field is the default theme, and stays as it is", async () => {
    current = fixture();
    writeOldConfig(current);

    const out = await captured(() => runAdd(["button"], { cwd: current!.app }));

    expect(out.result).toBe(0);
    expect(current.read("theme.json")).toBe(defaultTheme);
    expect(current.exists("components/ui/button.tsx")).toBe(true);
    // Nothing rewrites the file the app already had, so an older app gains no field.
    expect(recordedTheme(current)).toBeUndefined();
  });

  test("add --overwrite keeps the theme the app installed", async () => {
    current = await neutral();
    const before = current.read("theme.json");

    const out = await captured(() =>
      runAdd(["button"], { cwd: current!.app, registry: current!.url, overwrite: true }),
    );

    expect(out.result).toBe(0);
    expect(current.read("theme.json")).toBe(before);
    expect(current.read("theme.json")).toBe(neutralTheme);
    expect(current.read("lib/finishes.json")).toBe(neutralFinishes);
    expect(recordedTheme(current)).toBe("theme-shadcn");
    // The `theme` dependency resolved to the item `nsh-ui.json` names, not the default one.
    expect(out.lines).toContain("skip themes/shadcn/theme.json (identical)");
  });

  test("add --all --overwrite keeps it too", async () => {
    current = await neutral();

    await captured(() =>
      runAdd([], { cwd: current!.app, registry: current!.url, all: true, overwrite: true }),
    );

    expect(current.read("theme.json")).toBe(neutralTheme);
    expect(current.read("lib/finishes.json")).toBe(neutralFinishes);
    expect(recordedTheme(current)).toBe("theme-shadcn");
  });

  test("add theme is a plain add: switching the build-time theme is init --theme", async () => {
    current = await neutral();

    await captured(() => runAdd(["theme"], { cwd: current!.app, registry: current!.url }));

    expect(current.read("theme.json")).toBe(neutralTheme);
    expect(recordedTheme(current)).toBe("theme-shadcn");

    await captured(() =>
      runInit({ cwd: current!.app, registry: current!.url, theme: "default", overwrite: true }),
    );

    expect(current.read("theme.json")).toBe(defaultTheme);
    expect(current.read("lib/finishes.json")).toBe(defaultFinishes);
    expect(recordedTheme(current)).toBe("theme");
  });

  test("add theme-shadcn installs one more theme, and leaves the build-time one alone", async () => {
    current = fixture();
    await captured(() => runInit({ cwd: current!.app, registry: current!.url }));

    const out = await captured(() =>
      runAdd(["theme-shadcn"], { cwd: current!.app, registry: current!.url }),
    );

    expect(out.lines).toContain("write themes/shadcn/index.ts");
    expect(current.read("themes/shadcn/theme.json")).toBe(neutralTheme);
    expect(current.read("themes/shadcn/finishes.json")).toBe(neutralFinishes);
    // The roles module it imports is the app's, two directories up from `themes/shadcn/`.
    expect(current.read("themes/shadcn/index.ts")).toContain('from "../../lib/theme"');
    expect(current.read("theme.json")).toBe(defaultTheme);
    expect(current.read("lib/finishes.json")).toBe(defaultFinishes);
    expect(recordedTheme(current)).toBe("theme");

    // Taking it again changes nothing: it is one more theme, not the app's.
    const again = await captured(() =>
      runAdd(["theme-shadcn"], { cwd: current!.app, registry: current!.url }),
    );
    expect(again.lines).toContain("skip themes/shadcn/theme.json (identical)");
  });

  test("add theme in a default app keeps the app's own colors", async () => {
    current = fixture();
    await captured(() => runInit({ cwd: current!.app, registry: current!.url }));
    const own = defaultTheme.replace(/oklch\([^)]*\)/, "oklch(0.5 0.2 30)");
    current.write("theme.json", own);

    await captured(() => runAdd(["theme"], { cwd: current!.app, registry: current!.url }));

    expect(current.read("theme.json")).toBe(own);
    expect(recordedTheme(current)).toBe("theme");
  });

  test("a dry run writes nothing and records nothing", async () => {
    current = fixture();
    await captured(() => runInit({ cwd: current!.app, registry: current!.url }));

    const out = await captured(() =>
      runAdd(["theme-shadcn"], { cwd: current!.app, registry: current!.url, dryRun: true }),
    );

    expect(out.lines).toContain("would write themes/shadcn/theme.json");
    expect(current.exists("themes/shadcn/theme.json")).toBe(false);
    expect(current.read("theme.json")).toBe(defaultTheme);
    expect(recordedTheme(current)).toBe("theme");
  });
});
