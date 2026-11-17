/**
 * The themes the docs site shows: each palette of the demos (`demos/palettes.ts`) with the theme
 * file it draws (`packages/theme/themes/<id>/theme.json`) as the build has it. `import.meta.glob`
 * reads every theme file once, eagerly, so the themes page is drawn from the same JSON at build
 * time and in the browser — no `node:fs`, and the page prerenders like any other. `check:pages`
 * holds the registry items to the same list, so a theme is never written twice here.
 *
 * `theme.json`'s `name` is the theme's own name — the same one `AppTheme.label` carries in the
 * `index.ts` beside it. The palette's `label` is the switch's shorter name for the same theme.
 */
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

/** `packages/theme/themes/<id>/theme.json`, every one of them, as the build reads them. */
const FILES = import.meta.glob("../../../../packages/theme/themes/*/theme.json", {
  eager: true,
  import: "default",
}) as Record<string, ThemeFile>;

/** The theme file of a palette: `themes/<id>/theme.json` below `packages/theme`. */
function themeFile(id: string): ThemeFile {
  const file = FILES[`../../../../packages/theme/themes/${id}/theme.json`];
  if (!file) throw new Error(`no theme file for palette "${id}"`);
  return file;
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

/**
 * The site's own colours (`--color-fd-<name>`, Fumadocs' names) and the theme role each one is
 * drawn from: the docs chrome is drawn in the palette the demos are. Mostly the role of the same
 * name; Fumadocs' primary is ink too (the current page's link, the outline's marker), so it is the
 * theme's `brand`, the accent that reads as text — the theme's `primary` is a fill (the default
 * theme's is a pale citrus no text could be on a light page) — and what sits on it is the page's
 * background.
 */
const SITE_ROLES: [site: string, role: string][] = [
  ["background", "background"],
  ["foreground", "foreground"],
  ["muted", "muted"],
  ["muted-foreground", "muted-foreground"],
  ["popover", "popover"],
  ["popover-foreground", "popover-foreground"],
  ["card", "card"],
  ["card-foreground", "card-foreground"],
  ["border", "border"],
  ["primary", "brand"],
  ["primary-foreground", "background"],
  ["secondary", "secondary"],
  ["secondary-foreground", "secondary-foreground"],
  ["accent", "accent"],
  ["accent-foreground", "accent-foreground"],
  ["ring", "ring"],
];

/**
 * The stylesheet that draws the site in each palette: `html[data-palette="<id>"]` sets the
 * Fumadocs colours from the theme's light roles, `.dark` from its dark ones. The sidebar is named
 * too, since Fumadocs' preset sets a few of its colours there again. `palette.ts` sets the
 * attribute: an inline script before the first paint, then every choice.
 */
export function sitePaletteCss(): string {
  return PALETTES.map((palette) => {
    const file = themeFile(palette.id);
    const block = (scheme: "light" | "dark", selector: string) => {
      const vars = { ...file.cssVars.theme, ...file.cssVars[scheme] };
      const lines = SITE_ROLES.filter(([, role]) => vars[role]).map(
        ([site, role]) => `--color-fd-${site}:${filled(vars[role]!, vars)};`,
      );
      return `${selector},${selector} #nd-sidebar{${lines.join("")}}`;
    };
    const at = `html[data-palette="${palette.id}"]`;
    return block("light", at) + block("dark", `${at}.dark`);
  }).join("\n");
}
