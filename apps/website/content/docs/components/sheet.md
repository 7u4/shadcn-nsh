---
title: Sheet
description: A panel that slides in from an edge of the screen over a scrim.
component: true
demo: sheet
---

## Installation

```npm
npx shadcn-nsh@latest add sheet
```

## Usage

```tsx
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
```

```tsx
<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent side="bottom">
    Filters
    <SheetClose>Done</SheetClose>
  </SheetContent>
</Sheet>
```

## Examples

### Side

```tsx
<SheetContent side="bottom">…</SheetContent>
<SheetContent side="right">…</SheetContent>
```

Bottom sheets include a grabber. The look alone is `sheetPanel(side)` and `sheetGrabber()`.

## API

Every prop of [`nsh/base` Sheet](https://nsh.dev/elements/sheet) passes through on `SheetContent`. `popupStyle` and `backdropStyle` go over the look's.

| Part           | Props                                                                 | Description                                                                                        |
| -------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `SheetContent` | `side` (`"bottom" \| "top" \| "left" \| "right"`, default `"bottom"`) | Every prop of `nsh/base` Sheet passes through. `popupStyle` and `backdropStyle` go over the look's |
