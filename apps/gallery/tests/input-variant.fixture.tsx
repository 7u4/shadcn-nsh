import { mount, Text } from "nsh";

import { inputLook } from "../../../packages/ui";

// What the look draws, as words: the ghost field's fill and edge, the ring both keep, and the
// default field's fill and edge, so a test can hold the two apart. `—` is absent.
const said = (value: unknown) => (value === undefined || value === null ? "—" : String(value));
const ghost = inputLook({ variant: "ghost" });
const plain = inputLook();
const line = (name: string, look: ReturnType<typeof inputLook>) =>
  [
    `${name} fill=${look.style.backgroundColor === "transparent" ? "—" : "yes"}`,
    `edge=${look.class.includes("border-transparent") ? "—" : "yes"}`,
    `hover-edge=${look.class.includes("hover:border-") ? "yes" : "—"}`,
    `focus-edge=${look.class.includes("focus-within:border-brand") ? "yes" : "—"}`,
    `focus-ring=${look.class.includes("focus-within:outline-brand") ? "yes" : "—"}`,
    `stride=${said(look.style.borderWidth)}`,
  ].join(" ");

function App() {
  return (
    <>
      <Text>{line("ghost", ghost)}</Text>
      <Text>{line("default", plain)}</Text>
    </>
  );
}

mount(App);
