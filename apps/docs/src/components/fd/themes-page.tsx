"use client";

import { choosePalette } from "@/lib/palette";
import { themePages } from "@/lib/themes";

/**
 * `/docs/themes`: one section per palette the demos can be drawn in — its theme's own name, the
 * switch's name for it, the registry item that installs it, and every role its `theme.json` sets
 * in light and dark. Nothing here names a theme of its own: the list is `demos/palettes.ts` and
 * the roles are each theme's `theme.json` (`src/lib/themes.ts` reads both). `check:pages` holds the
 * registry items to the same list.
 *
 * `content/docs/themes.mdx` keeps the prose above the sections and asks for them with
 * `<ThemesPage />`. A section's headings are drawn here rather than written in the markdown, so
 * they carry anchors (`#theme-<id>`, `#install-<id>`, `#roles-<id>`) but not entries in the page's
 * table of contents, which is built from the markdown.
 */
import { PALETTES } from "../../../demos/palettes";

const themes = themePages();

/** The role table's swatch: the value over the card's own colour, framed like the code beside it. */
function Swatch({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      className="border-fd-border bg-fd-card mr-2 inline-block size-5 shrink-0 overflow-hidden rounded-md border align-middle"
    >
      <span className="block size-full" style={{ backgroundColor: color }} />
    </span>
  );
}

/** The one control the page adds: draw the showcase in this theme (`demos/themes.tsx`). */
function ShowInPreview({ id }: { id: string }) {
  return (
    <button
      type="button"
      className="border-fd-border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground rounded-md border px-2.5 py-1 text-sm font-medium"
      onClick={() => {
        choosePalette(id as (typeof PALETTES)[number]["id"]);
        document.getElementById("preview")?.scrollIntoView({ block: "start" });
      }}
    >
      Show it in the preview
    </button>
  );
}

export function ThemesPage() {
  return (
    <>
      {themes.map((theme) => (
        <section key={theme.palette.id} data-theme={theme.palette.id}>
          <h2 id={`theme-${theme.palette.id}`}>{theme.name}</h2>
          <p>{theme.palette.description}</p>
          <p>
            The switch calls it <strong>{theme.palette.label}</strong>; the registry item is{" "}
            <code>{theme.item}</code>. <ShowInPreview id={theme.palette.id} />
          </p>

          <h3 id={`install-${theme.palette.id}`}>Installation</h3>
          <pre>
            <code>npx shadcn-nsh@latest add {theme.item}</code>
          </pre>
          <p>
            <code>add {theme.item}</code> installs <code>themes/{theme.palette.id}/</code> beside
            the app&apos;s build-time theme and leaves that one as it is; the app lists the theme
            and calls <code>selectTheme</code> to switch to it. To build the app on this theme
            instead, run <code>init --theme {theme.palette.id}</code> (or{" "}
            <code>init --theme {theme.palette.id} --overwrite</code> on an app that already has one
            theme).
            {theme.palette.id === "default" ? (
              <>
                {" "}
                The build-time theme is the <code>theme</code> item that <code>init</code> writes
                without a flag; this item is the same data, for an app built on another theme to
                switch back to.
              </>
            ) : null}
          </p>

          <h3 id={`roles-${theme.palette.id}`}>Roles</h3>
          <p>
            Every role the theme sets, in <code>theme.json</code>&apos;s order, for light and dark:
            the swatch draws the value and the text is what the file writes. A <code>var(--x)</code>{" "}
            or a <code>color-mix()</code> is the theme&apos;s own reference; the swatch fills it in
            from the same appearance, the text leaves it as written.
          </p>
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Light</th>
                <th>Dark</th>
              </tr>
            </thead>
            <tbody>
              {theme.roles.map((role) => (
                <tr key={role.role}>
                  <td>
                    <code>{role.role}</code>
                  </td>
                  <td>
                    <Swatch color={role.lightSwatch} />
                    <code className="break-all">{role.light}</code>
                  </td>
                  <td>
                    <Swatch color={role.darkSwatch} />
                    <code className="break-all">{role.dark}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </>
  );
}
