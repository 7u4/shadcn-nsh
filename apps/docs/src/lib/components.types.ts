/** One component with a docs page. @see components.generated.ts */
import type { ComponentKindId } from "./kinds";

export type ComponentDoc = {
  /** The registry item's name, which is the page's file name. */
  slug: string;
  title: string;
  /** The kind it is grouped under, derived in `kinds.ts` from the rows in `official.ts`. */
  kind: ComponentKindId;
  /** The shadcn/ui page it stands in for, when one does (a rename, e.g. menu). */
  shadcn: string | null;
  /** Path under https://nsh.dev/elements/; null for a piece with no nsh/base element. */
  nshElement: string | null;
  description: string;
};
