import fs from "node:fs/promises";
import path from "node:path";

import { Command } from "commander";

import {
  DEFAULT_CONFIG,
  DEFAULT_THEME,
  themeItem,
  type NshUiConfig,
  type RegistryItem,
} from "../types";
import { findNshJson, readJson, writeConfig, writeJson } from "../utils/config";
import { installDependencies } from "../utils/deps";
import { installItems } from "../utils/install";
import { resolveTree } from "../utils/registry";
import { resolveWorkspace, themePathForApp } from "../utils/workspace";

/** `theme.json` and `finishes.json`: the two data files a theme is. */
const THEME_DATA = new Set(["theme.json", "finishes.json"]);

/** A theme item's look without its data: the roles module (`lib/theme.ts`), which every app has once. */
function rolesOnly(item: RegistryItem): RegistryItem {
  return {
    ...item,
    files: item.files.filter((file) => !THEME_DATA.has(path.posix.basename(file.path))),
  };
}

/** A theme item's data at the app's build-time paths: `theme.json`, and `finishes.json` in the lib alias. */
function atBuildTime(item: RegistryItem, config: NshUiConfig): RegistryItem {
  const lib = config.aliases.lib.replace(/^\.\//, "");
  return {
    ...item,
    files: item.files.flatMap((file) => {
      const name = path.posix.basename(file.path);
      if (name === "theme.json") return [{ ...file, target: "theme.json" }];
      if (name === "finishes.json") return [{ ...file, target: path.posix.join(lib, name) }];
      return [];
    }),
  };
}

/**
 * What `init` installs for its theme: the app's build-time theme (the default theme item's three
 * files) or, for another theme, the roles module (`lib/theme.ts`, from the default theme item), that
 * theme in `themes/<name>/` for `selectTheme` to switch to, and its data at the build-time paths
 * `nsh.json` points at. `--overwrite` is what replaces colors the app has already changed.
 */
async function themeItems(config: NshUiConfig, registry?: string): Promise<RegistryItem[]> {
  const chosen = await resolveTree(config, [config.theme], registry);
  if (config.theme === DEFAULT_THEME) return chosen;

  const theme = chosen.at(-1);
  if (theme == null) throw new Error(`The registry has no item ${config.theme}.`);
  const base = await resolveTree(config, [DEFAULT_THEME], registry);
  return [...base.map(rolesOnly), ...chosen, atBuildTime(theme, config)];
}

export async function runInit(opts: {
  cwd: string;
  overwrite?: boolean;
  registry?: string;
  /** The theme to install: `default` (the library's own) or `shadcn`; an unknown name throws. */
  theme?: string;
}): Promise<NshUiConfig> {
  const cwd = path.resolve(opts.cwd);
  const ws = await resolveWorkspace(cwd);

  if (ws.kind === "app") {
    const nshJsonPath = await findNshJson(cwd);
    if (!nshJsonPath) {
      throw new Error(
        `No nsh.json in ${cwd}. Create an NSH app first (nsh init), then run shadcn-nsh init.`,
      );
    }
  } else if (ws.apps.length === 0) {
    throw new Error(
      `Monorepo at ${ws.root} has packages/ui but no apps/*/nsh.json. Add an NSH app under apps/.`,
    );
  }

  const config: NshUiConfig = DEFAULT_CONFIG();
  if (opts.registry) config.registry = opts.registry;
  // Before anything is written: an unknown theme is the command's error, not a half-made app.
  config.theme = themeItem(opts.theme ?? "default");

  await writeConfig(ws.uiRoot, config);
  console.log(`write ${path.relative(cwd, path.join(ws.uiRoot, "nsh-ui.json")) || "nsh-ui.json"}`);

  const items = await themeItems(config, opts.registry);
  await installItems(ws.uiRoot, config, items, { overwrite: opts.overwrite });
  await installDependencies(ws.uiRoot, items);

  for (const appDir of ws.apps) {
    const nshJsonPath = await findNshJson(appDir);
    if (!nshJsonPath) continue;
    const nsh = await readJson<Record<string, unknown>>(nshJsonPath);
    nsh.theme = ws.kind === "monorepo" ? themePathForApp(appDir, ws.uiRoot) : "./theme.json";
    await writeJson(nshJsonPath, nsh);
    console.log(
      `update ${path.relative(cwd, nshJsonPath) || "nsh.json"} theme → ${String(nsh.theme)}`,
    );
  }

  if (ws.kind === "app") {
    const tsconfig = path.join(cwd, "tsconfig.json");
    try {
      await fs.access(tsconfig);
    } catch {
      await writeJson(tsconfig, {
        extends: "./.nsh/tsconfig.json",
        include: ["**/*.ts", "**/*.tsx"],
      });
      console.log("write tsconfig.json");
    }
  }

  return config;
}

export const init = new Command()
  .name("init")
  .description("Initialize shadcn-nsh (writes nsh-ui.json + theme; monorepo → packages/ui)")
  .option("-c, --cwd <cwd>", "app or monorepo directory", process.cwd())
  .option("-y, --yes", "skip confirmation", false)
  .option("--overwrite", "overwrite existing files", false)
  .option("--theme <name>", "theme to install: default (the library's own) or shadcn", "default")
  .option("--registry <url>", "registry URL template containing {name}")
  .action(
    async (opts: {
      cwd: string;
      yes: boolean;
      overwrite: boolean;
      theme: string;
      registry?: string;
    }) => {
      await runInit(opts);
      console.log("\nDone. Next: shadcn-nsh add button");
    },
  );
