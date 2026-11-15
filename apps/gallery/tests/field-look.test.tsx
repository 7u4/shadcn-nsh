import { expect, open, test } from "nsh/test";

/** A field's label kept in a `const` takes the scheme's text color, after a switch as before it. */
test("a stored field look's labels follow the scheme", async () => {
  const app = await open("./field-look.fixture.tsx", { colorScheme: "light" });
  await app.waitFor("text:Title");
  const seen: string[] = [];
  for (const scheme of ["light", "dark"] as const) {
    await app.setColorScheme(scheme);
    await app.wait(50);
    const ink = app
      .texts()
      .find((t) => t.startsWith("ink:"))
      ?.slice(4);
    expect(app.spanStyle("text:Title").color).toBe(ink);
    expect(app.spanStyle("text:In a row").color).toBe(ink);
    seen.push(String(ink));
  }
  expect(seen[0]).not.toBe(seen[1]);
});
