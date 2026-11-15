import { expect, open, test } from "nsh/test";

const find = (texts: string[], prefix: string) =>
  texts.find((t) => t.startsWith(prefix))?.slice(prefix.length);

test("a step opens its route, and a disabled step does not", async () => {
  const app = await open("./breadcrumb.fixture.tsx");
  await app.press("text:Home");
  await app.waitFor("text:opened=/");
  await app.press("text:Components");
  await app.waitFor("text:opened=/components");
  await expect(app.press("text:Archive")).rejects.toMatchObject({ code: "ERR_NSH_TEST_DISABLED" });
  expect(app.texts()).toContain("opened=/components");
});

test("a step's ink is the muted one until the pointer rests on it", async () => {
  const app = await open("./breadcrumb.fixture.tsx", { platform: "macos" });
  const away = app.spanStyle("text:Home").color;
  const page = app.spanStyle("text:Breadcrumb").color;
  expect(away).not.toBe(page);
  await app.hover("text:Home");
  expect(app.spanStyle("text:Home").color).toBe(page);
});

test("the trail is compact with a pointer and roomier on a touch screen", async () => {
  const desktop = await open("./breadcrumb.fixture.tsx", { platform: "macos" });
  const touch = await open("./breadcrumb.fixture.tsx", { platform: "ios" });
  expect(find(desktop.texts(), "size=")).toBe("13");
  expect(find(touch.texts(), "size=")).toBe("15");
  expect(find(desktop.texts(), "ring=")).toBe("3");
  expect(find(desktop.texts(), "hover=")).toBe("ink");
});
