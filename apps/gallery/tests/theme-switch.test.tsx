import { expect, open, test } from "nsh/test";

import plainFinishes from "../../../packages/theme/finishes.json";
import neutralFinishes from "../../../packages/theme/themes/shadcn/finishes.json";

type Finish = {
  backgroundColor?: string;
  backgroundImage?: string;
  boxShadow: string;
  borderColor?: string;
};
type Finishes = {
  press: { scale: number };
  light: Record<string, Finish>;
  dark: Record<string, Finish>;
};

const plain = plainFinishes as Finishes;
const neutral = neutralFinishes as Finishes;

/** What the probe page rendered, by the `key:value` line each reading is. */
type Look = {
  fill: string;
  shadow: string;
  radius: string;
  sink: string;
  run: string;
  rail: string;
  theme: string;
  appearance: string;
};

const read = (texts: string[], key: string) =>
  texts.find((text) => text.startsWith(`${key}:`))?.slice(key.length + 1) ?? "";

const look = (texts: string[]): Look => ({
  fill: read(texts, "fill"),
  shadow: read(texts, "shadow"),
  radius: read(texts, "radius"),
  sink: read(texts, "sink"),
  run: read(texts, "run"),
  rail: read(texts, "rail"),
  theme: read(texts, "theme"),
  appearance: read(texts, "appearance"),
});

/** A raised button's fill, its shadow, its corners and how far it sinks, from a theme's finishes
 * and radii. A theme whose `press.scale` is 1 draws no press: a control asked to sink as ever
 * stands still. */
const raisedIn = (finishes: Finishes, appearance: "light" | "dark", radius: string) => {
  const finish = finishes[appearance].raised;
  return {
    fill: finish.backgroundColor ?? "none",
    shadow: finish.boxShadow,
    radius,
    sink: finishes.press.scale >= 1 ? "1" : "0.97",
  };
};

/** A slider's run and its rail: the fill's color with its gradient (or the color alone), and the
 * rail's 1-point edge joined to its shade — where the theme gives one. */
const runIn = (finishes: Finishes, appearance: "light" | "dark") => {
  const fill = finishes[appearance].fill;
  return {
    run: `${fill.backgroundColor ?? "none"}|${fill.backgroundImage ? "gradient" : "color"}`,
  };
};

const railIn = (finishes: Finishes, appearance: "light" | "dark") => {
  const track = finishes[appearance].track;
  const edge = `inset 0 0 0 1px ${track.borderColor}`;
  return { rail: track.boxShadow === "none" ? edge : `${edge}, ${track.boxShadow}` };
};

test("selectTheme swaps a rendered button's fills to the neutral theme, and null brings them back", async () => {
  const app = await open("./theme-switch.fixture.tsx");
  await app.setColorScheme("light");
  const ink = app.spanStyle("text:Ink").color;

  const before = look(app.texts());
  expect(before.theme).toBe("build-time");
  expect(before).toMatchObject({
    ...raisedIn(plain, "light", "7"),
    ...runIn(plain, "light"),
    ...railIn(plain, "light"),
    theme: "build-time",
  });
  // The build-time fill is a gradient; the neutral theme's runs are one color, which the fill
  // reads (`finishes.test`'s twin: `themes/shadcn/finishes.json` gives no gradient).
  expect(before.run.endsWith("|gradient")).toBe(true);

  await app.press("text:Shadcn");

  const after = look(app.texts());
  expect(after).toMatchObject({
    ...raisedIn(neutral, "light", "8"),
    ...runIn(neutral, "light"),
    ...railIn(neutral, "light"),
    theme: "shadcn",
  });
  expect(after.run.endsWith("|color")).toBe(true);
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
    ...runIn(neutral, "dark"),
    ...railIn(neutral, "dark"),
    theme: "shadcn",
    appearance: "dark",
  });

  await app.press("text:Build-time");
  expect(look(app.texts())).toMatchObject({
    ...raisedIn(plain, "dark", "7"),
    ...runIn(plain, "dark"),
    ...railIn(plain, "dark"),
  });
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
