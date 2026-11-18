// The reference of `separator.tsx`: the same page, the look spread on `nsh`'s own View instead of
// worn by the component. The render check requires the two to draw the same pixels.
import { mount, Text, View } from "nsh";

import { separatorLook } from "@/packages/ui/separator";

import { DemoCard, DemoPage, DemoSection } from "./kit";
import { ui } from "./stage";

const WORDS = ["Blog", "Docs", "Source"];

function App() {
  return (
    <DemoPage title="Separator">
      <Text style={{ color: ui().muted }}>
        {"One hairline, in the theme's edge color: across the content, or down a row."}
      </Text>

      <DemoCard>
        <DemoSection title="Horizontal" axis="block">
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", color: ui().text }}>
              Project settings
            </Text>
            <Text style={{ fontSize: 13, color: ui().muted }}>
              Who can see this project, and what they can change.
            </Text>
          </View>
          <View style={[separatorLook("horizontal"), { marginVertical: 12 }]} />
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", color: ui().text }}>Members</Text>
            <Text style={{ fontSize: 13, color: ui().muted }}>
              Invite people, and say what each of them may do.
            </Text>
          </View>
        </DemoSection>

        <DemoSection title="Vertical">
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, height: 20 }}>
            {WORDS.map((word, i) => (
              <>
                <Text style={{ fontSize: 13, color: ui().text }}>{word}</Text>
                {i < WORDS.length - 1 ? <View style={[separatorLook("vertical")]} /> : null}
              </>
            ))}
          </View>
        </DemoSection>

        <DemoSection title="Still read out" axis="block">
          <Text style={{ fontSize: 13, color: ui().muted }}>
            A decorative separator is a line of the layout, which a screen reader walks past. This
            one is not decorative: it is a boundary in the accessibility tree too.
          </Text>
          <View
            role="group"
            accessible
            accessibilityLabel="End of the separator examples"
            style={[separatorLook("horizontal"), { marginVertical: 4 }]}
          />
        </DemoSection>
      </DemoCard>
    </DemoPage>
  );
}

mount(App);
