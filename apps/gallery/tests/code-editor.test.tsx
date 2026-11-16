import { expect, open, test } from "nsh/test";

const find = (texts: string[], prefix: string) =>
  texts.find((line) => line.startsWith(prefix))?.slice(prefix.length);

test("a CodeEditor reports typing, and its accessible name finds it", async () => {
  const app = await open("./code-editor.fixture.tsx", { platform: "macos", reducedMotion: true });
  expect(app.shows("label:Code sample")).toBe(true);
  await app.type("id:code", "Z");
  await app.wait(50);
  expect(find(app.texts(), "focus=")).toBe("typescript");
  expect(find(app.texts(), "typescript=")).toContain("Z");
  expect(find(app.texts(), "value=")).toContain("Z");
});

test("a read-only CodeEditor takes no text", async () => {
  const app = await open("./code-editor.fixture.tsx", { platform: "macos", reducedMotion: true });
  expect(app.shows("label:Locked source")).toBe(true);
  await app.type("id:locked", "NO").catch(() => {});
  await app.wait(50);
  expect(find(app.texts(), "locked=")).toBe("keep");
});

test("a controlled CodeEditor shows a new value the app sets", async () => {
  const app = await open("./code-editor.fixture.tsx", { platform: "macos", reducedMotion: true });
  await app.press("label:Load a file");
  await app.wait(50);
  expect(find(app.texts(), "typescript=")).toContain("43");
  await app.type("id:code", "Y");
  await app.wait(50);
  // The text after the new value, not the one it replaced.
  expect(find(app.texts(), "typescript=")).toContain("43");
  expect(find(app.texts(), "typescript=")).toContain("Y");
});

test("a CodeEditor keeps each file's text when the language switches", async () => {
  const app = await open("./code-editor.fixture.tsx", { platform: "macos", reducedMotion: true });
  await app.type("id:code", "X");
  await app.wait(50);
  await app.press("label:Switch language");
  await app.wait(50);
  expect(find(app.texts(), "value=")).toContain('"answer"');
  await app.type("id:code", "Y");
  await app.wait(50);
  expect(find(app.texts(), "json=")).toContain("Y");
  expect(find(app.texts(), "typescript=")).toContain("X");
  await app.press("label:Switch language");
  await app.wait(50);
  expect(find(app.texts(), "typescript=")).toContain("X");
});
