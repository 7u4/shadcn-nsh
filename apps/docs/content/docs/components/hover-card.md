---
title: Hover Card
description: A preview card that grows from its trigger, on the shared popover surface.
component: true
demo: hover-card
---

## Installation

```npm
npx shadcn-nsh@latest add hover-card
```

## Usage

```tsx
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
```

```tsx
<HoverCard>
  <HoverCardTrigger>@nsh</HoverCardTrigger>
  <HoverCardContent width={240}>
    <Text>Native Shell</Text>
  </HoverCardContent>
</HoverCard>
```

## Examples

### Compact

A line or two: 12 points of padding and 4 between rows.

```tsx
<HoverCardContent compact>A short note</HoverCardContent>
```

### Placement and delays

The base defaults are 600 ms before it opens and 300 ms before it closes.

```tsx
<HoverCard>
  <HoverCardTrigger>@nsh</HoverCardTrigger>
  <HoverCardContent placement="top" offset={8} openDelay={200} closeDelay={500}>
    …
  </HoverCardContent>
</HoverCard>
```

### A trigger of your own, or a disabled one

A string child is a `Button`; a disabled trigger keeps the card closed.

```tsx
<HoverCardTrigger variant="ghost">@nsh</HoverCardTrigger>
<HoverCardTrigger disabled>@nsh</HoverCardTrigger>
```

## Differences from shadcn/ui

- No `asChild`: a string child of `HoverCardTrigger` is a `Button` (`variant`, `secondary` by default); anything else is a pressable view.
- Adds `compact` and `width` on `HoverCardContent`.
- `onOpenChange` reports `{ open, reason }`.

## API

| Part               | Props                                                                                              | Description                     |
| ------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------- |
| `HoverCard`        | `open` / `defaultOpen`, `onOpenChange`, `onOpen`, `onClose`                                        | Open state and the trigger slot |
| `HoverCardTrigger` | `children`, `variant` (a string child's `Button`), `disabled`, `style`                             | What the card previews          |
| `HoverCardContent` | `compact`, `width`, and base's `placement`, `align`, `offset`, `margin`, `openDelay`, `closeDelay` | The preview card                |

The root owns the open flag; `HoverCardContent` mounts [`nsh/base` HoverCard](https://nsh.dev/elements/hover-card) and every base prop passes through except those. Its children come in on a `PopIn` with `popoverLook`.
