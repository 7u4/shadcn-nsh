import { expect, open, test } from "nsh/test";

const find = (texts: string[], prefix: string) =>
  texts.find((line) => line.startsWith(prefix))?.slice(prefix.length);

test("a SelectTrigger's layout style lays out the view around the trigger, as a view of the app's", async () => {
  const app = await open("./select-layout.fixture.tsx", {
    platform: "macos",
    width: 520,
    height: 560,
  });
  // The row is 440 wide, its spacers 80 and 60, its gaps 8: 284 left for the trigger.
  expect(find(app.texts(), "stretched=")).toBe("284");
  // No style: the trigger's own least, as before — the look's 180 with a pointer.
  expect(find(app.texts(), "natural=")).toBe("180");
  // `minWidth: 0` lets the row squeeze it under that least (440 - 80 - 200 - 2 × 8).
  expect(find(app.texts(), "squeezed=")).toBe("144");
});
