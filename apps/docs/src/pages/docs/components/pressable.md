---
layout: ../../../layouts/Docs.astro
title: Pressable
description: A region that takes presses and adds only their feedback.
component: true
demo: pressable
---

## Installation

```sh
npx shadcn-nsh@latest add pressable
```

## Usage

```tsx
import { Pressable } from "@/components/ui/pressable";
```

```tsx
<Pressable onPress={open}>Open the note</Pressable>
```

## Examples

### A region with its own look

`Pressable` draws nothing of its own: no fill, no padding, no height. It is its content, and a `style` adds whatever geometry the region needs. The theme's lightest hover fill, the press's sink and the keyboard's ring are the whole of its look.

```tsx
<Pressable
  accessibilityLabel="Comment from Ada"
  onPress={open}
  style={{ padding: 10, borderRadius: 10, backgroundColor: surface() }}
>
  <Item>…</Item>
</Pressable>
```

### A picture

```tsx
<Pressable accessibilityLabel="Photo of the launch site" onPress={enlarge}>
  <Image src={photo} style={{ width: "100%", height: 132, objectFit: "cover" }} />
</Pressable>
```

### A stretch of text

A string child is plain text, and its text is the region's name for screen readers unless `accessibilityLabel` says otherwise. Children drawn as given derive no name: give those an `accessibilityLabel` (the icon-only case is an `IconButton`, where it is required).

```tsx
<Pressable onPress={read}>A whole paragraph can be the region.</Pressable>
```

### Disabled

```tsx
<Pressable disabled onPress={open}>
  Open the note
</Pressable>
```

### The look alone

The look is a function, for a `nsh/base` control of your own. Its `radius.control` corners shape the focus ring; a `style` with its own radius moves the ring with it.

```tsx
<Button {...pressableLook()}>Open the note</Button>
<Button {...pressableLook({ style: { padding: 12 } })}>Open the note</Button>
```

## API

Every prop of [`nsh/base` Button](https://nsh.dev/elements/button) passes through (`onPress`, `disabled`, `selected`, `role`, `hitSlop`, …). `style`, `hoverStyle`, `activeStyle` and `focusVisibleStyle` go over the look's.

| Prop       | Type                    | Default |
| ---------- | ----------------------- | ------- |
| `children` | `string \| JSX.Element` |         |

There is no axis: a pressable has one look — the hover, the sink and the ring — and its appearance is its content's. `pressableLook` takes `disabled` (no hover or press feedback) and `style` (geometry over the look's), and is what the reference page spreads on `nsh/base`'s Button.
