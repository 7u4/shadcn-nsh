# apps/docs

Astro site for the copy-into-app components: install, usage, examples and the props the styled layer adds. Behavior, keyboard support and the full unstyled API live on [nsh.dev](https://nsh.dev/elements) and are linked, not copied.

Three surfaces share the same components:

| Surface           | Role                                                                           |
| ----------------- | ------------------------------------------------------------------------------ |
| `apps/docs`       | This site: the public face                                                     |
| `apps/docs/demos` | Acceptance demos for the pages, and the reference pages `port:render` compares |
| `apps/gallery`    | Native behavior tests and smoke pages                                          |

## Shell

The chrome is a structural copy of `references/nsh/website`: sticky `site-nav` (burger under 860px), `docs-sidebar` (folding under 960px), `docs-main` / `doc-content`, TOC, pager, footer, light/dark switch. Styles come from that site's `global.css` + `ui.css`, with the gallery tokens inlined in `styles/gallery-ui.css`.

Do **not** invent a parallel layout — extend `src/components/` and `src/layouts/`. A component page must name `layout: ../../../layouts/Docs.astro` in its frontmatter; without it Astro renders the Markdown with no chrome.

## Component pages

One page per `registry:ui` item, `src/pages/docs/components/<slug>.md`. The slug is the registry item's name.

Frontmatter:

```yaml
---
layout: ../../../layouts/Docs.astro
title: Button
description: A button, an icon button, a round button, and a split button.
component: true
demo: button
demoHeight: 480 # optional, overlays only
---
```

The body has four sections, in this order, and nothing else at `##`:

1. **Installation** — one `sh` fence: `npx shadcn-nsh@latest add <slug>`.
2. **Usage** — the import from `@/components/ui/<slug>`, then one minimal use.
3. **Examples** — one `###` per variant, size, state or common use, each with a short `tsx` snippet. The sections show what `apps/docs/demos/<slug>.tsx` shows, and every prop is one the component really has.
4. **API** — only the props and parts this package adds; one sentence points to [`nsh/base`](https://nsh.dev/elements/<element>) for the rest. Composites list their parts.

Do **not**:

- put `# Title` in the body (the layout renders `h1` from frontmatter);
- write `## Behavior & a11y` or `## Source` (the layout injects them);
- use the old `## Install`, `## Composition`, `## Differences` or `## Not forwarded` sections;
- invent props or paste another library's API. Read `packages/ui/<slug>.tsx` and `apps/docs/demos/<slug>.tsx` first.

Import snippets use the registry import path:

```tsx
import { Button, IconButton } from "@/components/ui/button";
```

Every name in such an import must be exported by `packages/ui/<slug>.tsx`; `check:pages` parses the import lines and checks them.

## One component list

`src/lib/components.generated.ts` is generated from `registry.json` (the `registry:ui` items), each page's frontmatter, and `src/lib/official.ts` (which shadcn/ui component and which NSH element each page answers for). The sidebar (`src/lib/nav.ts`), the index (`src/pages/docs/components/index.astro`) and the coverage page (`src/pages/docs/components/coverage.astro`) read it, so they list exactly the components that have pages, grouped by kind in one order.

```sh
bun run docs:components   # regenerate after adding a component or a page
```

Do not edit the generated file. `src/lib/components.ts` keeps the helpers. `bun run check:pages` fails when:

- the file is stale;
- an official table names a page that does not exist, or serves nothing without a status and a note;
- `references/` has a shadcn/ui `ui/*.tsx` or an NSH `elements/*.md` with no row — an upstream addition is one row here;
- a page links `nsh.dev/elements/<x>` that has no `elements/<x>.md` in `references/nsh`;
- `public/llms.txt` (written by hand) has no line for a component, or a line for one that is gone.

## Kinds and coverage

There are two kinds, and neither is filed by hand. `Official` is a page that an `NSH_ELEMENTS` row of `src/lib/official.ts` (one per `references/nsh/website/elements/*.md`) names in its `ours` — it dresses an NSH element. `Our own` is a page no NSH row names: this library's addition, whether or not shadcn/ui has one. `src/lib/kinds.ts` derives the kind from those rows and holds the two labels and their order (`Official`, then `Our own`, alphabetically by title inside each); a new component lands in the right group the moment its row exists.

`src/lib/official.ts` answers for both official sets: `SHADCN_UI` is one row per `references/shadcn-ui/apps/v4/registry/new-york-v4/ui/*.tsx`, `NSH_ELEMENTS` one row per `references/nsh/website/elements/*.md`. A row lists the pages here that serve it (`ours`, closest first) and, when nothing does, a `status` (`planned`, `missing`, `not-doing`, `primitive`) and a one-line `note`. Reversed, the same rows give each page its header links (`Official: shadcn/ui · dropdown-menu | NSH · nsh.dev/elements/menu`) and its base element, so a page never writes them itself. A `planned` row becomes a link by itself once its page exists.

Adding a component: add or extend the official row if one of theirs answers it (a component no NSH row names is Our own), add its line to `public/llms.txt`, then `bun run docs:components`. The coverage page is generated from these tables; do not write it by hand.

## Demos

- `apps/docs/demos/<slug>.tsx` is the acceptance demo: covers every variant, size and state, at least one real scenario. It is also the page's Preview and the source of truth for its Examples. It is not illustrative.
- `apps/docs/demos/<slug>.ref.tsx` is the same page written the upstream way, the look expanded on `nsh/base` controls. `bun run port:render` requires the two screenshots to match; don't change one without the other.
- `bun run docs:demos` packages each demo with `nsh package --target web` into `public/demos/<slug>/` (gitignored) for the iframe. The demo `demo:` must name an existing `demos/<slug>.tsx`.
- The demo page uses `demos/kit.tsx` (`DemoPage` / `DemoCard` / `DemoSection`). Colors are read in JSX so they follow the appearance.
- The demos' **theme** is a palette (`demos/palettes.ts`: `default`, the build-time theme, or `shadcn`). The site keeps the choice in the demo app's storage — `nsh:<demos/nsh.json's id>:palette` in localStorage, written by `src/components/PaletteSwitch.astro` — and every page imports `demos/apply-palette.ts`, which reads it before it mounts and loads that theme's files on demand. `src/lib/palette.ts` builds the key from `nsh.json` and the list, so neither side names a palette or an app id of its own. A running app reads its storage once: the switch loads the panels again (`reloadDemos` in `demo-client.ts`). `bun run check:palette` proves the first frame a visitor sees is already the chosen theme's.

## Theme

`packages/theme` is the only look: `theme.json` (colors and radii), `finishes.json` (gradients and shadows), `theme.ts` (`colors`, `finish`, `radius`, `focusRing`, `alpha`). Pages and demos use those readers; no page hand-writes a palette. See `src/pages/docs/theme.md` and [the theme README](../../packages/theme/README.md).

## Checks

```sh
bun run check:pages    # pages ↔ registry ↔ demos, sections, import names, generated list
bun run check:docs     # astro sync + tsc
nsh check apps/docs/demos  # the demos app
bun run docs:demos     # package the previews
bun run check:palette  # the first frame of a switched demo is the chosen theme (Chrome)
bun run check:first-frame  # every demo's first frame inside its budget (Chrome)
vp check               # format, lint, tool types
```

`public/llms.txt` is this site's table of contents for language models: the docs pages, every component with its base link, and where the base API lives. It is written by hand — update it when a page, a base link or a rename changes.
