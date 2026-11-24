var e=`// shadcn's button-group scenes with this library's parts: a row of three buttons joined into one
// control, a column of them, and a word with a divider between two buttons.
import { ArrowLeft, ArrowRight } from "lucide";
import { mount, Text, View } from "nsh";

import { Button, buttonLabel } from "@/packages/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupLook,
} from "@/packages/ui/button-group";
import { Icon } from "@/packages/ui/lib/icons";

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
          <ButtonGroup>
            <Button variant="secondary" style={buttonGroupLook().item("horizontal", "first")}>
              <Icon icon={ArrowLeft} size={14} tint={ui().text} />
              <Text style={buttonLabel("secondary")}>Back</Text>
            </Button>
            <Button variant="secondary" style={buttonGroupLook().item("horizontal", "middle")}>
              <Text style={buttonLabel("secondary")}>Archive</Text>
            </Button>
            <Button variant="secondary" style={buttonGroupLook().item("horizontal", "last")}>
              <Text style={buttonLabel("secondary")}>Next</Text>
              <Icon icon={ArrowRight} size={14} tint={ui().text} />
            </Button>
          </ButtonGroup>
        </DemoSection>

        <DemoSection title="A column">
          <ButtonGroup orientation="vertical">
            <Button variant="secondary" style={buttonGroupLook().item("vertical", "first")}>
              <Text style={buttonLabel("secondary")}>Copy the path</Text>
            </Button>
            <Button variant="secondary" style={buttonGroupLook().item("vertical", "middle")}>
              <Text style={buttonLabel("secondary")}>Open in a new window</Text>
            </Button>
            <Button variant="secondary" style={buttonGroupLook().item("vertical", "last")}>
              <Text style={buttonLabel("secondary")}>Reveal in the file manager</Text>
            </Button>
          </ButtonGroup>
        </DemoSection>

        <DemoSection title="A word and a divider">
          <ButtonGroup>
            <ButtonGroupText style={buttonGroupLook().item("horizontal", "first")}>
              Path
            </ButtonGroupText>
            <ButtonGroupSeparator />
            <Button variant="secondary" style={buttonGroupLook().item("horizontal", "last")}>
              <Text style={buttonLabel("secondary")}>Copy</Text>
            </Button>
          </ButtonGroup>
        </DemoSection>
      </DemoCard>
    </DemoPage>
  );
}

mount(App);
`;export{e as default};