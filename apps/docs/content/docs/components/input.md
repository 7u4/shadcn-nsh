---
title: Input
description: A text field — sunk, ghost, multiline, masked, or invalid.
component: true
demo: input
---

## Installation

```npm
npx shadcn-nsh@latest add input
```

## Usage

```tsx
import { Input } from "@/components/ui/input";
```

```tsx
<Input value={name()} onChange={({ value }) => name.set(value)} placeholder="Ada Lovelace" />
```

## Examples

### Variant

No fill and no edge until the keys are in it, with the text, the placeholder and the focus ring as they are: a search field, a title that turns into a field. Disabled still dims, and invalid still shows the danger edge.

```tsx
<Input variant="ghost" placeholder="Search" accessibilityLabel="Search" />
<Input variant="ghost" value="Untitled note" style={{ fontSize: 17, fontWeight: "600" }} />
```

A ghost input is the field itself: it keeps its own focus edge and ring, so it is not what a frame you draw around it wants. For an input in a frame of your own — a search field with a magnifier, a composer with a send button — use [`InputGroup`](./input-group) instead: the group draws the frame and the input in it draws nothing, so the focus ring follows the group's radius.

### Invalid

```tsx
<Input invalid value={email()} />
```

### Read-only and disabled

```tsx
<Input value="Ada" readonly />
<Input value="Ada" disabled />
```

### Multiline

```tsx
<Input multiline value={notes()} onChange={({ value }) => notes.set(value)} />
```

### The look alone

```tsx
<Input {...inputLook({ invalid: true })} />
<Input {...inputLook({ variant: "ghost" })} />
```

## Differences from shadcn/ui

- Adds `variant` (`default` | `ghost`) and `invalid`; shadcn styles those with classes and `aria-invalid`.
- `multiline` turns the same component into a text area; shadcn's is a separate `Textarea`.

## API

| Part    | Props                                                                                                                                                            | Description                                                  |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `Input` | `variant`: `"default" \| "ghost"` (default `"default"`), `invalid`: `boolean`; every `nsh/base` Input prop; `class`, `style` and `disabledStyle` over the look's | A text field, `default` or `ghost`, single-line or multiline |

Every prop of [`nsh/base` Input](https://nsh.dev/elements/input) passes through. `class`, `style` and `disabledStyle` go over the look's. Focus and hover edges are classes on the look.
