import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { RootProvider } from "fumadocs-ui/provider/tanstack";

import SearchDialog from "@/components/fd/search";
import { PALETTE_SCRIPT } from "@/lib/palette";
import { BASE, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";
import { sitePaletteCss } from "@/lib/themes";

import appCss from "@/styles/fd.css?url";

/** The site in each palette the demos offer (`src/lib/themes.ts`), read once. */
const PALETTE_CSS = sitePaletteCss();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // The app icon's mark, in the arch it has on nsh (`public/favicon.svg`).
      { rel: "icon", href: `${BASE}favicon.svg`, type: "image/svg+xml" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html data-palette="default" suppressHydrationWarning>
      <head>
        {/* The palette before the first paint: the site is drawn in the demos' palette. */}
        <script dangerouslySetInnerHTML={{ __html: PALETTE_SCRIPT }} />
        <style dangerouslySetInnerHTML={{ __html: PALETTE_CSS }} />
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col">
        <RootProvider search={{ SearchDialog }}>
          <Outlet />
        </RootProvider>
        <Scripts />
      </body>
    </html>
  );
}
