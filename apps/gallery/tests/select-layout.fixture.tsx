import type { Bounds, JSX, Signal } from "nsh";
import { mount, signal, Text, View } from "nsh";

import { Select, SelectContent, SelectItem, SelectTrigger } from "../../../packages/ui";

/** The rows are this wide; the spacers and the gaps take the rest. */
const ROW = 440;
const GAP = 8;

function App() {
  const stretched = signal(-1);
  const natural = signal(-1);
  const squeezed = signal(-1);
  /** A row's width, reported once the app laid it out (a signal set to the same number loops). */
  const watch = (width: Signal<number>) => (event: { bounds: Bounds }) => {
    const next = Math.round(event.bounds.size.width);
    if (next !== width()) width.set(next);
  };
  const row = (left: number, right: number, children: JSX.Element) => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: GAP, width: ROW }}>
      <View style={{ width: left }} />
      {children}
      <View style={{ width: right }} />
    </View>
  );
  /** The rows of a list: what each trigger opens (made inside its own `Select`). */
  const months = () => (
    <>
      <SelectItem value="01">01</SelectItem>
      <SelectItem value="02">02</SelectItem>
    </>
  );
  return (
    <View style={{ gap: 12 }}>
      {/* Room left of the trigger: 440 - 80 - 60 - 2 × 8 = 284. */}
      {row(
        80,
        60,
        <Select placeholder="MM">
          <SelectTrigger style={{ flex: 1 }} />
          <SelectContent accessibilityLabel="Stretched" onLayout={watch(stretched)}>
            {months()}
          </SelectContent>
        </Select>,
      )}
      {row(
        80,
        60,
        <Select placeholder="MM">
          <SelectTrigger />
          <SelectContent accessibilityLabel="Natural" onLayout={watch(natural)}>
            {months()}
          </SelectContent>
        </Select>,
      )}
      {/* Less room than the trigger's own least (180 with a pointer): 440 - 80 - 200 - 2 × 8 = 144. */}
      {row(
        80,
        200,
        <Select placeholder="MM">
          <SelectTrigger style={{ flex: 1, minWidth: 0 }} />
          <SelectContent accessibilityLabel="Squeezed" onLayout={watch(squeezed)}>
            {months()}
          </SelectContent>
        </Select>,
      )}
      <Text>{`stretched=${stretched()}`}</Text>
      <Text>{`natural=${natural()}`}</Text>
      <Text>{`squeezed=${squeezed()}`}</Text>
    </View>
  );
}

mount(App);
