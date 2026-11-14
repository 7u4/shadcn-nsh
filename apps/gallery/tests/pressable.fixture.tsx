import { mount, signal, Text } from "nsh";

import { Pressable } from "../../../packages/ui";

function App() {
  const presses = signal(0);
  return (
    <>
      {/* A string child names the region for screen readers, as a button's label does. */}
      <Pressable onPress={() => presses.set(presses() + 1)}>Retry</Pressable>
      <Text>{`pressed ${presses()}`}</Text>
    </>
  );
}

mount(App);
