// The input group's scenes with this library's parts: a search field (a magnifier before the
// control, a clear button after it), an amount with its unit after it, a composer on a 22-point
// radius with a send button, and a note whose addons sit over and under it; a card shows the
// group's states and the sizes of its buttons. The inspector says what is typed and logs it.
import { CircleX, Search, Send, Sparkles, X } from "lucide";
import { mount, signal, Text, View } from "nsh";

import { buttonGlyph } from "@/packages/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/packages/ui/input-group";
import { Icon } from "@/packages/ui/lib/icons";

import { DemoCard, DemoPage, DemoSection } from "./kit";
import { desktop, Log, Panel, Split, ui } from "./stage";

function App() {
  const query = signal("");
  const amount = signal("");
  const message = signal("");
  const note = signal("");
  const events = signal<string[]>([]);
  const say = (field: string, value: string) =>
    events.set([`${field} “${value}”`, ...events()].slice(0, 3));

  return (
    <DemoPage title="InputGroup">
      <Text style={{ color: ui().muted }}>
        {desktop
          ? "Click a field to type; clicking an icon beside it puts the keys in it"
          : "Tap a field, or the icon beside it, to type"}
      </Text>

      <Split
        width={360}
        gap={16}
        inspector={
          <>
            <Panel title="value">
              <Text style={{ fontSize: 13, color: ui().text }}>
                {`search ${query() ? `“${query()}”` : "—"}`}
              </Text>
              <Text style={{ fontSize: 13, color: ui().text }}>
                {`amount ${amount() ? `${amount()} USD` : "—"}`}
              </Text>
            </Panel>
            <Log title="onChange" lines={events()} minHeight={92} />
          </>
        }
      >
        <View style={{ gap: 14 }}>
          {/* The frame is the group's; the input inside draws no edge of its own, so the keys in it
              light the group's edge and ring, and the radius the group is given. */}
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>
                <Icon icon={Search} size={16} tint={ui().muted} />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              value={query()}
              onChange={({ value }) => {
                query.set(value);
                say("search", value);
              }}
              placeholder="Search plugins"
              accessibilityLabel="Search plugins"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                accessibilityLabel="Clear the search"
                disabled={query().length === 0}
                onPress={() => query.set("")}
              >
                <Icon icon={CircleX} {...buttonGlyph("ghost", { size: "sm" })} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>

          {/* A unit after the control, in the field's type. */}
          <InputGroup>
            <InputGroupInput
              value={amount()}
              onChange={({ value }) => {
                amount.set(value);
                say("amount", value);
              }}
              placeholder="0.00"
              keyboardType="numbers-and-punctuation"
              accessibilityLabel="Amount"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupText>USD</InputGroupText>
            </InputGroupAddon>
          </InputGroup>

          {/* A radius and a padding on the group (a composer's 22): the focus ring follows the
              radius, and the control keeps the group's padding inside it. */}
          <InputGroup style={{ borderRadius: 22, padding: 6 }}>
            <InputGroupTextarea
              value={message()}
              onChange={({ value }) => {
                message.set(value);
                say("message", value);
              }}
              placeholder="Ask anything"
              accessibilityLabel="Message"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-sm"
                variant="default"
                accessibilityLabel="Send"
                disabled={message().length === 0}
                onPress={() => {
                  say("sent", message());
                  message.set("");
                }}
              >
                <Icon icon={Send} {...buttonGlyph("default")} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>

          {/* Addons over and under the control: a `block-start` addon takes a line of its own, and
              so does a `block-end` one. */}
          <InputGroup>
            <InputGroupAddon align="block-start">
              <Icon icon={Sparkles} size={14} tint={ui().muted} />
              <InputGroupText>Improve the wording</InputGroupText>
            </InputGroupAddon>
            <InputGroupTextarea
              value={note()}
              onChange={({ value }) => {
                note.set(value);
                say("note", value);
              }}
              placeholder="What changed?"
              accessibilityLabel="Release note"
            />
            <InputGroupAddon align="block-end">
              <InputGroupText>{`${note().length} / 200`}</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </View>
      </Split>

      <DemoCard>
        <DemoSection title="States">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>@</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="Handle" accessibilityLabel="Handle" />
          </InputGroup>
          <InputGroup invalid>
            <InputGroupAddon align="inline-start">
              <InputGroupText>@</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput value="ada@" accessibilityLabel="Handle, rejected" />
          </InputGroup>
          <InputGroup disabled>
            <InputGroupAddon align="inline-start">
              <InputGroupText>@</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput value="ada" accessibilityLabel="Handle, disabled" />
          </InputGroup>
        </DemoSection>

        <DemoSection title="Button sizes">
          <InputGroup>
            <InputGroupInput placeholder="Filter the list" accessibilityLabel="Filter the list" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="xs" accessibilityLabel="Apply the filter">
                <Icon icon={Search} {...buttonGlyph("ghost", { size: "sm" })} />
              </InputGroupButton>
              <InputGroupButton size="sm" accessibilityLabel="Clear the filter">
                <Icon icon={X} {...buttonGlyph("ghost", { size: "default" })} />
              </InputGroupButton>
              <InputGroupButton size="icon-xs" accessibilityLabel="Copy the filter">
                <Icon icon={CircleX} {...buttonGlyph("ghost", { size: "sm" })} />
              </InputGroupButton>
              <InputGroupButton size="icon-sm" accessibilityLabel="Save the filter">
                <Icon icon={Send} {...buttonGlyph("ghost", { size: "default" })} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </DemoSection>
      </DemoCard>
    </DemoPage>
  );
}

mount(App);
