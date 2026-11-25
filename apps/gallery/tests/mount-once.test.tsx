import { expect, open, test } from "nsh/test";

test("a part that spreads its view props mounts its children once", async () => {
  const app = await open("./mount-once.fixture.tsx");
  await app.wait(100);
  expect(app.texts()).toContain("header mounts 1");
  expect(app.texts()).toContain("empty mounts 1");
});
