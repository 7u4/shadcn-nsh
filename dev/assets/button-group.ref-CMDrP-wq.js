var e=`// The reference of \`button-group.tsx\`: the same page, the look spread on \`nsh\`'s own View and Text
// instead of worn by the parts. The render check requires the two to draw the same pixels.
import { ArrowLeft, ArrowRight } from "lucide";
import { mount, Text, View } from "nsh";

import { Button, buttonLabel } from "@/packages/ui/button";
import { buttonGroupLook } from "@/packages/ui/button-group";
import { Icon } from "@/packages/ui/lib/icons";
import { Separator } from "@/packages/ui/separator";

import { DemoCard, DemoPage, DemoSection } from "./kit";
import { ui } from "./stage";

function App() {
  return (
    <DemoPage title="Button group">
      <Text style={{ color: ui().muted }}>
        {"Buttons joined into one control, in a row or a column."}
      </Text>

      <DemoCard>
        <DemoSection title="A row">
          <View role="group" style={[buttonGroupLook().root("horizontal")]}>
            <Button variant="secondary" style={[buttonGroupLook().item("horizontal", "first")]}>
              <Icon icon={ArrowLeft} size={14} tint={ui().text} />
              <Text style={buttonLabel("secondary")}>Back</Text>
            </Button>
            <Button variant="secondary" style={[buttonGroupLook().item("horizontal", "middle")]}>
              <Text style={buttonLabel("secondary")}>Archive</Text>
            </Button>
            <Button variant="secondary" style={[buttonGroupLook().item("horizontal", "last")]}>
              <Text style={buttonLabel("secondary")}>Next</Text>
              <Icon icon={ArrowRight} size={14} tint={ui().text} />
            </Button>
          </View>
        </DemoSection>

        <DemoSection title="A column">
          <View role="group" style={[buttonGroupLook().root("vertical")]}>
            <Button variant="secondary" style={[buttonGroupLook().item("vertical", "first")]}>
              <Text style={buttonLabel("secondary")}>Copy the path</Text>
            </Button>
            <Button variant="secondary" style={[buttonGroupLook().item("vertical", "middle")]}>
              <Text style={buttonLabel("secondary")}>Open in a new window</Text>
            </Button>
            <Button variant="secondary" style={[buttonGroupLook().item("vertical", "last")]}>
              <Text style={buttonLabel("secondary")}>Reveal in the file manager</Text>
            </Button>
          </View>
        </DemoSection>

        <DemoSection title="A word and a divider">
          <View role="group" style={[buttonGroupLook().root("horizontal")]}>
            <View
              style={[buttonGroupLook().textFrame(), buttonGroupLook().item("horizontal", "first")]}
            >
              <Text style={[buttonGroupLook().text()]}>Path</Text>
            </View>
            <Separator orientation="vertical" />
            <Button variant="secondary" style={[buttonGroupLook().item("horizontal", "last")]}>
              <Text style={buttonLabel("secondary")}>Copy</Text>
            </Button>
          </View>
        </DemoSection>
      </DemoCard>
    </DemoPage>
  );
}

mount(App);
`;export{e as default};