import { open, test } from "nsh/test";

test("a pressable's string child is its name, and it takes the press", async () => {
  const app = await open("./pressable.fixture.tsx");
  await app.press("label:Retry");
  await app.waitFor("text:pressed 1");
});
