// A toggle group: `nsh/base`'s ToggleGroup in the inset track of `toolbarTrack`.
// The track look lives in `toolbar.tsx` (from look/tool.ts); this file is the shell only.
import type { ViewStyle } from "nsh";
import { split } from "nsh";
import {
  ToggleGroup as BaseToggleGroup,
  type ToggleGroupProps as BaseToggleGroupProps,
} from "nsh/base";

import { toolbarTrack } from "./toolbar";

/**
 * `nsh/base`'s ToggleGroup. Every base prop passes through; `style` goes over the look's.
 * Put `Toggle`s inside; they keep their own look. Default `inset` wears `toolbarTrack`; set
 * `inset={false}` inside a `Toolbar` that already has the track.
 */
export type ToggleGroupProps = BaseToggleGroupProps & {
  /** A column of toggles (default a row). */
  vertical?: boolean;
  /** Default true: the inset track. False inside a Toolbar that already has the track. */
  inset?: boolean;
};

/** Tools in a row (or column), matching `toolbarTrack`'s gap when not inset. */
function groupChrome(vertical?: boolean): ViewStyle {
  return {
    flexDirection: vertical ? "column" : "row",
    alignItems: "center",
    gap: 2,
  };
}

/**
 * The track holding a row (or column) of toggles. The look is read where the style is applied,
 * not held in a variable: `toolbarTrack` reads the theme's colors and radius there (tokens are
 * values, so a look built once in the body would keep the build-time ones when the app switches
 * theme).
 */
export function ToggleGroup(props: ToggleGroupProps) {
  const [, rest] = split(props, ["style", "vertical", "inset"]);
  return (
    <BaseToggleGroup
      {...rest}
      style={[
        props.inset === false
          ? groupChrome(props.vertical)
          : toolbarTrack({ vertical: props.vertical }),
        props.style ?? null,
      ]}
    />
  );
}

export { Toggle, type ToggleProps, type ToggleSize } from "./toggle";
