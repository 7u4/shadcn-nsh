/**
 * The themes the docs site shows: each palette of the demos (`demos/palettes.ts`) with the theme
 * file it draws (`packages/theme/themes/<id>/theme.json`) read at build time. The themes page is
 * generated from this, and `check:pages` holds the registry items to the same list, so a theme is
 * never written twice here.
 *
 * `theme.json`'s `name` is the theme's own name — the same one `AppTheme.label` carries in the
 * `index.ts` beside it. The palette's `label` is the switch's shorter name for the same theme.
 */
import fs from "node:fs";
import path from "node:path";

import { PALETTES, type Palette } from "../../demos/palettes";

/** A theme file in shadcn's `cssVars` shape, as `theme.json` writes it. */
export type ThemeFile = {
  name: string;
  cssVars: {
    theme: Record<string, string>;
    light: Record<string, string>;
    dark: Record<string, string>;
  };
};

/** One cssVars role, in both appearances: the value the theme writes and the one a swatch draws. */
export type ThemeRole = {
  role: string;
  light: string;
  dark: string;
  lightSwatch: string;
  darkSwatch: string;
};

/** One palette as the themes page shows it. */
export type ThemePage = {
  palette: Palette;
  /** The theme's own name (`theme.json`'s `name`; `AppTheme.label` in its `index.ts`). */
  name: string;
  /** The registry item that installs it beside the build-time theme (`add <item>`). */
  item: string;
  /** One row per role, in `theme.json`'s order. */
  roles: ThemeRole[];
};

/** `packages/theme/themes`, from the docs site's working directory (as `demo.js` reads `demos/`). */
const THEMES_ROOT = path.join(process.cwd(), "..", "..", "packages", "theme", "themes");

function themeFile(id: string): ThemeFile {
  const file = path.join(THEMES_ROOT, id, "theme.json");
  return JSON.parse(fs.readFileSync(file, "utf8")) as ThemeFile;
}

/**
 * A value with the theme's own references filled in (`var(--card)`), so a swatch can draw it: the
 * appearance's map first, then the `theme` block (a radius-free role may live there). Values the
 * theme does not define are left as written.
 */
function filled(value: string, vars: Record<string, string>): string {
  let out = value;
  for (let depth = 0; depth < 4; depth += 1) {
    const next = out.replace(
      /var\(--([\w-]+)\)/g,
      (whole: string, name: string) => vars[name] ?? whole,
    );
    if (next === out) break;
    out = next;
  }
  return out;
}

/** The roles of a theme file, light and dark, in the order the file lists them. */
function rolesOf(file: ThemeFile): ThemeRole[] {
  const lightVars = { ...file.cssVars.theme, ...file.cssVars.light };
  const darkVars = { ...file.cssVars.theme, ...file.cssVars.dark };
  const names = new Set([...Object.keys(file.cssVars.light), ...Object.keys(file.cssVars.dark)]);
  return [...names].map((role) => {
    const light = file.cssVars.light[role] ?? "";
    const dark = file.cssVars.dark[role] ?? "";
    return {
      role,
      light,
      dark,
      lightSwatch: filled(light, lightVars),
      darkSwatch: filled(dark, darkVars),
    };
  });
}

/** Every palette the demos offer, with its theme file read. */
export function themePages(): ThemePage[] {
  return PALETTES.map((palette) => {
    const file = themeFile(palette.id);
    return {
      palette,
      name: file.name,
      item: `theme-${palette.id}`,
      roles: rolesOf(file),
    };
  });
}
