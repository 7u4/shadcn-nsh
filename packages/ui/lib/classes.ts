// How a component's default part classes meet an app's `classes`. Owned by this library: the
// shells that dress a `nsh/base` control in part classes share one rule rather than writing it out
// again in each.

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
    merged[key] = (prior ? `${prior} ${next}` : next) as C[keyof C];
  }
  return merged;
}
