import { Text, View, mount } from "nsh";

// Alert dialog, hover card, toolbar — open chrome in the first screen, nothing floating over it.
import {
  Button,
  Link,
  Toggle,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  dialogCard,
  dialogText,
  dialogTitle,
  popoverLook,
} from "../../packages/ui";
import { Page, Panel, Row } from "./demo-kit";

const box = { width: 220, flexShrink: 0, margin: 0, maxWidth: 220 };

mount(() => (
  <Page>
    <Panel title="Surfaces">
      {/* The card an alert would wear: `alert-dialog` asks the system, so the card is drawn here. */}
      <Row label="alert">
        <View style={[dialogCard(220), box]}>
          <Text style={dialogTitle()}>Delete file?</Text>
          <Text style={dialogText()}>This cannot be undone.</Text>
          <View style={{ flexDirection: "row", gap: 8, paddingTop: 4, justifyContent: "flex-end" }}>
            <Button size="sm" variant="secondary">
              Cancel
            </Button>
            <Button size="sm" variant="destructive">
              Delete
            </Button>
          </View>
        </View>
      </Row>
      <Row label="hover">
        <View style={[popoverLook(), box]}>
          <Text style={dialogTitle()}>Ada Lovelace</Text>
          <Text style={dialogText()}>First programmer.</Text>
        </View>
      </Row>
      <Row label="tools">
        <Toolbar accessibilityLabel="Formatting" style={{ alignSelf: "flex-start", flexShrink: 0 }}>
          <ToolbarGroup accessibilityLabel="Marks">
            <Button variant="ghost" size="sm" accessibilityLabel="Bold">
              Bold
            </Button>
            <Toggle pressed accessibilityLabel="Italic">
              Italic
            </Toggle>
          </ToolbarGroup>
          <ToolbarSeparator />
          <Link href="https://nsh.dev" openWith="app">
            Site
          </Link>
          <Button variant="ghost" size="sm" disabled accessibilityLabel="Off">
            Off
          </Button>
        </Toolbar>
      </Row>
    </Panel>
  </Page>
));
