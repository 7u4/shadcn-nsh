// The reference of `kbd.tsx`: the same page, the look spread on `nsh`'s own View and Text instead
// of worn by the components. The render check requires the two to draw the same pixels.
import { mount, Text, View } from "nsh";

import { buttonLabel, Button } from "@/packages/ui/button";
import { kbdLook } from "@/packages/ui/kbd";

import { DemoCard, DemoPage, DemoSection } from "./kit";
import { ui } from "./stage";

/** A cap as the look draws it, worn by a plain view. */
function Cap(props: { children: string }) {
  return (
    <View style={kbdLook().kbd}>
      <Text style={kbdLook().text}>{props.children}</Text>
    </View>
  );
}

function Caps(props: { keys: string[] }) {
  return (
    <View style={kbdLook().group}>
      {props.keys.map((key) => (
        <Cap>{key}</Cap>
      ))}
    </View>
  );
}

function App() {
  return (
    <DemoPage title="Kbd">
      <Text style={{ color: ui().muted }}>
        {"A cap for the key a shortcut takes: small type, the muted fill, a hairline edge."}
      </Text>

      <DemoCard>
        <DemoSection title="Modifiers">
          <Caps keys={["⌘", "⇧", "⌥", "⌃"]} />
        </DemoSection>

        <DemoSection title="In a sentence" axis="block">
          <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
            <Text style={{ fontSize: 13, color: ui().muted }}>Press</Text>
            <Caps keys={["Ctrl", "B"]} />
            <Text style={{ fontSize: 13, color: ui().muted }}>to open the sidebar, and</Text>
            <Caps keys={["Ctrl", "K"]} />
            <Text style={{ fontSize: 13, color: ui().muted }}>for the command palette.</Text>
          </View>
        </DemoSection>

        <DemoSection title="Beside a label">
          <Button variant="secondary">
            <Text style={buttonLabel("secondary")}>Search</Text>
            <Caps keys={["⌘", "K"]} />
          </Button>
        </DemoSection>
      </DemoCard>
    </DemoPage>
  );
}

mount(App);
