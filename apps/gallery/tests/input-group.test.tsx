import { expect, open, test } from "nsh/test";

test("a group draws the frame and the control in it draws nothing", async () => {
  const app = await open("./input-group.fixture.tsx");
  const [frame, inside] = app
    .texts()
    .filter((text) => text.startsWith("frame ") || text.startsWith("inside "));
  // The group's edge, its focus edge and ring (for a control in it that has the keys), and the
  // radius the caller gave it: the ring is drawn on the frame, so it follows that radius.
  expect(frame).toBe("frame edge=yes focus-edge=yes focus-ring=yes radius=22");
  // The control: no fill, no edge, no ring; it takes the room the addons leave.
  expect(inside).toBe("inside fill=— edge=— ring=— takes-the-room-left=yes");
  expect(app.texts()).toContain("disabled-edge=flat");
  expect(app.texts()).toContain("resting-edge=rest");
});

test("a press on an addon puts the keys in the control", async () => {
  const app = await open("./input-group.fixture.tsx");
  await app.press("text:Q");
  // Nothing else could take the character (the keys are in the group's input).
  await app.keyboard.press("h");
  await app.waitFor("text:value=h");
});

test("the control in a group takes text, and a button beside it clears it", async () => {
  const app = await open("./input-group.fixture.tsx");
  await app.type("id:search", "hel");
  await app.waitFor("text:value=hel");
  await app.press("id:clear");
  await app.waitFor("text:value=—");
});

test("a ref on a group's control focuses it from code", async () => {
  const app = await open("./input-group.fixture.tsx");
  await app.press("id:find");
  await app.keyboard.press("k");
  await app.waitFor("text:value=k");
  await app.press("id:compose");
  await app.keyboard.press("d");
  await app.waitFor("text:draft=d");
});
