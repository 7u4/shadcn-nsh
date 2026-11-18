// The reference of `skeleton.tsx`: the same page, the look spread on `nsh`'s own View instead of
// worn by the component. The render check requires the two to draw the same pixels.
import { mount, View } from "nsh";

import { skeletonLook } from "@/packages/ui/skeleton";

import { DemoCard, DemoPage, DemoSection } from "./kit";

/**
 * A line of text that is still coming: as tall as the type it will hold, as wide as it runs, and
 * no wider than its column (a narrow phone's).
 */
const line = (width: number) => ({ width, maxWidth: "100%" as const, height: 14 });

function App() {
  return (
    <DemoPage title="Skeleton">
      <DemoCard>
        <DemoSection title="Profile" axis="block">
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <View style={[skeletonLook(), { width: 48, height: 48, borderRadius: 24 }]} />
            <View style={{ flexShrink: 1, minWidth: 0, gap: 8 }}>
              <View style={[skeletonLook(), line(250)]} />
              <View style={[skeletonLook(), line(200)]} />
            </View>
          </View>
        </DemoSection>

        <DemoSection title="List" axis="block">
          {[0, 1, 2].map(() => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View style={[skeletonLook(), { width: 32, height: 32, borderRadius: 16 }]} />
              <View style={{ flexGrow: 1, flexShrink: 1, minWidth: 0, gap: 6 }}>
                <View style={[skeletonLook(), line(160), { height: 12 }]} />
                <View style={[skeletonLook(), line(220)]} />
              </View>
            </View>
          ))}
        </DemoSection>

        <DemoSection title="Card" axis="block">
          <View style={{ gap: 10 }}>
            <View style={[skeletonLook(), { ...line(180), height: 16 }]} />
            <View style={[skeletonLook(), line(320)]} />
            <View style={[skeletonLook(), line(260)]} />
            <View style={{ flexDirection: "row", gap: 8 }}>
              <View style={[skeletonLook(), { width: 72, height: 28 }]} />
              <View style={[skeletonLook(), { width: 72, height: 28 }]} />
            </View>
          </View>
        </DemoSection>
      </DemoCard>
    </DemoPage>
  );
}

mount(App);
