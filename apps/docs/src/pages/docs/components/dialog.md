---
layout: ../../../layouts/Docs.astro
title: Dialog
description: A card dialog with a trigger, content, title, description, footer and close.
component: true
demo: dialog
demoHeight: 480
---

## Installation

```sh
npx shadcn-nsh@latest add dialog
```

## Usage

```tsx
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
```

```tsx
<Dialog>
  <DialogTrigger variant="default">Delete item…</DialogTrigger>
  <DialogContent>
    <DialogTitle>Delete this item?</DialogTitle>
    <DialogDescription>A press on the dimmed backdrop closes it.</DialogDescription>
    <DialogFooter>
      <DialogClose>Keep</DialogClose>
      <DialogClose variant="destructive" onPress={remove}>
        Delete
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Examples

### Controlled

`open` owns the state; `onOpenChange` reports the next one and why.

```tsx
<Dialog open={open()} onOpenChange={({ open: next }) => setOpen(next)}>
  …
</Dialog>
```

### Width

The card is 360 points with a pointer and 320 on a touch screen; `width` sets another, never past 90% of the window.

```tsx
<DialogContent width={480}>…</DialogContent>
```

### Motion

`animation` is `fade` (the card's default), `slide`, or `none`.

```tsx
<DialogContent animation="slide">…</DialogContent>
```

### Presentation

On iOS, `presentation` shows a system sheet instead of a card.

```tsx
<DialogContent presentation="pageSheet">…</DialogContent>
```

### Closing

Escape, a backdrop press and a downward swipe close the dialog; turn any of them off on the content.

```tsx
<DialogContent closeOnEscape={false} closeOnBackdropPress={false} closeOnSwipe={false}>
  …
</DialogContent>
```

### Card and backdrop

`style` goes over the card's chrome, `backdropStyle` over the scrim.

```tsx
<DialogContent
  style={{ padding: 32, maxWidth: 480 }}
  backdropStyle={{ backgroundColor: alpha(colors.text, 0.4) }}
>
  …
</DialogContent>
```

### Bare

`variant="bare"` drops the card: the popup is the whole window, with no surface, edge, padding,
corner or shadow, and nothing holding it in the middle. It is for a lightbox — a photo, a caption
and the app's own floating close button over it. The content is laid over the window, so nothing of
the backdrop shows: close it from your own button (Escape and the back button are still the base's).

```tsx
<Dialog open={shown()} onOpenChange={({ open }) => setShown(open)}>
  <DialogContent variant="bare">
    <Image src={photo} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
    <View style={{ position: "absolute", top: 12, right: 12 }}>
      <DialogClose>Close</DialogClose>
    </View>
  </DialogContent>
</Dialog>
```

`dialogBare()` is that look on its own, for the reference page and for an app that lays the
`nsh/base` dialog out itself; `DialogVariant` is the type of the axis.

## API

`Dialog` owns the open state. `DialogContent` mounts [`nsh/base` Dialog](https://nsh.dev/elements/dialog); every base prop passes through it, and base owns the backdrop, the popup host and Escape, back and swipe.

| Part                | Props                                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Dialog`            | `open`, `defaultOpen`, `onOpenChange({ open, reason })`, `onOpen`, `onClose`, `onCancel`                                                           |
| `DialogTrigger`     | `children`, `variant`, `disabled`, `style`                                                                                                         |
| `DialogContent`     | `variant` (`default` / `bare`), `width`, every `nsh/base` Dialog prop; `style` over `dialogCard` (or `dialogBare`), `backdropStyle` over the scrim |
| `DialogTitle`       | `children`; a string takes `dialogTitle`                                                                                                           |
| `DialogDescription` | `children`; a string takes `dialogText`                                                                                                            |
| `DialogFooter`      | `children`, `style`                                                                                                                                |
| `DialogClose`       | As `DialogTrigger`, plus `onPress` before it closes                                                                                                |

A string child of `DialogTrigger` or `DialogClose` is a `Button`; `variant` picks its look (`secondary` by default). Anything else is drawn as given.
