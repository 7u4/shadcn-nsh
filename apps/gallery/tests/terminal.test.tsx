import { expect, open, test } from "nsh/test";

const has = (texts: string[], line: string) => texts.includes(line);

test("what the program writes is on screen and in the ref's text", async () => {
  const app = await open("./terminal.fixture.tsx");
  await app.press("text:Write");
  await app.wait(120);
  await app.press("text:Read");
  await app.wait(120);
  expect(has(app.texts(), "screen=alpha|green")).toBe(true);
});

test("what the user types is reported to the program", async () => {
  const app = await open("./terminal.fixture.tsx");
  await app.type("label:Session", "ls");
  await app.wait(120);
  expect(has(app.texts(), "data=ls")).toBe(true);
});

test("a reset clears the screen and the scrollback", async () => {
  const app = await open("./terminal.fixture.tsx");
  await app.press("text:Write");
  await app.wait(120);
  await app.press("text:Clear");
  await app.wait(120);
  await app.press("text:Read");
  await app.wait(120);
  expect(has(app.texts(), "screen=empty")).toBe(true);
});

test("its accessibilityLabel is its name, and a wrong one reaches nothing", async () => {
  const app = await open("./terminal.fixture.tsx");
  await app.type("label:Session", "a");
  await app.wait(120);
  expect(has(app.texts(), "data=a")).toBe(true);
  await expect(app.type("label:Shell", "b")).rejects.toThrow();
});
