var e=`// The reference of \`alert.tsx\`: the same page, the look spread on \`nsh\`'s own View and Text
// instead of worn by the parts. The render check requires the two to draw the same pixels.
import { AlertCircle, CheckCircle2 } from "lucide";
import { mount, Text, View } from "nsh";

import { ALERT_ICON, alertLook } from "@/packages/ui/alert";
import { Icon } from "@/packages/ui/lib/icons";

import { DemoCard, DemoPage, DemoSection } from "./kit";
import { ui } from "./stage";

/** The notice's surface, as the look draws it. */
function Frame(props: { variant?: "default" | "destructive"; children: unknown }) {
  const variant = props.variant ?? "default";
  return (
    <View role="alert" style={[alertLook().root()]}>
      {props.children as never}
    </View>
  );
}

function App() {
  return (
    <DemoPage title="Alert">
      <Text style={{ color: ui().muted }}>
        {"A notice of the whole page or form, read out when it appears."}
      </Text>

      <DemoCard>
        <DemoSection title="Default" axis="block">
          <Frame>
            <Icon icon={CheckCircle2} size={ALERT_ICON} tint={ui().text} />
            <Text style={[alertLook().title("default")]}>Changes saved</Text>
            <View style={[alertLook().descriptionFrame()]}>
              <Text style={[alertLook().descriptionText("default")]}>
                Your changes have been saved.
              </Text>
            </View>
          </Frame>

          <Frame>
            <Icon icon={CheckCircle2} size={ALERT_ICON} tint={ui().text} />
            <Text style={[alertLook().title("default")]}>
              A title and an icon, and no note at all.
            </Text>
          </Frame>
        </DemoSection>

        <DemoSection title="Destructive" axis="block">
          <Frame variant="destructive">
            <Icon icon={AlertCircle} size={ALERT_ICON} tint={ui().danger} />
            <Text style={[alertLook().title("destructive")]}>Unable to process your payment.</Text>
            <View style={[alertLook().descriptionFrame()]}>
              <Text style={[alertLook().descriptionText("destructive")]}>
                Please verify your billing information and try again.
              </Text>
            </View>
          </Frame>
          <Frame variant="destructive">
            <Icon icon={AlertCircle} size={ALERT_ICON} tint={ui().danger} />
            <View style={[alertLook().descriptionFrame()]}>
              <Text style={[alertLook().descriptionText("destructive")]}>
                The connection was lost before the reply finished. Check the network and try again.
              </Text>
            </View>
          </Frame>
        </DemoSection>

        <DemoSection title="A note of the app's own" axis="block">
          <Frame>
            <Icon icon={AlertCircle} size={ALERT_ICON} tint={ui().text} />
            <Text style={[alertLook().title("default")]}>Three checks failed</Text>
            <View style={[alertLook().descriptionFrame()]}>
              <View style={{ gap: 4 }}>
                {["The card's number is not valid", "The card has expired"].map((line) => (
                  <Text style={{ fontSize: 13, color: ui().muted }}>{\`· \${line}\`}</Text>
                ))}
              </View>
            </View>
          </Frame>
        </DemoSection>
      </DemoCard>
    </DemoPage>
  );
}

mount(App);
`;export{e as default};