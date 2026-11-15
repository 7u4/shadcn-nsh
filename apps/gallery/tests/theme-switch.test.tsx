import { expect, open, test } from "nsh/test";

import plainFinishes from "../../../packages/theme/finishes.json";
import neutralFinishes from "../../../packages/theme/themes/shadcn/finishes.json";

type Finish = { backgroundColor?: string; boxShadow: string };
type Finishes = { light: Record<string, Finish>; dark: Record<string, Finish> };

const plain = plainFinishes as Finishes;
const neutral = neutralFinishes as Finishes;

/** What the probe page rendered, by the `key:value` line each reading is. */
type Look = { fill: string; shadow: string; radius: string; theme: string; appearance: string };

const read = (texts: string[], key: string) =>
  texts.find((text) => text.startsWith(`${key}:`))?.slice(key.length + 1) ?? "";

const look = (texts: string[]): Look => ({
  fill: read(texts, "fill"),
  shadow: read(texts, "shadow"),
  radius: read(texts, "radius"),
  theme: read(texts, "theme"),
  appearance: read(texts, "appearance"),
});

/** A raised button's fill, its shadow and its corners, from a theme's finishes and radii. */
const raisedIn = (finishes: Finishes, appearance: "light" | "dark", radius: string) => {
  const finish = finishes[appearance].raised;
  return { fill: finish.backgroundColor ?? "none", shadow: finish.boxShadow, radius };
};

test("selectTheme swaps a rendered button's fills to the neutral theme, and null brings them back", async () => {
  const app = await open("./theme-switch.fixture.tsx");
  await app.setColorScheme("light");
  const ink = app.spanStyle("text:Ink").color;

  const before = look(app.texts());
  expect(before.theme).toBe("build-time");
  expect(before).toMatchObject({ ...raisedIn(plain, "light", "7"), theme: "build-time" });

  await app.press("text:Shadcn");

  expect(look(app.texts())).toMatchObject({
    ...raisedIn(neutral, "light", "8"),
    theme: "shadcn",
  });
  // The tokens came with the finishes: the same text, another color.
  expect(app.spanStyle("text:Ink").color).not.toBe(ink);

  await app.press("text:Build-time");

  expect(app.texts().length).toBeGreaterThan(0);
  expect(look(app.texts())).toEqual(before);
  expect(app.spanStyle("text:Ink").color).toBe(ink);
});

test("an appearance change reaches both themes", async () => {
  const app = await open("./theme-switch.fixture.tsx");
  await app.setColorScheme("light");

  await app.press("text:Shadcn");
  expect(look(app.texts())).toMatchObject(raisedIn(neutral, "light", "8"));

  await app.setColorScheme("dark");
  expect(look(app.texts())).toMatchObject({
    ...raisedIn(neutral, "dark", "8"),
    theme: "shadcn",
    appearance: "dark",
  });

  await app.press("text:Build-time");
  expect(look(app.texts())).toMatchObject(raisedIn(plain, "dark", "7"));
});

test("a theme setTheme refuses throws and leaves the finishes as they were", async () => {
  const app = await open("./theme-switch.fixture.tsx");
  await app.setColorScheme("light");
  await app.press("text:Shadcn");
  const before = look(app.texts());

  await app.press("text:Broken");

  const texts = app.texts();
  expect(read(texts, "failure")).toBe("TypeError");
  expect(look(texts)).toEqual(before);
});
