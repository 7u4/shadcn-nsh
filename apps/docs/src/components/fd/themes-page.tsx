"use client";

import { choosePalette } from "@/lib/palette";
import { REPO_URL } from "@/lib/site";
import { finishSampleCss, themePages } from "@/lib/themes";

/**
 * `/docs/themes`: one section per palette the demos can be drawn in — its theme's own name, the
 * switch's name for it, the registry item that installs it, every token its `theme.json` sets in
 * light and dark (in the spec's three layers), and every finish its `finishes.json` draws, with a
 * sample. Nothing here names a theme of its own: the list is `demos/palettes.ts`, the values are
 * each theme's two JSON files, and what a token's layer and a finish's duty are is
 * `docs/specs/theme-roles.md` — `src/lib/themes.ts` reads all three. `check:pages` holds the
 * registry items to the same list.
 *
 * `content/docs/themes.mdx` keeps the prose above the sections and asks for them with
 * `<ThemesPage />`. A section's headings are drawn here rather than written in the markdown, so
 * they carry anchors (`#theme-<id>`, `#install-<id>`, `#tokens-<id>`, `#finishes-<id>`) but not
 * entries in the page's table of contents, which is built from the markdown.
 */
import { PALETTES } from "../../../demos/palettes";

const themes = themePages();
const samples = finishSampleCss();

/** The spec on GitHub: the page's lists are its, so the reader can read the reasons behind them. */
const SPEC_URL = `${REPO_URL}/blob/main/docs/specs/theme-roles.md`;

/** A swatch: the value over the card's own colour, framed like the code beside it. */
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

/** A cell the spec writes in code spans (`\`button\`、\`dialog\``): the names as code, the rest as text. */
function Reads({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(`[^`]+`)/g)
        .map((part, index) =>
          part.startsWith("`") && part.endsWith("`") ? (
            <code key={index}>{part.slice(1, -1)}</code>
          ) : (
            <span key={index}>{part}</span>
          ),
        )}
    </>
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
      <style>{samples}</style>
      <p>
        A theme is three files — <code>theme.json</code> for its tokens, <code>finishes.json</code>{" "}
        for the surfaces it draws, <code>index.ts</code> for the theme object — and every theme
        below states the same tokens and the same finishes. Which tokens there are, and what each
        finish draws, is <a href={SPEC_URL}>the theme spec on GitHub</a>; this page reads it, so a
        name or a duty here is the spec&apos;s own.
      </p>
      <p>
        A token is a colour or a number under a name, a finish is a surface a component draws itself
        in, and an alias is a token written as another (<code>card</code> is{" "}
        <code>var(--background)</code>): the table shows an alias as the token it points at. The
        swatches follow the site&apos;s light and dark switch; the finish samples follow it too,
        each drawn with its own theme&apos;s values.
      </p>

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

          <h3 id={`tokens-${theme.palette.id}`}>Tokens</h3>
          <p>
            Every token the theme sets, in <code>theme.json</code>&apos;s order, for light and dark:
            the swatch draws the value and the text is what the file writes. A <code>var(--x)</code>{" "}
            or a <code>color-mix()</code> is the theme&apos;s own reference; the swatch fills it in
            from the same appearance, the text leaves it as written.
          </p>
          {theme.tokens.map((group) => (
            <div key={group.id}>
              <h4 id={`tokens-${theme.palette.id}-${group.id}`}>{group.title}</h4>
              <p>{group.note}</p>
              <table>
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Light</th>
                    <th>Dark</th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row) => (
                    <tr key={row.name}>
                      <td>
                        <code>{row.name}</code>
                      </td>
                      <td>
                        <Swatch color={row.lightSwatch} />
                        {row.aliasOf ? (
                          <code className="text-fd-muted-foreground">→ {row.aliasOf}</code>
                        ) : (
                          <code className="text-xs">{row.light}</code>
                        )}
                      </td>
                      <td>
                        <Swatch color={row.darkSwatch} />
                        {row.aliasOf ? (
                          <code className="text-fd-muted-foreground">→ {row.aliasOf}</code>
                        ) : (
                          <code className="text-xs">{row.dark}</code>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <h3 id={`finishes-${theme.palette.id}`}>Finishes</h3>
          <p>
            The surfaces this theme draws, in <code>finishes.json</code>&apos;s order: what each one
            draws and what reads it is the spec&apos;s, the tokens are the ones its values name in
            this theme, and the sample is drawn from <code>finishes.json</code> itself — the
            background, the gradient, the shadow and the edge it writes, with its references filled
            in.
          </p>
          <table>
            <thead>
              <tr>
                <th>Finish</th>
                <th>What it draws</th>
                <th>Read by</th>
                <th>Tokens</th>
                <th>Sample</th>
              </tr>
            </thead>
            <tbody>
              {theme.finishes.map((finish) => (
                <tr key={finish.role}>
                  <td>
                    <code>{finish.role}</code>
                  </td>
                  <td>{finish.drawsEn}</td>
                  <td>
                    <Reads text={finish.reads} />
                  </td>
                  <td>
                    {finish.tokens.length === 0 ? (
                      <span className="text-fd-muted-foreground">—</span>
                    ) : (
                      finish.tokens.map((token, index) => (
                        <span key={token}>
                          {index === 0 ? null : ", "}
                          <code>{token}</code>
                        </span>
                      ))
                    )}
                  </td>
                  <td>
                    <span
                      data-ground={theme.palette.id}
                      className="inline-flex items-center justify-center rounded-md p-2"
                    >
                      <span
                        data-sample={`${theme.palette.id}-${finish.role}`}
                        className="block h-8 w-16 rounded-md"
                      />
                    </span>
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
