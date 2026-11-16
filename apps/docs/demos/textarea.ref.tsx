// The reference of `textarea.tsx`: the same page as upstream writes it, `inputLook` with
// `multiline` spread on `nsh/base`'s Input. The render check requires the two to draw the same
// pixels.
import type { JSX } from "nsh";
import { mount, signal, Text, View } from "nsh";
import { Button, Input } from "nsh/base";

import { buttonLabel, buttonLook } from "@/packages/ui/button";
import { fieldText, inputLook } from "@/packages/ui/input";

import { DemoCard, DemoPage, DemoSection } from "./kit";
import { desktop, Log, Panel, Split, ui } from "./stage";

/** What the comment starts with: long enough that its box is taller than the field's least. */
const COMMENT =
  "The empty state reads well. The line under it, though, sends the reader to “Go back” — " +
  "the one place they cannot go when there is nothing there yet.";

/** The most the comment takes. */
const LIMIT = 280;

/** A padding the look writes in points (it writes numbers). */
const room = (value: string | number | undefined) => (typeof value === "number" ? value : 0);

/** The room the look keeps inside the box: its two edges and the padding above and below. */
function fieldPad(): number {
  const text = fieldText({ multiline: true });
  return room(text.paddingTop) + room(text.paddingBottom) + 2;
}

/** A label above its field, and what describes it below. */
function Field(props: { label: string; children: JSX.Element; after?: JSX.Element }) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontSize: 13, color: ui().muted }}>{props.label}</Text>
      {props.children}
      {props.after}
    </View>
  );
}

/**
 * A textarea as tall as its text (shadcn's `field-sizing-content`): the input reports the size of
 * what it holds, and the box takes that plus the room the look keeps inside it. `value` makes it
 * the app's (`onChange` follows it); without one it keeps its own, from `initial`.
 *
 * The height rides in the look's own `style` rather than in a second `style` over the spread: an
 * element given its style twice keeps the last one applied when the theme switches at runtime, and
 * the input then measures its text without the override (three lines where four fit, clipped).
 * `inputLook({ style })` reads it last and is the one style the element gets.
 */
function Growing(props: {
  value?: string;
  initial?: string;
  onChange?: (event: { value: string }) => void;
  placeholder?: string;
  maxLength?: number;
  invalid?: boolean;
  accessibilityLabel: string;
}) {
  const own = signal(props.initial ?? "");
  const content = signal(0);
  const look = inputLook({
    multiline: true,
    invalid: () => !!props.invalid,
    style: () => ({ height: content() === 0 ? undefined : content() + fieldPad() }),
  });
  return (
    <Input
      multiline
      value={props.value ?? own()}
      placeholder={props.placeholder}
      maxLength={props.maxLength}
      accessibilityLabel={props.accessibilityLabel}
      onChange={(event) => {
        if (props.value === undefined) own.set(event.value);
        props.onChange?.(event);
      }}
      {...look}
      onContentSizeChange={({ size }) => content.set(size.height)}
    />
  );
}

function App() {
  const comment = signal(COMMENT);
  const posted = signal("");
  const events = signal<string[]>([]);
  const log = (line: string) => events.set([line, ...events()].slice(0, 6));
  const post = () => {
    posted.set(`Posted ${comment().length} characters`);
    log(`post · ${comment().length} characters`);
  };

  return (
    <DemoPage title="Textarea">
      <Text style={{ color: ui().muted }}>
        {desktop
          ? "Click the comment and type; Return writes a line break"
          : "Tap the comment and type; Return writes a line break"}
      </Text>

      <Split
        width={340}
        gap={16}
        inspector={
          <>
            <Panel title="value">
              <Text style={{ fontSize: 13, color: ui().text }}>
                {`${comment().length} / ${LIMIT} characters`}
              </Text>
            </Panel>
            <Log title="onChange · post" lines={events()} minHeight={110} />
          </>
        }
      >
        <View style={{ gap: 16 }}>
          <Field
            label="Comment (controlled, maxLength 280)"
            after={
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text style={{ flex: 1, fontSize: 12, color: ui().muted }}>
                  {comment().length > LIMIT - 20 ? `${LIMIT - comment().length} left` : ""}
                </Text>
                <Button
                  disabled={comment().length === 0}
                  onPress={post}
                  {...buttonLook("default", { disabled: () => comment().length === 0 })}
                >
                  <Text style={buttonLabel("default", { disabled: () => comment().length === 0 })}>
                    Post
                  </Text>
                </Button>
              </View>
            }
          >
            <Growing
              value={comment()}
              onChange={({ value }) => {
                comment.set(value);
                log(`onChange · ${value.length} characters`);
              }}
              placeholder="Leave a comment"
              maxLength={LIMIT}
              accessibilityLabel="Comment"
            />
          </Field>
          <If when={posted() !== ""}>
            <Text style={{ fontSize: 13, color: ui().accent }}>{posted()}</Text>
          </If>
        </View>
      </Split>

      <DemoCard>
        <DemoSection title="States" axis="block">
          <Field
            label="Invalid (the error line says what to correct)"
            after={
              <Text style={{ fontSize: 12, color: ui().danger }}>
                {"Keep the note under 200 characters."}
              </Text>
            }
          >
            <Growing
              invalid
              initial={
                "Two days of work went into the first paragraph alone, and it shows: the opening is the strongest part of the draft."
              }
              accessibilityLabel="Review note"
            />
          </Field>
          <Field label="Read-only (lies flat, the value in the text color)">
            <Input
              multiline
              value={"Reviewed by the design team on 12 March."}
              readonly
              {...inputLook({ multiline: true, readonly: true })}
            />
          </Field>
          <Field label="Disabled (dimmed, the value still there)">
            <Input
              multiline
              value={"This comment is archived."}
              disabled
              {...inputLook({ multiline: true, disabled: true })}
            />
          </Field>
        </DemoSection>
      </DemoCard>

      <DemoCard>
        <DemoSection title="As tall as what it holds" axis="block">
          <Field label="One line">
            <Growing initial={"Thanks — merged."} accessibilityLabel="Short reply" />
          </Field>
          <Field label="Four lines">
            <Growing
              initial={
                "Thanks — merged, with one change:\n" +
                "the second paragraph now leads with the result,\n" +
                "and the screenshot is the light appearance,\n" +
                "so it reads beside the rest of the page."
              }
              accessibilityLabel="Long reply"
            />
          </Field>
        </DemoSection>
      </DemoCard>
    </DemoPage>
  );
}

mount(App);
