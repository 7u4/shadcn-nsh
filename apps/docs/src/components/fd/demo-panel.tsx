"use client";

/**
 * A component page's demo panel: Preview | Source, Phone | Desktop and the demo theme, over the packaged demo in
 * `public/demos/<name>/`. The behaviour is the Astro `DemoFrame` + `src/lib/demo-client.ts` one,
 * as a component:
 *
 * - the frame runs the demo at the layout's real size (390×640 phone, 1024×640 desktop) and at a
 *   height fixed by the layout, so switching demo or layout never moves the page;
 * - the layout's idiom rides in `?idiom=` — an idiom is fixed when an app starts, so the frame
 *   loads again when it changes — and the visitor's choice is kept in `localStorage`;
 * - the site's theme rides in `?theme=` before the first load, and a running frame is told with a
 *   message afterwards (the demo page listens for it), so a theme switch does not reload it.
 *
 * Nothing here reads the theme while rendering: it is read after mount, so the static markup and
 * the first client render agree.
 */
import { useEffect, useRef, useState } from "react";

import { PaletteSwitch } from "@/components/fd/palette-switch";
import { onPaletteChange } from "@/lib/palette";
import { url } from "@/lib/site";

const LAYOUTS = {
  mobile: { width: 390, height: 640, idiom: "phone" },
  desktop: { width: 1024, height: 640, idiom: "desktop" },
} as const;
type Layout = keyof typeof LAYOUTS;

/** The layout the visitor chose last, for every demo (the old panel's key, kept). */
const LAYOUT_KEY = "nsh-demo-layout";

const siteTheme = (): "light" | "dark" =>
  document.documentElement.classList.contains("light") ? "light" : "dark";

const withParam = (href: string, name: string, value: string) => {
  const parsed = new URL(href, document.baseURI);
  parsed.searchParams.set(name, value);
  return parsed.href;
};

const demoHref = (name: string) => url(`demos/${name}/index.html`);

function savedLayout(): Layout {
  try {
    return localStorage.getItem(LAYOUT_KEY) === "desktop" ? "desktop" : "mobile";
  } catch {
    return "mobile";
  }
}

export type DemoPanelProps = {
  /** The demo's name: `apps/docs/demos/<name>.tsx`, packaged to `public/demos/<name>/`. */
  name: string;
  /** `apps/docs/demos/<name>.tsx`, read for the Source tab (a lazily imported `?raw` module). */
  loadSource?: () => Promise<string>;
  /** Kept for frontmatter compat; the panel sizes the frame itself. */
  height?: number;
};

export function DemoPanel({ name, loadSource }: DemoPanelProps) {
  const [view, setView] = useState<"preview" | "source">("preview");
  const [source, setSource] = useState<string>();
  const [layout, setLayout] = useState<Layout>("mobile");
  // The frame's URL, set once the theme and the saved layout are known (after mount).
  const [src, setSrc] = useState<string>();
  const frame = useRef<HTMLIFrameElement>(null);
  const loaded = useRef(false);
  // A palette is read when a demo app starts, so the frame loads again for one (`palette.ts`):
  // a new mount, since a frame does not reload for the URL it already has.
  const [reloads, setReloads] = useState(0);

  const chooseLayout = (next: Layout) => {
    setLayout(next);
    try {
      localStorage.setItem(LAYOUT_KEY, next);
    } catch {}
  };

  // The source is read when the tab opens, not with the page.
  useEffect(() => {
    if (view !== "source" || source !== undefined || !loadSource) return;
    let live = true;
    loadSource().then((text) => {
      if (live) setSource(text);
    });
    return () => {
      live = false;
    };
  }, [view, source, loadSource]);

  // The saved layout applies at once, before the frame's first load.
  useEffect(() => setLayout(savedLayout()), []);

  useEffect(() => {
    loaded.current = false;
    const href = withParam(demoHref(name), "idiom", LAYOUTS[layout].idiom);
    setSrc(withParam(href, "theme", siteTheme()));
  }, [name, layout]);

  useEffect(
    () =>
      onPaletteChange(() => {
        loaded.current = false;
        setReloads((count) => count + 1);
      }),
    [],
  );

  // The page's theme: in the URL while the frame has not loaded, a message once it has.
  useEffect(() => {
    const apply = () => {
      const theme = siteTheme();
      const running = frame.current;
      if (running?.dataset.theme === theme) return;
      if (running && loaded.current) {
        running.contentWindow?.postMessage({ theme }, window.location.origin);
      } else {
        setSrc((current) => (current ? withParam(current, "theme", theme) : current));
      }
      if (running) running.dataset.theme = theme;
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const size = LAYOUTS[layout];
  const id = `demo-${name.replace(/[^a-z0-9_-]/gi, "-")}`;

  return (
    <figure className="not-prose bg-fd-card text-fd-card-foreground my-6 rounded-xl border">
      <figcaption className="flex flex-wrap items-center gap-2 border-b px-3 py-2 text-sm">
        <div role="tablist" aria-label="Demo" className="flex items-center gap-1">
          {(["preview", "source"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`${id}-tab-${tab}`}
              aria-controls={`${id}-${tab}`}
              aria-selected={view === tab}
              onClick={() => setView(tab)}
              className={`rounded-md px-2 py-1 capitalize ${
                view === tab
                  ? "bg-fd-primary text-fd-primary-foreground"
                  : "text-fd-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div role="radiogroup" aria-label="Layout" className="flex items-center gap-1">
          {(Object.keys(LAYOUTS) as Layout[]).map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={layout === option}
              onClick={() => chooseLayout(option)}
              className={`rounded-md px-2 py-1 capitalize ${
                layout === option
                  ? "bg-fd-secondary text-fd-secondary-foreground"
                  : "text-fd-muted-foreground"
              }`}
            >
              {option === "mobile" ? "Phone" : "Desktop"}
            </button>
          ))}
        </div>
        <PaletteSwitch />
        <span className="text-fd-muted-foreground ml-auto font-mono text-xs">{name}.tsx</span>
        <a
          href={src ?? demoHref(name)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fd-muted-foreground rounded-md px-2 py-1"
          title="Open in new tab"
          aria-label="Open in new tab"
        >
          ↗
        </a>
      </figcaption>
      <div
        role="tabpanel"
        id={`${id}-preview`}
        hidden={view !== "preview"}
        className="overflow-auto p-3"
      >
        <iframe
          key={`${src}-${reloads}`}
          ref={frame}
          src={src}
          title={`Live demo: ${name}`}
          allow="clipboard-write"
          loading="lazy"
          width={size.width}
          height={size.height}
          onLoad={() => {
            loaded.current = true;
            if (frame.current) frame.current.dataset.theme = siteTheme();
          }}
          className="mx-auto block max-w-full border-0 bg-transparent"
        />
      </div>
      <div
        role="tabpanel"
        id={`${id}-source`}
        hidden={view !== "source"}
        className="overflow-auto p-3"
      >
        <pre className="text-xs leading-relaxed">
          <code>{source ?? ""}</code>
        </pre>
      </div>
    </figure>
  );
}
