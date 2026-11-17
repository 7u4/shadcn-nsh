"use client";

/**
 * The demos' palette, in the demo panel's toolbar: a dropdown of the palettes the demos offer
 * (`demos/palettes.ts`), Official (the one the demos are built with) first. A choice goes into the
 * demo app's storage and the panels load again — a running app cannot see a later write
 * (`src/lib/palette.ts` says why).
 */
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { choosePalette, onPaletteChange, storedPalette } from "@/lib/palette";

import { PALETTES, type PaletteId } from "../../../demos/palettes";

export function PaletteSwitch({ label = "Demo theme" }: { label?: string }) {
  // The stored choice is read after mount: it is the visitor's, not the build's.
  const [current, setCurrent] = useState<PaletteId>("default");

  useEffect(() => {
    setCurrent(storedPalette());
    return onPaletteChange(() => setCurrent(storedPalette()));
  }, []);

  // The browser's own arrow sits where the platform puts it (hard against the edge on macOS):
  // it is hidden, and the chevron drawn here sits on the same inset as the label.
  return (
    <span className="relative inline-flex">
      <select
        aria-label={label}
        title={label}
        value={current}
        onChange={(event) => {
          const id = event.currentTarget.value as PaletteId;
          choosePalette(id);
          setCurrent(id);
        }}
        className="bg-fd-muted text-fd-foreground h-8 appearance-none rounded-lg border pr-8 pl-2.5 text-sm"
      >
        {PALETTES.map((palette) => (
          <option key={palette.id} value={palette.id}>
            {palette.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="text-fd-muted-foreground pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2"
      />
    </span>
  );
}
