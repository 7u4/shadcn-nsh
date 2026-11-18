// A value a look takes as it is, or as a function reading it where the look is applied.
// Owned by this library: every look that takes a value takes it this way, rather than each
// component writing the pair out again.

/**
 * A value, or a function reading it where the look is applied (a signal): read at draw time, a
 * signal's value stays live.
 */
export type Live<T> = T | (() => T);

/** `v`, read where it is applied: the value itself, or what its accessor returns then. */
export const read = <T>(v: Live<T> | undefined): T | undefined =>
  typeof v === "function" ? (v as () => T)() : v;
