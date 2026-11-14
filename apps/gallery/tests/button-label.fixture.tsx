import { mount, signal, Text } from "nsh";

import { Button } from "../../../packages/ui";

function App() {
  const presses = signal(0);
  return (
    <>
      {/* A string child is a text label: the button's accessibility name comes from it. */}
      <Button onPress={() => presses.set(presses() + 1)}>Retry</Button>
      {/* Anything else is drawn as given: no name is derived. */}
      <Button onPress={() => presses.set(presses() + 1)}>
        <Text>Drawn as given</Text>
      </Button>
      <Text>{`pressed ${presses()}`}</Text>
    </>
  );
}

mount(App);
