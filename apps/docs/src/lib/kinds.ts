/**
 * The components' two kinds: whether a component is aligned with an official component or is this
 * library's own. The sidebar, the components index and the coverage page group the set by these,
 * one kind per component, in this order.
 *
 * A component is not filed by hand: `src/lib/official.ts` says which official components each page
 * answers for, and a page listed by any row there is aligned; one listed by no row is ours. Adding
 * a component therefore means registering it in `official.ts` (or in neither table, when it answers
 * for nothing official) and its kind follows. `bun run check:pages` checks the generated list.
 */
import { NSH_ELEMENTS, SHADCN_UI } from "./official";

export type ComponentKindId = "official" | "own";

/** What a kind is called in the sidebar, on the index and on the coverage page. */
export const KIND_LABELS: Record<ComponentKindId, string> = {
  official: "Official",
  own: "Our own",
};

/** The kinds, in the order they are listed everywhere. */
export const KINDS: readonly ComponentKindId[] = ["official", "own"];

/**
 * Every page an official row serves. The rows are the one place a page is registered, so this set
 * is derived once here rather than written down again.
 */
const ALIGNED: ReadonlySet<string> = new Set(
  [...SHADCN_UI, ...NSH_ELEMENTS].flatMap((entry) => entry.ours),
);

/** The kind of a page: aligned with an official component, or our own. */
export function kindOf(slug: string): ComponentKindId {
  return ALIGNED.has(slug) ? "official" : "own";
}
