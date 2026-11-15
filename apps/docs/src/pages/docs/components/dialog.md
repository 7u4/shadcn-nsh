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

### A lightbox

The card is a style, so `style` can undo all of it: `backgroundColor` `transparent` takes away its surface, `borderWidth` `0` and `borderRadius` `0` its edge and corners, `padding` `0` and `gap` `0` its room, `boxShadow` `none` its shadow, and `width` / `height` `"100%"` with `maxWidth` `"100%"` and `margin` `0` give it the window's place instead of 360 points, 90% at most, in the middle. `maxWidth` takes a length and never `none`, so `"100%"` is the one that counts. What fills it is yours: a photo, its caption, the app's own floating close button.

```tsx
const lightbox: ViewStyle = {
  margin: 0,
  width: "100%",
  maxWidth: "100%",
  height: "100%",
  borderRadius: 0,
  borderWidth: 0,
  padding: 0,
  gap: 0,
  backgroundColor: "transparent",
  boxShadow: "none",
};

<Dialog open={photo()} onOpenChange={({ open }) => photo.set(open)}>
  <DialogContent style={lightbox} accessibilityLabel="Liftoff">
    <View style={{ width: "100%", height: "100%" }} onPress={() => photo.set(null)}>
      <Image
        src={photoUrl}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, objectFit: "cover" }}
      />
      <DialogClose variant="secondary" style={{ position: "absolute", top: 12, right: 12 }}>
        Close
      </DialogClose>
    </View>
  </DialogContent>
</Dialog>;
```

A view that fills the window takes every press, the backdrop's included, so a lightbox closes from its own scrim — the full-window `View` above, with the press that shuts it — or from `DialogClose`, Escape and the back button. Leave the content smaller than the window and a backdrop press closes it again.

## API

`Dialog` owns the open state. `DialogContent` mounts [`nsh/base` Dialog](https://nsh.dev/elements/dialog); every base prop passes through it, and base owns the backdrop, the popup host and Escape, back and swipe.

| Part                | Props                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `Dialog`            | `open`, `defaultOpen`, `onOpenChange({ open, reason })`, `onOpen`, `onClose`, `onCancel`         |
| `DialogTrigger`     | `children`, `variant`, `disabled`, `style`                                                       |
| `DialogContent`     | `width`, every `nsh/base` Dialog prop; `style` over `dialogCard`, `backdropStyle` over the scrim |
| `DialogTitle`       | `children`; a string takes `dialogTitle`                                                         |
| `DialogDescription` | `children`; a string takes `dialogText`                                                          |
| `DialogFooter`      | `children`, `style`                                                                              |
| `DialogClose`       | As `DialogTrigger`, plus `onPress` before it closes                                              |

A string child of `DialogTrigger` or `DialogClose` is a `Button`; `variant` picks its look (`secondary` by default). Anything else is drawn as given.
