// The narrow check: every demo opened on a 320-point phone (an iPhone SE's width), its first frame
// taken; `scripts/port/narrow.ts` then reads the page's right margin, which must be bare page.
//
//   bun run check:narrow [--only <id,...>]
//
// Only the page as it opens: a popup opened by a step may cover the margin by design.
import { open, test } from "nsh/test";

import { cases, clock, networkOf, settle } from "./render-cases";

for (const { id, photos } of cases) {
  test(`narrow id=${id}:`, async () => {
    const app = await open(`./${id}.tsx`, {
      platform: "macos",
      colorScheme: "light",
      reducedMotion: true,
      clock,
      ...networkOf(photos),
      width: 320,
      height: 2000,
    });
    await settle(app);
    await app.screenshot(`shots/narrow/${id}.png`);
  });
}
