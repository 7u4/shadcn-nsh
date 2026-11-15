import { mount, signal, Text } from "nsh";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  inputGroupControlLook,
  inputGroupLook,
  InputGroupText,
} from "../../../packages/ui";

// The group's look and the control's, as words a test can hold apart: the group draws the edge
// at rest, the focus edge and the ring while a control in it has the keys, and the radius the
// caller gives it; the control draws no fill, no edge and no ring of its own. `—` is absent.
const group = inputGroupLook({ style: { borderRadius: 22 } });
const control = inputGroupControlLook();
const said = (value: string | number | undefined) =>
  value === undefined || value === null ? "—" : `${value}`;
const frame = [
  `edge=${group.class.includes("border-input") ? "yes" : "—"}`,
  `focus-edge=${group.class.includes("focus-within:border-brand") ? "yes" : "—"}`,
  `focus-ring=${group.class.includes("focus-within:outline-brand") ? "yes" : "—"}`,
  `radius=${said(group.style.borderRadius)}`,
].join(" ");
const inside = [
  `fill=${control.style.backgroundColor === "transparent" ? "—" : "yes"}`,
  `edge=${said(control.style.borderWidth)}`,
  `ring=${said(control.style.outlineWidth)}`,
  `takes-the-room-left=${control.style.flex === 1 ? "yes" : "—"}`,
].join(" ");

// A group with a control that is off: flat on the quieter edge.
const off = inputGroupLook({ disabled: true });
const resting = inputGroupLook();

function App() {
  const query = signal("");
  return (
    <>
      <InputGroup style={{ borderRadius: 22 }}>
        <InputGroupAddon align="inline-start">
          <InputGroupText>Q</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          testID="search"
          value={query()}
          onChange={({ value }) => query.set(value)}
          placeholder="Search"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            testID="clear"
            size="icon-xs"
            accessibilityLabel="Clear"
            onPress={() => query.set("")}
          >
            <Text>x</Text>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <Text>{`frame ${frame}`}</Text>
      <Text>{`inside ${inside}`}</Text>
      <Text>{`value=${query() || "—"}`}</Text>
      <Text>{`disabled-edge=${off.class.includes("border-line") ? "flat" : "rest"}`}</Text>
      <Text>{`resting-edge=${resting.class.includes("border-input") ? "rest" : "flat"}`}</Text>
    </>
  );
}

mount(App);
