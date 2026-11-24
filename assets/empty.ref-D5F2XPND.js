var e=`// The reference of \`empty.tsx\`: the same page, the look spread on \`nsh\`'s own View and Text
// instead of worn by the parts. The render check requires the two to draw the same pixels.
import { Inbox, Plus, Search } from "lucide";
import { mount, Text, View } from "nsh";

import { Button, buttonLabel } from "@/packages/ui/button";
import { EMPTY_ICON, emptyLook } from "@/packages/ui/empty";
import { Icon } from "@/packages/ui/lib/icons";

import { DemoCard, DemoPage, DemoSection } from "./kit";
import { ui } from "./stage";

function App() {
  return (
    <DemoPage title="Empty">
      <Text style={{ color: ui().muted }}>
        {"A centered block that says there is nothing here yet, and what to do about it."}
      </Text>

      <DemoCard>
        <DemoSection title="Icon media" axis="block">
          <View style={[emptyLook().root()]}>
            <View style={[emptyLook().header()]}>
              <View style={[emptyLook().media("icon")]}>
                <Icon icon={Inbox} size={EMPTY_ICON} tint={ui().text} />
              </View>
              <Text style={[emptyLook().title()]}>No messages yet</Text>
              <Text style={[emptyLook().description()]}>
                Messages you receive will show up here. Start a conversation to see one.
              </Text>
            </View>
            <View style={[emptyLook().content()]}>
              <Button>
                <Icon icon={Plus} size={16} tint={ui().onPrimary} />
                <Text style={buttonLabel("default")}>New message</Text>
              </Button>
            </View>
          </View>
        </DemoSection>

        <DemoSection title="Default media" axis="block">
          <View style={[emptyLook().root()]}>
            <View style={[emptyLook().header()]}>
              <View style={[emptyLook().media("default")]}>
                <Icon icon={Search} size={32} tint={ui().faint} />
              </View>
              <Text style={[emptyLook().title()]}>Nothing matched that search</Text>
              <Text style={[emptyLook().description()]}>
                Every field is required unless it is marked optional.
              </Text>
            </View>
            <View style={[emptyLook().content()]}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Button variant="secondary">
                  <Text style={buttonLabel("secondary")}>Clear filters</Text>
                </Button>
                <Button variant="ghost">
                  <Text style={buttonLabel("ghost")}>Save this search</Text>
                </Button>
              </View>
            </View>
          </View>
        </DemoSection>

        <DemoSection title="The block itself" axis="block">
          <View style={[emptyLook().root()]}>
            <Text style={[emptyLook().description()]}>
              An empty state with nothing in it but a line: the block centers whatever it is given.
            </Text>
          </View>
        </DemoSection>
      </DemoCard>
    </DemoPage>
  );
}

mount(App);
`;export{e as default};