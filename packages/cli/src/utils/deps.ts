import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import type { RegistryItem } from "../types";
import { declaredPackage } from "./registry";

/**
 * The packages registry items declare (`dependencies`), installed with the app's own package
 * manager. An item that imports `lucide` says so, and a copied component must find it: the files
 * are the app's after `add`, and so is the install.
 */

/** The managers `add` installs with, and the lock file that names each. */
export type PackageManager = "bun" | "pnpm" | "yarn" | "npm";

const LOCKFILES: [file: string, manager: PackageManager][] = [
  ["bun.lock", "bun"],
  ["pnpm-lock.yaml", "pnpm"],
  ["yarn.lock", "yarn"],
];

async function exists(file: string): Promise<boolean> {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

/**
 * Where a package manager runs, and which one: the nearest directory above `dir` holding a
 * `package.json` (the app's, or a monorepo's), and the manager named by the nearest lock file on
 * the way up — past that `package.json`, since a workspace member has none of its own — `npm` when
 * there is none (`bun.lock` / `pnpm-lock.yaml` / `yarn.lock`).
 */
export async function projectOf(dir: string): Promise<{ root: string; manager: PackageManager }> {
  const start = path.resolve(dir);
  let root: string | undefined;
  let manager: PackageManager | undefined;
  for (let at = start; ; at = path.dirname(at)) {
    for (const [lock, name] of LOCKFILES) {
      if (manager == null && (await exists(path.join(at, lock)))) manager = name;
    }
    if (root == null && (await exists(path.join(at, "package.json")))) root = at;
    if (manager != null || path.dirname(at) === at) {
      return { root: root ?? start, manager: manager ?? "npm" };
    }
  }
}

/** The packages `items` declare: one entry per package (`lucide@^1.66.0`), the first one said. */
export function dependenciesOf(items: RegistryItem[]): string[] {
  const packages = new Map<string, string>();
  for (const item of items) {
    for (const entry of item.dependencies ?? []) {
      const name = declaredPackage(entry);
      if (!packages.has(name)) packages.set(name, entry);
    }
  }
  return [...packages.values()];
}

/** A version's numbers (`1.66.0` → `[1, 66, 0]`), from the first one a spec writes; null for none. */
function versionOf(spec: string): [number, number, number] | null {
  const match = /(\d+)\.(\d+)\.(\d+)/.exec(spec);
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

/**
 * Whether the app's spec for a package already answers the registry's: the lowest version it
 * allows is in the registry's range (`^1.66.0` takes `1.66.0`, `^1.70.0`, `~1.68.2`, not `1.50.0`
 * or `2.0.0`). A spec with no version to read (`workspace:*`, `latest`, a git URL) is the app's
 * own choice, and is kept.
 */
export function satisfies(declared: string, wanted: string): boolean {
  const have = versionOf(declared);
  const need = versionOf(wanted);
  if (have == null || need == null) return true;
  const caret = wanted.slice(wanted.indexOf("@", 1) + 1).startsWith("^");
  const [a, b, c] = need;
  const [x, y, z] = have;
  const atLeast = x > a || (x === a && (y > b || (y === b && z >= c)));
  if (!atLeast) return false;
  if (!caret) return true;
  return a > 0 ? x === a : b > 0 ? x === 0 && y === b : x === 0 && y === 0 && z === c;
}

/**
 * The entries the app has not got: a package its `package.json` already declares (in any of its
 * dependency fields) at a version in the registry's range is left as written, so `add` never turns
 * an exact `1.66.0` into `^1.66.0`. One declared older than the range is installed at the range.
 */
export async function missingFrom(root: string, entries: string[]): Promise<string[]> {
  let manifest: Record<string, Record<string, string> | undefined> = {};
  try {
    manifest = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"));
  } catch {
    return entries;
  }
  const fields = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"];
  return entries.filter((entry) => {
    const name = declaredPackage(entry);
    const declared = fields.map((field) => manifest[field]?.[name]).find((v) => v != null);
    return declared == null || !satisfies(declared, entry);
  });
}

/** A name a `package.json` can hold, from the directory's (`My App` → `my-app`). */
function packageName(dir: string): string {
  const name = path
    .basename(dir)
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^[^a-z0-9]+/, "");
  return name === "" ? "app" : name;
}

/**
 * Writes a minimal `package.json` for an app that has none (an NSH app needs one only to hold the
 * packages its components import). Returns the path written, or null when one was there.
 */
export async function ensurePackageJson(dir: string): Promise<string | null> {
  const file = path.join(dir, "package.json");
  if (await exists(file)) return null;
  const content = { name: packageName(dir), private: true, dependencies: {} };
  await fs.writeFile(file, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  return file;
}

/** What `installDependencies` did, or would do. */
export type DependencyInstall = {
  /** The manager that ran (or would), and the directory it ran in. */
  manager: PackageManager;
  root: string;
  /** The command as the user would type it: `bun add lucide@^1.66.0`. */
  command: string;
  /** False when the manager could not start, or exited non-zero: the command is then the fix. */
  ok: boolean;
};

export type DependencyOptions = {
  /** Print the command instead of running it. */
  dryRun?: boolean;
};

/**
 * Installs the packages `items` declare, in the app's package manager, writing a `package.json`
 * first when the app has none. With `dryRun` the command is printed and nothing runs (no
 * `package.json` either). A failure names the command to run by hand, and returns `ok: false`:
 * the files are written, but the app cannot type check without the package.
 *
 * Returns null when the items declare no package, or the app already has every one in range.
 */
export async function installDependencies(
  dir: string,
  items: RegistryItem[],
  opts: DependencyOptions = {},
): Promise<DependencyInstall | null> {
  const declared = dependenciesOf(items);
  if (declared.length === 0) return null;

  const { root, manager } = await projectOf(dir);
  const dependencies = await missingFrom(root, declared);
  const kept = declared.filter((entry) => !dependencies.includes(entry)).map(declaredPackage);
  if (kept.length > 0) console.log(`keep ${kept.join(" ")} (package.json has it in range)`);
  if (dependencies.length === 0) return null;
  const command = [manager, "add", ...dependencies];
  const shown = command.join(" ");
  const install: DependencyInstall = { manager, root, command: shown, ok: true };

  if (opts.dryRun) {
    console.log(`would install ${dependencies.join(" ")} (${shown})`);
    return install;
  }

  const written = await ensurePackageJson(root);
  if (written != null) {
    console.log(`write ${path.relative(path.resolve(dir), written) || "package.json"}`);
  }

  const result = spawnSync(manager, command.slice(1), { cwd: root, stdio: "inherit" });
  const failed = result.error ?? (result.status === 0 ? null : `exited ${result.status}`);
  if (failed == null) {
    console.log(`installed ${dependencies.join(" ")} (${shown})`);
    return install;
  }

  const why = failed instanceof Error ? failed.message : failed;
  console.error(`shadcn-nsh: \`${shown}\` failed in ${root}: ${why}`);
  console.error(`      run it yourself: cd ${root} && ${shown}`);
  return { ...install, ok: false };
}
