// The shadcn theme's render check: every demo, and its reference page beside it, drawn with
// `selectTheme(shadcn)` — the theme `themes/shadcn/` installs — and the two compared, so a
// component drawn by hand still draws what its theme says.
//
//   bun run port:render:theme        (nsh test render-theme.test.tsx --target web)
//
// `scripts/port/render-theme.ts` runs this file in a copy of the demos, one directory over
// (`apps/docs/demos-themed/`), where each page puts the theme on before it mounts. The script
// keeps the screenshots in `shots-theme/` for a look by eye; nothing is kept as a baseline — the
// gate is the build-time theme's (`port:render`).
import { open, test } from "nsh/test";

import { cases, clock, networkOf, same, schemes, settle } from "./render-cases";

// A desktop platform starts the page in the desktop idiom at any width; without one the page
// measures itself, and at the test's 390 points it is a phone.
const platform = { platform: "macos" } as const;

for (const { id, steps, selfReference, photos, tolerance, extraSettle } of cases) {
  for (const colorScheme of schemes) {
    test(`id=${id}: shadcn, ${colorScheme}`, async () => {
      // The same page conditions as `render.test.tsx`: the manual clock, reduced motion, and a
      // live network where the page draws photographs.
      const options = {
        ...platform,
        colorScheme,
        reducedMotion: true,
        clock,
        ...networkOf(photos),
      };
      const ours = await open(`./${id}.tsx`, options);
      const reference = selfReference ? null : await open(`./${id}.ref.tsx`, options);
      await steps?.(ours);
      if (reference) await steps?.(reference);
      await settle(ours);
      if (reference) await settle(reference);
      if (extraSettle) {
        await ours.wait(extraSettle);
        if (reference) await reference.wait(extraSettle);
      }
      const name = `shots-theme/${id}-shadcn-${colorScheme}`;
      const a = await ours.screenshot(`${name}.png`);
      if (!reference) {
        console.log(`${id}: self-reference — ${selfReference}`);
        return;
      }
      const b = await reference.screenshot(`${name}.ref.png`);
      if (!same(a, b)) {
        console.log(
          `${name}: not byte for byte — the gate compares it${tolerance ? ` within ${tolerance.pixels} pixels, ${tolerance.delta}/255 (${tolerance.why})` : " within the antialiasing budget"}`,
        );
      }
    });
  }
}
