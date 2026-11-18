---
title: Label
description: The visible name of a control, beside it or over a group of them.
component: true
demo: label
---

## Installation

```sh
npx shadcn-nsh@latest add label
```

## Usage

```tsx
import { Label } from "@/components/ui/label";
```

```tsx
<Label>Accept terms and conditions</Label>
```

## Examples

### Beside a choice

A label is a row, so an icon or a switch can sit before its text; a control beside it is the
caller's own view, a gap of the caller's `style` apart.

```tsx
<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
  <Checkbox accessibilityLabel="Accept terms and conditions" />
  <Label>Accept terms and conditions</Label>
</View>
```

The label does not press the control: nsh has no `for` to hang the pair on. A row that toggles its
control is a `listRow` of the app's, as the `Checkbox` page shows.

### Over a group

The caption of a set of choices, a column's first line.

```tsx
<View style={{ gap: 10 }}>
  <Label>Notify me about</Label>
  <Checkbox accessibilityLabel="Comments">Comments on my posts</Checkbox>
  <Checkbox accessibilityLabel="Mentions">Mentions of my name</Checkbox>
</View>
```

### Naming the control

This `Label` is the visible name, and nothing more: it names nothing for a screen reader. nsh has
no `htmlFor` and no `labelledBy`, so the control's own `accessibilityLabel` is its name — the same
words, said twice:

```tsx
<Checkbox accessibilityLabel="Accept terms and conditions" />
<Label>Accept terms and conditions</Label>
```

`lib/utils.ts` compiles into the app beside it and is a different thing: `labelOf(caller, children)`
is the rule the shells share for the name a control already derives from a string child
(`Pressable`, `Button`). A `Label` draws type; `labelOf` decides what screen readers say.

### Disabled

A label beside a control that cannot be used dims to half, as shadcn's `peer-disabled` dims it.
Without a sibling selector to read the control's state, the label takes `disabled` itself: set it
where the control's own `disabled` is set.

```tsx
<Checkbox disabled accessibilityLabel="Weekly digest" />
<Label disabled>Weekly digest</Label>
```

## API

Every prop of [`nsh` View](https://nsh.dev/elements/view) passes through (`style`, `role`, …); `style` goes over the look's.

| Prop       | Type                    | Default |
| ---------- | ----------------------- | ------- |
| `disabled` | `boolean`               | `false` |
| `children` | `string \| JSX.Element` |         |

`disabled` is this library's, not shadcn's: it is how the `peer-disabled` look is reached. There is
no other axis: the text is `controlSize.label` (14 points with a pointer, 15 on a touch screen) and
medium, in the theme's text color, a row with a gap of 8. `labelLook({ disabled })` is exported —
`root` and `text` — for a label the app draws itself.
