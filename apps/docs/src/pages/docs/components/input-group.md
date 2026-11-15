---
layout: ../../../layouts/Docs.astro
title: InputGroup
description: A field's frame around an input and what sits beside it — an icon, a unit, a button.
component: true
demo: input-group
---

## Installation

```sh
npx shadcn-nsh@latest add input-group
```

## Usage

```tsx
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
```

```tsx
<InputGroup>
  <InputGroupInput placeholder="Search" accessibilityLabel="Search" />
</InputGroup>
```

The group draws the field: its fill, its edge and, while the input inside has the keys, the focus edge and its ring. The input inside draws none of that, so a group has one frame, not two.

## Examples

### An addon before and after the input

`InputGroupAddon` holds an icon, a word or a button at the start or at the end of the group's line (`align`: `inline-start`, `inline-end`). A press on an addon puts the keys in the input, so the magnifier works as part of the field; a press on a button in it is the button's alone.

```tsx
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>
      <Icon icon={Search} size={16} tint={colors.muted} />
    </InputGroupText>
  </InputGroupAddon>
  <InputGroupInput
    value={query()}
    onChange={({ value }) => query.set(value)}
    placeholder="Search plugins"
  />
  <InputGroupAddon align="inline-end">
    <InputGroupButton
      size="icon-xs"
      accessibilityLabel="Clear"
      disabled={!query()}
      onPress={() => query.set("")}
    >
      <Icon icon={CircleX} {...buttonGlyph("ghost", { size: "sm" })} />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

### A unit after the control

```tsx
<InputGroup>
  <InputGroupInput
    value={amount()}
    onChange={({ value }) => amount.set(value)}
    placeholder="0.00"
  />
  <InputGroupAddon align="inline-end">
    <InputGroupText>USD</InputGroupText>
  </InputGroupAddon>
</InputGroup>
```

### A radius of your own

Write the radius and the padding on the group. The focus ring is drawn on the group's edge, so it follows the radius: a composer on 22 points lights a 22-point ring, with the input and its button inside it.

```tsx
<InputGroup style={{ borderRadius: 22, padding: 6 }}>
  <InputGroupTextarea
    value={message()}
    onChange={({ value }) => message.set(value)}
    placeholder="Ask anything"
  />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-sm" variant="default" accessibilityLabel="Send" onPress={send}>
      <Icon icon={Send} {...buttonGlyph("default")} />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

### Addons over and under the control

`block-start` and `block-end` take a line of their own, above or below the input's: a word over a note, a count under it.

```tsx
<InputGroup>
  <InputGroupAddon align="block-start">
    <InputGroupText>Release note</InputGroupText>
  </InputGroupAddon>
  <InputGroupTextarea value={note()} onChange={({ value }) => note.set(value)} />
  <InputGroupAddon align="block-end">
    <InputGroupText>{`${note().length} / 200`}</InputGroupText>
  </InputGroupAddon>
</InputGroup>
```

### Invalid and disabled

```tsx
<InputGroup invalid>
  <InputGroupInput value={email()} placeholder="you@example.com" />
</InputGroup>
<InputGroup disabled>
  <InputGroupInput value="ada@example.com" />
</InputGroup>
```

### Buttons in a group

`InputGroupButton` takes shadcn's sizes for a button inside a group, on this library's scale: `xs` is a `sm` button (24 points high with a pointer), `sm` a `default` one (28), and `icon-xs` / `icon-sm` a square of that height. `variant` is a button's, `ghost` unless set.

```tsx
<InputGroup>
  <InputGroupInput placeholder="Filter the list" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="xs" accessibilityLabel="Apply the filter">
      <Icon icon={Search} {...buttonGlyph("ghost", { size: "sm" })} />
    </InputGroupButton>
    <InputGroupButton size="sm" accessibilityLabel="Clear the filter">
      <Icon icon={X} {...buttonGlyph("ghost", { size: "default" })} />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

### When to use a group, and when an `Input`

A frame of your own around an input is a group. Do not wrap a `variant="ghost"` `Input` in a `View` with a border: the ghost input keeps its own focus edge and ring, so the frame ends up with a second edge inside it that does not follow the frame's radius.

```tsx
{
  /* Not this: the ghost input draws its own focus edge inside your frame. */
}
<View style={{ borderRadius: 22, padding: 6, borderWidth: 1 }}>
  <Input variant="ghost" placeholder="Search" />
</View>;

{
  /* This: the group draws the frame, and the input draws nothing. */
}
<InputGroup style={{ borderRadius: 22, padding: 6 }}>
  <InputGroupInput placeholder="Search" />
</InputGroup>;
```

### The look alone

`inputGroupLook` is the frame's props and `inputGroupControlLook` the control's, for a `nsh/base` control of your own; `inputGroupAddonLook` and `inputGroupTextLook` are the addon's and its text's. This is what the reference page draws, and what `InputGroup` wraps.

```tsx
<View {...inputGroupLook({ invalid: true, style: { borderRadius: 22, padding: 6 } })}>
  <BaseInput {...inputGroupControlLook()} placeholder="Search" />
</View>
```

## API

`InputGroup` is a view: every `View` prop passes through. `class`, `style` and `disabledStyle` go over its look's.

| Prop      | Type        | Default | What it does                                                         |
| --------- | ----------- | ------- | -------------------------------------------------------------------- |
| `invalid` | `boolean`   |         | Edged in the danger tone, its focus edge too.                        |
| `style`   | `ViewStyle` |         | Over the look's: the radius, the padding and the width of the group. |

`InputGroupInput` and `InputGroupTextarea` take every prop of [`nsh/base` Input](https://nsh.dev/elements/input) but `ref` (the group holds it, to put the keys in the control from an addon): `value`, `onChange`, `placeholder`, `keyboardType`, `maxLength`, `readonly`, `disabled` and the rest. `InputGroupTextarea` is the multiline one. Their `style` goes over the look's.

| Part               | Props                                                                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `InputGroupAddon`  | every `View` prop; `align`: `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` (default `"inline-start"`)                                                       |
| `InputGroupText`   | every `View` prop; a string child is the word, anything else (an icon) is drawn as given                                                                                      |
| `InputGroupButton` | every `Button` prop; `size`: `"xs" \| "sm" \| "icon-xs" \| "icon-sm"` (default `"xs"`), `variant`: `"default" \| "secondary" \| "ghost" \| "destructive"` (default `"ghost"`) |
