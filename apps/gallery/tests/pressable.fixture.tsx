import { mount, signal, Text } from "nsh";

import { Pressable, pressableLook } from "../../../packages/ui";

// The look's own report, so a test can hold it to what a pressable is: no fill, no padding, no
// height, and the three pieces of feedback. `—` is absent.
const look = pressableLook();
const said = (value: unknown) => (value === undefined || value === null ? "—" : "yes");
const report = [
  `fill=${said(look.style.backgroundColor)}`,
  `padding=${said(look.style.padding)}`,
  `height=${said(look.style.height)}`,
  `hover=${said(look.hoverStyle?.backgroundColor)}`,
  `sink=${said(look.activeStyle?.transform)}`,
  `ring=${said(look.focusVisibleStyle.outlineWidth)}`,
].join(" ");

function App() {
  const presses = signal(0);
  return (
    <>
      {/* A string child names the region for screen readers, as a button's label does. */}
      <Pressable onPress={() => presses.set(presses() + 1)}>Retry</Pressable>
      <Text>{`pressed ${presses()}`}</Text>
      <Text>{report}</Text>
    </>
  );
}

mount(App);
