---
layout: ../../../layouts/Docs.astro
title: Textarea
description: A field of several lines, in the look of the input.
component: true
demo: textarea
---

## Installation

```sh
npx shadcn-nsh@latest add textarea
```

## Usage

```tsx
import { Textarea } from "@/components/ui/textarea";
```

```tsx
<Textarea placeholder="Leave a comment" onChange={({ value }) => comment.set(value)} />
```

## Examples

### As tall as its text

shadcn's textarea grows with what it holds (`field-sizing-content`), and starts at `min-h-16` (64
points). Here the box grows too, and the growth is the app's: `nsh/base`'s multi-line input reports
the size of its text (`onContentSizeChange`) rather than sizing itself to it, and the look keeps only
a least height — one line's, so a textarea sits as tall as a one-line input until the app says
otherwise. Keep the reported height plus the room the look keeps inside the box:

```tsx
import { signal } from "nsh";

import { fieldText } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const note = signal("");
const content = signal(0);
/** The room inside the box: its two edges and the padding above and below. */
const room = () => {
  const text = fieldText({ multiline: true });
  return (text.paddingTop as number) + (text.paddingBottom as number) + 2;
};

<Textarea
  value={note()}
  onChange={({ value }) => note.set(value)}
  onContentSizeChange={({ size }) => content.set(size.height)}
  style={{ height: content() === 0 ? undefined : content() + room() }}
/>;
```

A least height of your own is how the box starts taller, since `style` goes over the look's —
shadcn's 64 points, or a growing box that stops at five lines, with `Math.min(size.height, 5 * line)`:

```tsx
<Textarea value={note()} style={{ minHeight: 64 }} />
```

### Invalid

`invalid` edges the field in the danger tone, its focus edge too (shadcn's `aria-invalid`). What
explains the error goes under the field; the component does not draw it, since the words are the
app's.

```tsx
<Textarea invalid defaultValue={note} />
```

### Read-only and disabled

Read-only lies flat on a quieter edge with its value in the text color; disabled does the same and
dims to 50%.

```tsx
<Textarea value="Reviewed by the design team on 12 March." readonly />
<Textarea value="This comment is archived." disabled />
```

### The return key

Return writes a line break, which is what a textarea is for. A field that submits on Return takes
`submitBehavior="submit"` and keeps Shift + Return (Option / Alt + Return on a desktop) for a break.

```tsx
<Textarea submitBehavior="submit" onSubmit={() => send()} />
```

### The look alone

The textarea has no look of its own: it is the input's, with several lines. Spread it on `nsh/base`'s
`Input` yourself when the app composes its own field.

```tsx
import { Input } from "nsh/base";

import { inputLook } from "@/components/ui/input";

<Input multiline {...inputLook({ multiline: true, invalid: true })} />;
```

## API

Every prop of [`nsh/base` Input](https://nsh.dev/elements/input) passes through except `multiline`:
a textarea is always several lines, so the return key writes a break. `class`, `style` and
`disabledStyle` go over the look's; the focus and hover edges are classes on the look.

| Prop      | Type      | Default |
| --------- | --------- | ------- |
| `invalid` | `boolean` | `false` |
