/**
 * The key order a generated theme file is written in: the default theme's, so the two diff side by
 * side and a key that drifts is a new line rather than a moved one. Both generators write through
 * here (`generate-shadcn.ts`, `generate-solid-glass.ts`), and both refuse to write a file that
 * leaves a key out (`themes.test.ts` holds every theme to the default's key set).
 */

/**
 * A section's value for every key of the default section, in the default's order. A section
 * declares every key: one the default file has and the theme does not is an error, not a blank.
 */
export const ordered = <T>(
  keys: Record<string, string>,
  values: Record<string, T>,
): Record<string, T> =>
  Object.fromEntries(
    Object.keys(keys).map((key) => {
      const value = values[key];
      if (value === undefined) throw new Error(`no value for theme key ${key}`);
      return [key, value];
    }),
  );

/**
 * A finish role's value in the default file's key order, leaving out what the theme does not
 * state: a role says only what it means (a theme whose `fill` is one color gives no gradient). A
 * key the default file does not have follows, alone: `fill`'s `backgroundColor`.
 */
export const orderedFinish = (
  keys: Record<string, unknown>,
  values: Record<string, unknown>,
): Record<string, unknown> => {
  const order = [
    ...Object.keys(keys),
    ...Object.keys(values)
      .filter((key) => !(key in keys))
      .sort(),
  ];
  return Object.fromEntries(
    order.flatMap((key) => {
      const value = values[key];
      return value === undefined ? [] : [[key, value]];
    }),
  );
};
