import { expect, open, test } from "nsh/test";

const find = (texts: string[], prefix: string) =>
  texts.find((line) => line.startsWith(prefix))?.slice(prefix.length);

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

test("a lightbox's own style takes the card's place and the window's size", async () => {
  const app = await open("./dialog.fixture.tsx");
  await app.press("text:Open D");
  await app.waitFor("id:scrim");
  await app.wait(100);
  // The content's box, measured where it was laid out: the window's top left and its whole size,
  // where the card would be 360 points wide, 90 % at most, in the middle.
  const window = find(app.texts(), "window=");
  expect(typeof window).toBe("string");
  expect(find(app.texts(), "lightbox ")).toBe(`0,0 ${window}`);
});

test("a press on a lightbox's scrim closes the dialog", async () => {
  const app = await open("./dialog.fixture.tsx");
  await app.press("text:Open D");
  await app.waitFor("id:scrim");
  await app.press("id:scrim");
  await app.wait(100);
  expect(app.count("id:scrim")).toBe(0);
  expect(find(app.texts(), "lightbox ")).toBe("-closed");
});
