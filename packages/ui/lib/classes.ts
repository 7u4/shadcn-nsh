// How a component's default part classes meet an app's `classes`, and how a shell puts one more
// class after a part's own. Owned by this library: the shells that dress a `nsh/base` control in
// part classes share these rules rather than writing them out again in each.

/**
 * `consumer` over `base`, part by part: a string goes after ours, `null` drops ours, and a part it
 * leaves out (or `undefined`) keeps ours.
 */
export function mergeClasses<C extends { [K in keyof C]?: string | null }>(
  base: C,
  consumer?: C | null,
): C {
  if (consumer == null) return base;
  const merged: C = { ...base };
  for (const key of Object.keys(consumer) as (keyof C)[]) {
    const next = consumer[key];
    if (next === undefined) continue;
    if (next === null) {
      delete merged[key];
      continue;
    }
    const prior = merged[key];
    merged[key] = (prior ? `${prior} ${next}` : next) as C[keyof C]; // `next` is the string the type allows
  }
  return merged;
}

/**
 * `base`'s classes with `extra`'s after them: no `extra` keeps `base` as it is, and a `base` that
 * is absent leaves `extra` alone (a part with no default class of its own).
 */
export function joinClass(base: string, extra?: string | null): string;
export function joinClass(
  base: string | null | undefined,
  extra?: string | null,
): string | undefined;
export function joinClass(
  base: string | null | undefined,
  extra?: string | null,
): string | undefined {
  const prior = base ?? undefined;
  const next = extra ?? undefined;
  if (prior && next) return `${prior} ${next}`;
  return next ?? prior;
}
