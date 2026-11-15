import { afterEach, describe, expect, test } from "bun:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { captured } from "../testing/fixture";
import type { RegistryItem } from "../types";
import {
  dependenciesOf,
  ensurePackageJson,
  installDependencies,
  missingFrom,
  projectOf,
  satisfies,
} from "./deps";

const roots: string[] = [];

/** A directory tree: each path is a file (its parent directories are made), empty means a dir. */
function tree(files: Record<string, string>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "shadcn-nsh-deps-"));
  roots.push(root);
  for (const [relative, content] of Object.entries(files)) {
    const file = path.join(root, relative);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
  return root;
}

afterEach(() => {
  for (const root of roots.splice(0)) fs.rmSync(root, { recursive: true, force: true });
});

const item = (name: string, dependencies?: string[]): RegistryItem => ({
  name,
  type: "registry:ui",
  files: [],
  ...(dependencies === undefined ? {} : { dependencies }),
});

describe("projectOf", () => {
  test("reads the manager off the lock file", async () => {
    for (const [lock, manager] of [
      ["bun.lock", "bun"],
      ["pnpm-lock.yaml", "pnpm"],
      ["yarn.lock", "yarn"],
    ] as const) {
      const root = tree({ [`app/${lock}`]: "", "app/package.json": "{}" });
      expect(await projectOf(path.join(root, "app"))).toEqual({
        root: path.join(root, "app"),
        manager,
      });
    }
  });

  test("installs with npm when the app has no lock file", async () => {
    const root = tree({ "package.json": "{}" });
    expect((await projectOf(root)).manager).toBe("npm");
  });

  test("runs where the nearest package.json is, with the manager the whole tree names", async () => {
    const root = tree({ "bun.lock": "", "package.json": "{}", "packages/ui/keep": "" });
    expect(await projectOf(path.join(root, "packages/ui"))).toEqual({
      root,
      manager: "bun",
    });
  });

  test("a workspace member installs with the manager its workspace's lock file names", async () => {
    const root = tree({ "bun.lock": "", "package.json": "{}", "apps/client/package.json": "{}" });
    expect(await projectOf(path.join(root, "apps/client"))).toEqual({
      root: path.join(root, "apps/client"),
      manager: "bun",
    });
  });

  test("an app with no package.json at all is its own root", async () => {
    const root = tree({ "app/nsh.json": "{}" });
    expect(await projectOf(path.join(root, "app"))).toEqual({
      root: path.join(root, "app"),
      manager: "npm",
    });
  });
});

describe("dependenciesOf", () => {
  test("collects each package once, as the first item said it", () => {
    expect(
      dependenciesOf([item("a", ["lucide@^1.66.0"]), item("b"), item("c", ["lucide@^1.60.0"])]),
    ).toEqual(["lucide@^1.66.0"]);
  });

  test("is empty when no item declares one", () => {
    expect(dependenciesOf([item("a"), item("b")])).toEqual([]);
  });
});

describe("ensurePackageJson", () => {
  test("writes a minimal one for an app that has none", async () => {
    const root = tree({ "My App/nsh.json": "{}" });
    const app = path.join(root, "My App");

    expect(await ensurePackageJson(app)).toBe(path.join(app, "package.json"));
    expect(JSON.parse(fs.readFileSync(path.join(app, "package.json"), "utf8"))).toEqual({
      name: "my-app",
      private: true,
      dependencies: {},
    });
  });

  test("leaves the app's own package.json alone", async () => {
    const root = tree({ "package.json": '{"name":"mine"}\n' });
    expect(await ensurePackageJson(root)).toBeNull();
    expect(fs.readFileSync(path.join(root, "package.json"), "utf8")).toBe('{"name":"mine"}\n');
  });
});

describe("installDependencies", () => {
  test("--dry-run prints the command and writes nothing", async () => {
    const root = tree({ "app/bun.lock": "" });
    const app = path.join(root, "app");

    const out = await captured(() =>
      installDependencies(app, [item("tabs", ["lucide@^1.66.0"])], { dryRun: true }),
    );

    expect(out.lines).toEqual(["would install lucide@^1.66.0 (bun add lucide@^1.66.0)"]);
    expect(out.result).toEqual({
      manager: "bun",
      root: app,
      command: "bun add lucide@^1.66.0",
      ok: true,
    });
    expect(fs.existsSync(path.join(app, "package.json"))).toBe(false);
  });

  test("nothing to install when no item declares a package", async () => {
    const root = tree({ "package.json": "{}" });
    expect(await installDependencies(root, [item("tabs")], { dryRun: true })).toBeNull();
  });

  test("an app that pins the package in range keeps its pin: nothing runs", async () => {
    const root = tree({ "bun.lock": "", "package.json": '{"dependencies":{"lucide":"1.66.0"}}' });
    const out = await captured(() =>
      installDependencies(root, [item("tabs", ["lucide@^1.66.0"])], { dryRun: true }),
    );
    expect(out.result).toBeNull();
    expect(out.lines).toEqual(["keep lucide (package.json has it in range)"]);
  });
});

describe("satisfies", () => {
  test("a caret range takes its own version and later ones of the same major", () => {
    for (const ok of [
      "1.66.0",
      "^1.66.0",
      "~1.68.2",
      "1.70.1",
      ">=1.66.0",
      "workspace:*",
      "latest",
    ]) {
      expect(satisfies(ok, "lucide@^1.66.0")).toBe(true);
    }
    for (const no of ["1.50.0", "^1.65.9", "2.0.0", "0.9.0"]) {
      expect(satisfies(no, "lucide@^1.66.0")).toBe(false);
    }
  });

  test("a caret on 0.x holds its minor", () => {
    expect(satisfies("0.4.2", "x@^0.4.0")).toBe(true);
    expect(satisfies("0.5.0", "x@^0.4.0")).toBe(false);
  });
});

describe("missingFrom", () => {
  test("drops what package.json declares in range, in any dependency field", async () => {
    const root = tree({
      "package.json": JSON.stringify({
        dependencies: { lucide: "1.66.0" },
        devDependencies: { old: "1.0.0" },
      }),
    });
    expect(await missingFrom(root, ["lucide@^1.66.0", "old@^2.0.0", "new@^1.0.0"])).toEqual([
      "old@^2.0.0",
      "new@^1.0.0",
    ]);
  });
});
