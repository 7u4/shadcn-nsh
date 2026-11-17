import { describe, expect, test } from "bun:test";

import { readColour } from "./finish-colour";

/**
 * The rules of `docs/specs/theme-roles.md` §5 and §7, asked the other way round: what a finish may
 * write, and what is said when it writes something else. The other direction (every theme passes)
 * is `bun run check:theme`; these are the values that must not pass.
 */
const known = new Set(["card", "border"]);
const pending = new Set(["default light oklch(0.5 0 0)", "default light oklch(0.4 0 0)"]);

const judge = (value: string, key = "default light") => readColour(value, known, pending, key);

describe("a finish's colour field", () => {
  test("a token, ink and transparent are what the theme states", () => {
    expect(judge("var(--card)")).toEqual({ problems: [], pending: [] });
    expect(judge("oklch(1 0 0 / 6%)")).toEqual({ problems: [], pending: [] });
    expect(judge("transparent")).toEqual({ problems: [], pending: [] });
  });

  test("a token at another alpha is the one relative colour it may write", () => {
    expect(judge("oklch(from var(--card) l c h / 0.78)")).toEqual({ problems: [], pending: [] });
    expect(judge("oklch(from var(--border) l c h / 1)")).toEqual({ problems: [], pending: [] });
  });

  test("a relative colour names a token the theme has, or says which one it wanted", () => {
    expect(judge("oklch(from var(--glass-edge) l c h / 0.5)").problems).toEqual([
      { kind: "unknown-token", name: "glass-edge" },
    ]);
  });

  test("every other relative colour is still a colour with no token", () => {
    for (const value of [
      "oklch(from var(--card) l c h)",
      "oklch(from var(--card) l c h / var(--scrim))",
      "oklch(from var(--card) calc(l + 0.1) c h / 0.5)",
    ])
      expect(judge(value).problems.map((problem) => problem.kind)).toContain("literal");
  });

  test("a literal the spec still lists is a row, not a problem", () => {
    expect(judge("oklch(0.5 0 0)")).toEqual({
      problems: [],
      pending: ["default light oklch(0.5 0 0)"],
    });
  });

  test("a gradient writes its stops, and fills the row of each", () => {
    expect(judge("linear-gradient(180deg, oklch(0.5 0 0) 0%, oklch(0.4 0 0) 100%)")).toEqual({
      problems: [],
      pending: ["default light oklch(0.5 0 0)", "default light oklch(0.4 0 0)"],
    });
  });

  test("a literal the spec does not list is a problem; a token it does not have, another", () => {
    expect(judge("oklch(0.5 0.1 200)").problems).toEqual([
      { kind: "literal", literal: "oklch(0.5 0.1 200)" },
    ]);
    expect(judge("var(--nope)").problems).toEqual([{ kind: "unknown-token", name: "nope" }]);
  });
});
