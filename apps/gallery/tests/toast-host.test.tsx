import { expect, open, test } from "nsh/test";

test("toast raises, updates and dismisses", async () => {
  const app = await open("./toast-host.fixture.tsx");
  await app.press("Raise");
  await app.waitFor("text:Hello");
  expect(app.texts()).toContain("status=raised a");
  await app.press("Update");
  await app.waitFor("text:Updated");
  expect(app.texts()).toContain("status=updated");
  await app.press("Dismiss");
  await app.waitFor("text:status=dismissed null");
  expect(app.texts().some((line) => line === "Updated")).toBe(false);
});

test("Escape dismisses the newest toast", async () => {
  const app = await open("./toast-host.fixture.tsx");
  await app.press("Raise");
  await app.waitFor("text:Hello");
  await app.keyboard.press("escape");
  await app.waitFor("text:status=dismissed null");
});

test("a Toaster with closeOnEscape={false} keeps its toast on Escape", async () => {
  const app = await open("./toast-escape.fixture.tsx");
  await app.press("Raise");
  await app.waitFor("text:Kept");
  await app.keyboard.press("escape");
  await app.wait(500);
  expect(app.shows("text:Kept")).toBe(true);
});

test("an action dismisses with its label, and update misses an unknown id", async () => {
  const app = await open("./toast-host.fixture.tsx");
  await app.press("With undo");
  await app.waitFor("text:Gone");
  await app.press("Undo");
  await app.waitFor("text:status=dismissed Undo");
  await app.press("Missing");
  await app.waitFor("text:status=no");
});
