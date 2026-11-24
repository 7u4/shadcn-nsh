var e=`// The reference of \`aspect-ratio.tsx\`: the same page, the look spread on \`nsh\`'s own View instead
// of worn by the component. The render check requires the two to draw the same pixels.
import { mount, Text, View } from "nsh";

import { aspectRatioLook } from "@/packages/ui/aspect-ratio";
import { insetSurface } from "@/packages/ui/lib/surface";

import { DemoCard, DemoPage, DemoSection } from "./kit";
import { ui } from "./stage";

/** What fills a ratio box in this page: one block, its label centered. */
function Block(props: { label: string }) {
  return (
    <View style={[insetSurface(), { flex: 1, alignItems: "center", justifyContent: "center" }]}>
      <Text style={{ fontSize: 13, color: ui().muted }}>{props.label}</Text>
    </View>
  );
}

function App() {
  return (
    <DemoPage title="Aspect ratio">
      <Text style={{ color: ui().muted }}>
        {"A box as wide as its column, as tall as its ratio says: pictures keep their shape."}
      </Text>

      <DemoCard>
        <DemoSection title="16 / 9" axis="block">
          <View style={[aspectRatioLook(16 / 9)]}>
            <Block label="16 / 9" />
          </View>
        </DemoSection>

        <DemoSection title="1 / 1" axis="block">
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={[aspectRatioLook(1), { width: 72 }]}>
              <Block label="1 / 1" />
            </View>
            <View style={{ flexShrink: 1, gap: 4 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: ui().text }}>Team photo</Text>
              <Text style={{ fontSize: 13, color: ui().muted }}>
                A square as wide as its own 72 points, not as wide as the column.
              </Text>
            </View>
          </View>
        </DemoSection>

        <DemoSection title="A cover in a card" axis="block">
          <View style={{ gap: 6 }}>
            <View style={[aspectRatioLook(16 / 9)]}>
              <Block label="Weekly review" />
            </View>
            <Text style={{ fontSize: 14, fontWeight: "500", color: ui().text }}>Weekly review</Text>
            <Text style={{ fontSize: 13, color: ui().muted }}>
              The cover keeps the card's shape whatever the window does.
            </Text>
          </View>
        </DemoSection>
      </DemoCard>
    </DemoPage>
  );
}

mount(App);
`;export{e as default};