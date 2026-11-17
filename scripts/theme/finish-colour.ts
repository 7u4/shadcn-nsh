/**
 * What colour a finish may write, and what is wrong with the one it did.
 *
 * A finish's colour field is one of: a token (`var(--x)`, which `theme.ts` resolves when it is
 * read), ink (`oklch(0 0 0 / a)`, `oklch(1 0 0 / a)`), `transparent`, a token's colour at another
 * alpha (`oklch(from var(--x) l c h / a)` — the one relative colour, since NSH's parser reads no
 * relative syntax and `theme.ts` writes the channels out), or a literal the spec's pending table
 * still lists. The rules are `docs/specs/theme-roles.md` §5 and §7.
 *
 * `theme-lint` asks this module about every finish of every theme; the tests ask it the same
 * questions the other way round, with a value that should fail.
 */
import { parseColor, rgbToOklch } from "./oklch";

/** The fields of a finish that hold a colour: `boxShadow` is ink, and exempt (§2). */
export const colourFields = ["backgroundColor", "backgroundImage", "borderColor"] as const;

/** One field's colour, and what the spec says about it. */
export type ColourProblem =
  /** A `var()` naming a token the theme does not have (in a relative colour or anywhere else). */
  | { kind: "unknown-token"; name: string }
  /** A colour that is no token, no ink, and not in the pending table. */
  | { kind: "literal"; literal: string };

/** A field's verdict: what is wrong with it, and the pending row it fills if it fills one. */
export interface ColourVerdict {
  problems: ColourProblem[];
  /** The pending rows this value fills (`"default light oklch(…)"`), as the spec lists them. */
  pending: string[];
}

/** The colours a value writes out, as text: a function call (one nesting deep, for `from var(--x)`)
 * or a hex. */
export function literals(value: string): string[] {
  return (
    value.match(
      /(?:oklch|oklab|rgba?|hsla?|lab|lch)\((?:[^()]|\([^()]*\))*\)|#[0-9a-fA-F]{3,8}(?![0-9a-zA-Z])/g,
    ) ?? []
  );
}

/** Whether a colour literal is ink: white or black, at any alpha. */
export function isInk(literal: string): boolean {
  try {
    const { l, c } = rgbToOklch(parseColor(literal));
    return c < 0.001 && (l > 0.99 || l < 0.01);
  } catch {
    return false;
  }
}

/** The one relative colour a finish may write: a token's colour at another alpha, whole
 * (`oklch(from var(--card) l c h / 0.78)`). Any other relative form is a colour with no token. */
export const relativeColour = /^oklch\(from var\(--([A-Za-z0-9-]+)\) l c h \/ ([\d.]+)\)$/;

/**
 * Judge one colour field: `known` are the theme's tokens, `pending` the spec's table, `key` the
 * row's prefix (`"<theme> <appearance>"`). A value the table lists is a row, not a problem (a
 * gradient writes two) — and a problem only says what is wrong, so the caller writes it in its own
 * words.
 */
export function readColour(
  value: string,
  known: Set<string>,
  pending: Set<string>,
  key: string,
): ColourVerdict {
  const relative = relativeColour.exec(value);
  if (relative !== null)
    return known.has(relative[1]!)
      ? { problems: [], pending: [] }
      : { problems: [{ kind: "unknown-token", name: relative[1]! }], pending: [] };

  const problems: ColourProblem[] = [];
  const rows: string[] = [];
  for (const literal of literals(value)) {
    if (isInk(literal)) continue;
    const entry = `${key} ${literal}`;
    if (pending.has(entry)) {
      rows.push(entry);
      continue;
    }
    problems.push({ kind: "literal", literal });
  }
  for (const [, name] of value.matchAll(/var\(--([A-Za-z0-9-]+)\)/g))
    if (!known.has(name!)) problems.push({ kind: "unknown-token", name: name! });
  return { problems, pending: rows };
}
