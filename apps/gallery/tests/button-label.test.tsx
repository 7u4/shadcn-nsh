import { expect, open, test } from "nsh/test";

test("a string child is the button's accessibility name", async () => {
  const app = await open("./button-label.fixture.tsx");
  await app.press("label:Retry");
  await app.waitFor("text:pressed 1");
});

test("a button drawn as given has no derived name", async () => {
  const app = await open("./button-label.fixture.tsx");
  await expect(app.press("label:Drawn as given")).rejects.toThrow();
  await app.waitFor("text:pressed 0");
});
