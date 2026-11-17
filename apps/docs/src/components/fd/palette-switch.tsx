"use client";

/**
 * The demos' palette, beside the page's appearance: Default (the one the demos are built with) or
 * shadcn. A choice goes into the demo app's storage and the panels load again — a running app
 * cannot see a later write (`src/lib/palette.ts` says why).
 */
import { useEffect, useState } from "react";

import { choosePalette, onPaletteChange, storedPalette } from "@/lib/palette";

import { PALETTES } from "../../../demos/palettes";

export function PaletteSwitch({ label = "Demo theme" }: { label?: string }) {
  // The stored choice is read after mount: it is the visitor's, not the build's.
  const [current, setCurrent] = useState<string>("default");

  useEffect(() => {
    setCurrent(storedPalette());
    return onPaletteChange(() => setCurrent(storedPalette()));
  }, []);

  return (
    <div
      role="radiogroup"
      aria-label={label}
      title={label}
      className="flex items-center gap-1 text-xs"
    >
      {PALETTES.map((palette) => (
        <button
          key={palette.id}
          type="button"
          role="radio"
          aria-checked={current === palette.id}
          aria-label={`${label}: ${palette.label}`}
          onClick={() => {
            choosePalette(palette.id);
            setCurrent(palette.id);
          }}
          className={`rounded-md border px-2 py-1 ${
            current === palette.id
              ? "bg-fd-secondary text-fd-secondary-foreground"
              : "text-fd-muted-foreground"
          }`}
        >
          {palette.label}
        </button>
      ))}
    </div>
  );
}
