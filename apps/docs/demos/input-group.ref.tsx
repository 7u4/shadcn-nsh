// The reference of `input-group.tsx`: the same scene, the group's looks spread on `nsh/base`'s
// `Input` and on views, and `buttonLook` on a button. The render check requires the two to draw
// the same pixels.
import { CircleX, Search, Send, Sparkles, X } from "lucide";
import type { InputRef, JSX } from "nsh";
import { mount, signal, Text, View } from "nsh";
import { Button, Input } from "nsh/base";

import {
  buttonGlyph,
  buttonLabel,
  buttonLook,
  buttonSizes,
  type ButtonSize,
} from "@/packages/ui/button";
import {
  inputGroupAddonLook,
  inputGroupControlLook,
  inputGroupLook,
  inputGroupTextLook,
  type InputGroupAddonAlign,
  type InputGroupButtonSize,
} from "@/packages/ui/input-group";
import { Icon } from "@/packages/ui/lib/icons";

import { DemoCard, DemoPage, DemoSection } from "./kit";
import { desktop, Log, Panel, Split, ui } from "./stage";

/** A group's text (a unit, an icon): `inputGroupTextLook` spread. */
function GroupText(props: { children?: string | JSX.Element }) {
  const look = inputGroupTextLook();
  return (
    <View style={look.style}>
      {typeof props.children === "string" ? (
        <Text style={look.label}>{props.children}</Text>
      ) : (
        props.children
      )}
    </View>
  );
}

/** A group's addon: `inputGroupAddonLook`. A press on it puts the keys in the control, as the
 * shell's `InputGroupAddon` does. */
function GroupAddon(props: {
  align: InputGroupAddonAlign;
  onPress?: () => void;
  children?: JSX.Element;
}) {
  return (
    <View focusable={false} onPress={props.onPress} style={inputGroupAddonLook(props.align)}>
      {props.children}
    </View>
  );
}

/**
 * A group's button: `buttonLook` on `nsh/base`'s Button, at the size the group gives it — `xs` and
 * `icon-xs` are a `sm` button (24 points with a pointer, 36 on a touch screen), `sm` and `icon-sm`
 * a `default` one (28 / 40), the `icon-*` ones a square of that height with no side padding.
 */
function GroupButton(props: {
  size: InputGroupButtonSize;
  variant?: "default" | "ghost";
  accessibilityLabel: string;
  disabled?: boolean;
  onPress?: () => void;
  children: JSX.Element;
}) {
  const scale: ButtonSize = props.size === "sm" || props.size === "icon-sm" ? "default" : "sm";
  const square = props.size.startsWith("icon");
  const variant = props.variant ?? "ghost";
  const options = { size: scale, disabled: () => !!props.disabled };
  return (
    <Button
      accessibilityLabel={props.accessibilityLabel}
      disabled={props.disabled}
      onPress={props.onPress}
      {...buttonLook(variant, {
        ...options,
        style: square ? { width: buttonSizes[scale].height, paddingHorizontal: 0 } : undefined,
      })}
    >
      {typeof props.children === "string" ? (
        <Text style={buttonLabel(variant, options)}>{props.children}</Text>
      ) : (
        props.children
      )}
    </Button>
  );
}

function App() {
  const query = signal("");
  const amount = signal("");
  const message = signal("");
  const note = signal("");
  const events = signal<string[]>([]);
  const say = (field: string, value: string) =>
    events.set([`${field} “${value}”`, ...events()].slice(0, 3));
  let search: InputRef | undefined;

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
          <View {...inputGroupLook()}>
            <GroupAddon align="inline-start" onPress={() => search?.focus()}>
              <GroupText>
                <Icon icon={Search} size={16} tint={ui().muted} />
              </GroupText>
            </GroupAddon>
            <Input
              ref={(input) => (search = input)}
              value={query()}
              onChange={({ value }) => {
                query.set(value);
                say("search", value);
              }}
              placeholder="Search plugins"
              accessibilityLabel="Search plugins"
              {...inputGroupControlLook()}
            />
            <GroupAddon align="inline-end">
              <GroupButton
                size="icon-xs"
                accessibilityLabel="Clear the search"
                disabled={query().length === 0}
                onPress={() => query.set("")}
              >
                <Icon icon={CircleX} {...buttonGlyph("ghost", { size: "sm" })} />
              </GroupButton>
            </GroupAddon>
          </View>

          <View {...inputGroupLook()}>
            <Input
              value={amount()}
              onChange={({ value }) => {
                amount.set(value);
                say("amount", value);
              }}
              placeholder="0.00"
              keyboardType="numbers-and-punctuation"
              accessibilityLabel="Amount"
              {...inputGroupControlLook()}
            />
            <GroupAddon align="inline-end">
              <GroupText>USD</GroupText>
            </GroupAddon>
          </View>

          <View {...inputGroupLook({ style: { borderRadius: 22, padding: 6 } })}>
            <Input
              multiline
              value={message()}
              onChange={({ value }) => {
                message.set(value);
                say("message", value);
              }}
              placeholder="Ask anything"
              accessibilityLabel="Message"
              {...inputGroupControlLook({ multiline: true })}
            />
            <GroupAddon align="inline-end">
              <GroupButton
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
              </GroupButton>
            </GroupAddon>
          </View>

          <View {...inputGroupLook()}>
            <GroupAddon align="block-start">
              <Icon icon={Sparkles} size={14} tint={ui().muted} />
              <GroupText>Improve the wording</GroupText>
            </GroupAddon>
            <Input
              multiline
              value={note()}
              onChange={({ value }) => {
                note.set(value);
                say("note", value);
              }}
              placeholder="What changed?"
              accessibilityLabel="Release note"
              {...inputGroupControlLook({ multiline: true })}
            />
            <GroupAddon align="block-end">
              <GroupText>{`${note().length} / 200`}</GroupText>
            </GroupAddon>
          </View>
        </View>
      </Split>

      <DemoCard>
        <DemoSection title="States">
          <View {...inputGroupLook()}>
            <GroupAddon align="inline-start">
              <GroupText>@</GroupText>
            </GroupAddon>
            <Input placeholder="Handle" accessibilityLabel="Handle" {...inputGroupControlLook()} />
          </View>
          <View {...inputGroupLook({ invalid: true })}>
            <GroupAddon align="inline-start">
              <GroupText>@</GroupText>
            </GroupAddon>
            <Input
              value="ada@"
              accessibilityLabel="Handle, rejected"
              {...inputGroupControlLook()}
            />
          </View>
          {/* The look alone is flat on the quieter edge; the view is `disabled` as the shell's is, so
              what it holds is disabled with it and dims as one. */}
          <View {...inputGroupLook({ disabled: true })} disabled>
            <GroupAddon align="inline-start">
              <GroupText>@</GroupText>
            </GroupAddon>
            <Input
              value="ada"
              disabled
              accessibilityLabel="Handle, disabled"
              {...inputGroupControlLook()}
            />
          </View>
        </DemoSection>

        <DemoSection title="Button sizes">
          <View {...inputGroupLook()}>
            <Input
              placeholder="Filter the list"
              accessibilityLabel="Filter the list"
              {...inputGroupControlLook()}
            />
            <GroupAddon align="inline-end">
              <GroupButton size="xs" accessibilityLabel="Apply the filter">
                <Icon icon={Search} {...buttonGlyph("ghost", { size: "sm" })} />
              </GroupButton>
              <GroupButton size="sm" accessibilityLabel="Clear the filter">
                <Icon icon={X} {...buttonGlyph("ghost", { size: "default" })} />
              </GroupButton>
              <GroupButton size="icon-xs" accessibilityLabel="Copy the filter">
                <Icon icon={CircleX} {...buttonGlyph("ghost", { size: "sm" })} />
              </GroupButton>
              <GroupButton size="icon-sm" accessibilityLabel="Save the filter">
                <Icon icon={Send} {...buttonGlyph("ghost", { size: "default" })} />
              </GroupButton>
            </GroupAddon>
          </View>
        </DemoSection>
      </DemoCard>
    </DemoPage>
  );
}

mount(App);
