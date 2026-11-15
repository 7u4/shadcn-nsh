// The reference of `label.tsx`: the same page, the look spread on `nsh`'s own View and Text
// instead of worn by the component. The render check requires the two to draw the same pixels.
import { mount, signal, Text, View } from "nsh";

import { Checkbox } from "@/packages/ui/checkbox";
import { labelLook } from "@/packages/ui/label";

import { DemoCard, DemoPage, DemoSection } from "./kit";
import { ui } from "./stage";

/** A label as the look draws it, worn by a plain view. */
function Labelled(props: { text: string; disabled?: boolean }) {
  return (
    <View style={labelLook({ disabled: props.disabled }).root}>
      <Text style={labelLook({ disabled: props.disabled }).text}>{props.text}</Text>
    </View>
  );
}

function App() {
  const terms = signal(true);
  const comments = signal(true);
  const mentions = signal(false);
  return (
    <DemoPage title="Label">
      <Text style={{ color: ui().muted }}>
        {"The visible name of a control: it names nothing for a screen reader by itself."}
      </Text>

      <DemoCard>
        <DemoSection title="Beside a choice">
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Checkbox
              accessibilityLabel="Accept terms and conditions"
              checked={terms()}
              onChange={({ checked }) => terms.set(checked)}
            />
            <Labelled text="Accept terms and conditions" />
          </View>
        </DemoSection>

        <DemoSection title="Over a group" axis="block">
          <View style={{ gap: 10 }}>
            <Labelled text="Notify me about" />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Checkbox
                accessibilityLabel="Comments"
                checked={comments()}
                onChange={({ checked }) => comments.set(checked)}
              />
              <Labelled text="Comments on my posts" />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Checkbox
                accessibilityLabel="Mentions"
                checked={mentions()}
                onChange={({ checked }) => mentions.set(checked)}
              />
              <Labelled text="Mentions of my name" />
            </View>
          </View>
        </DemoSection>

        <DemoSection title="With the control off" axis="block">
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Checkbox disabled accessibilityLabel="Weekly digest" />
            <Labelled text="Weekly digest" disabled />
          </View>
          <Text style={{ fontSize: 12, color: ui().muted }}>
            A disabled label dims to half, as it does in shadcn where a disabled peer dims it: set
            `disabled` on both, since nsh has no sibling selector to read the control's state.
          </Text>
        </DemoSection>
      </DemoCard>
    </DemoPage>
  );
}

mount(App);
