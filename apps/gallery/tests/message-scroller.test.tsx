import { expect, open, test } from "nsh/test";

const find = (texts: string[], prefix: string) =>
  texts.find((line) => line.startsWith(prefix))?.slice(prefix.length);

const offset = (app: Awaited<ReturnType<typeof open>>) => Number(find(app.texts(), "offset="));

test("a message scroller opens at its newest message", async () => {
  const app = await open("./message-scroller.fixture.tsx");
  await app.wait(50);
  expect(offset(app)).toBeGreaterThan(0);
});

test("a new message follows the end while the reader is there", async () => {
  const app = await open("./message-scroller.fixture.tsx");
  await app.wait(50);
  const before = offset(app);
  await app.press("label:Send");
  await app.waitFor("text:turns=9");
  await app.wait(50);
  expect(offset(app)).toBeGreaterThan(before);
});

test("a new message leaves a reader who scrolled up where they were", async () => {
  const app = await open("./message-scroller.fixture.tsx");
  await app.wait(50);
  await app.scroll("label:Conversation", -240);
  await app.wait(50);
  const before = offset(app);
  expect(before).toBeLessThan(240);
  await app.press("label:Send");
  await app.waitFor("text:turns=9");
  await app.wait(50);
  expect(offset(app)).toBe(before);
});

test("the button takes a reader back to the end", async () => {
  const app = await open("./message-scroller.fixture.tsx");
  await app.wait(50);
  await app.scroll("label:Conversation", -240);
  await app.wait(50);
  const up = offset(app);
  await app.press("label:Scroll to end");
  await app.wait(80);
  expect(offset(app)).toBeGreaterThan(up);
});
