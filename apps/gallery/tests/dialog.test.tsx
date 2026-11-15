import { expect, open, test } from "nsh/test";

test("string trigger opens the dialog and reports one change", async () => {
  const app = await open("./dialog.fixture.tsx");
  await app.press("text:Open A");
  await app.waitFor("text:Body A");
  expect(app.texts()).toContain("changes 1");
});

test("close dismisses the dialog", async () => {
  const app = await open("./dialog.fixture.tsx");
  await app.press("text:Open A");
  await app.waitFor("text:Body A");
  await app.press("text:Close A");
  await app.wait(100);
  expect(app.shows("Body A")).toBe(false);
  expect(app.texts()).toContain("changes 2");
});

test("custom trigger is a button that opens", async () => {
  const app = await open("./dialog.fixture.tsx");
  expect(app.count("role:button[Open B]")).toBeGreaterThan(0);
  await app.press("text:Open B");
  await app.waitFor("text:Body B");
});

test("a disabled trigger does not open, and follows a later change", async () => {
  const app = await open("./dialog.fixture.tsx");
  await app.press("text:Flip");
  await app.wait(100);
  expect(app.enabled("text:Open C")).toBe(false);
  await app.press("text:Open C").catch(() => {});
  await app.wait(100);
  expect(app.shows("Body C")).toBe(false);
});

test("a bare dialog takes the window and none of the card's chrome", async () => {
  const app = await open("./dialog.fixture.tsx", { platform: "macos" });
  const find = (prefix: string) =>
    app
      .texts()
      .find((t) => t.startsWith(prefix))
      ?.slice(prefix.length);
  // The card: centered, 90% at most, 360 across, 16-point corners, 20 of padding, rows 12 apart.
  expect(find("card=")).toBe("auto|90%|360|16|20|12|1");
  // The bare presentation is the window itself: 100% by 100%, and nothing else drawn around it.
  expect(find("bare=")).toBe("100%|100%|height,width");
});

test("a press on a bare dialog's backdrop closes it, and reports why", async () => {
  const app = await open("./dialog.fixture.tsx", { platform: "macos" });
  await app.press("text:Open E");
  await app.waitFor("text:Body E");
  // The content keeps the top of the window (`style` over the look), so the window's middle is
  // still the dialog's own backdrop: a press there is the base's, as it is under the card.
  await app.press("id:bare-backdrop");
  await app.wait(100);
  expect(app.shows("Body E")).toBe(false);
  expect(app.texts()).toContain("last: false/backdropPress");
});

test("Escape closes a bare dialog", async () => {
  const app = await open("./dialog.fixture.tsx", { platform: "macos" });
  await app.press("text:Open D");
  await app.waitFor("text:Body D");
  await app.keyboard.press("escape");
  await app.wait(100);
  expect(app.shows("Body D")).toBe(false);
  expect(app.texts()).toContain("last: false/cancel");
});

test("a bare dialog's own close button closes it", async () => {
  const app = await open("./dialog.fixture.tsx", { platform: "macos" });
  await app.press("text:Open D");
  await app.waitFor("text:Body D");
  await app.press("text:Close D");
  await app.wait(100);
  expect(app.shows("Body D")).toBe(false);
  expect(app.texts()).toContain("last: false/closePress");
});
