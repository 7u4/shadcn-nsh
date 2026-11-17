---
title: Alert Dialog
description: "A confirmation of the platform's own: shadcn's parts over the system's alert."
component: true
demo: alert-dialog
---

## Installation

```sh
npx shadcn-nsh@latest add alert-dialog
```

## Usage

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
```

```tsx
<AlertDialog onAction={({ action }) => console.log(action)}>
  <AlertDialogTrigger>Delete file</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete file?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction id="delete" role="destructive">
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

The box is the platform's own (`nsh/base`'s `AlertDialog.show`): UIAlertController on iOS, NSAlert
on macOS, NSH's drawing of the same box on the web, the platform dialog on Android. The parts only
fill it in — they register a title, a message and buttons, and `AlertDialogContent` shows it when
the root is open. So the box **does not follow this library's theme**, what it shows is **text
only** (no views, icons or fields), and an Android alert takes **at most three buttons**.

## Examples

### Against `Dialog`

`AlertDialog` asks one question and waits for the answer; `Dialog` is the app's own card.

|                            | `AlertDialog`               | `Dialog`                                  |
| -------------------------- | --------------------------- | ----------------------------------------- |
| Who draws it               | the platform                | the app, with `dialogCard` and `backdrop` |
| What it holds              | a title, a message, buttons | any content (fields, lists, pictures)     |
| Does it follow the theme   | no                          | yes                                       |
| Escape, backdrop and swipe | off (`closeOn*` props)      | on                                        |

Use `Dialog` when the box needs content of the app's own or the app's look; use `AlertDialog` when
it is a yes/no question the system should ask.

### Roles

`role` is what each button means, and the platform places and draws it by that: `cancel` on its
own, `destructive` in red where the platform has red.

```tsx
<AlertDialogFooter>
  <AlertDialogAction id="cancel" role="cancel">
    Cancel
  </AlertDialogAction>
  <AlertDialogAction id="delete" role="destructive">
    Delete
  </AlertDialogAction>
</AlertDialogFooter>
```

`AlertDialogCancel` is the same button with `role="cancel"`; its `id` is `"cancel"` unless named.

### The chosen action

`onAction` reports the `id` of the button pressed (the app's name for it, never the label), or
`null` when the box closed without one.

```tsx
<AlertDialog onAction={({ action }) => action === "delete" && remove()}>…</AlertDialog>
```

### Action sheet

`presentation="actionSheet"` slides the box up from the bottom (a list on Android). Escape and a
press outside close it unless `closeOnEscape` / `closeOnBackdropPress` say otherwise; an alert
(`"alert"`, the default) waits for a button.

```tsx
<AlertDialogContent presentation="actionSheet">…</AlertDialogContent>
```

### Trigger

A string child is a `Button`; `variant` picks its look (`secondary` by default). Anything else is
drawn as given.

```tsx
<AlertDialogTrigger variant="destructive">Delete file…</AlertDialogTrigger>
```

### Controlled

`open` shows the box and `onOpenChange` reports every change of it — `reason` is `"triggerPress"`
when the trigger opened it, `"select"` when a button was chosen and `"cancel"` when it closed
without one.

```tsx
const open = signal(false);

<AlertDialog open={open()} onOpenChange={({ open: next }) => open.set(next)}>
  …
</AlertDialog>;
```

### What shadcn has that this does not

| shadcn                                       | Here                                                                 |
| -------------------------------------------- | -------------------------------------------------------------------- |
| Any JSX in the box (icons, fields, media)    | strings: `AlertDialogTitle`, `AlertDialogDescription`, button labels |
| `AlertDialogMedia`                           | —                                                                    |
| `size="sm" \| "default"`                     | — (the platform picks)                                               |
| `className` and styles on the box            | — (`AlertDialogHeader` / `Footer` draw nothing)                      |
| `AlertDialogCancel` closes without an action | it reports its `id` (`"cancel"`)                                     |
| `asChild` on the trigger                     | a `Button` for a string, a pressable view otherwise                  |

## API

`AlertDialog` owns the open state and the text its parts registered; `AlertDialogContent` calls
[`nsh/base` `AlertDialog.show`](https://nsh.dev/elements/alert-dialog) when it opens. The box stays
one while it is up: a part that renders again with the alert still open — a page whose layout
rebuilds its children does — stacks nothing, and the answer belongs to the app that asked.

| Part                     | Props                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `AlertDialog`            | `open`, `defaultOpen`, `onOpenChange({ open, reason })`, `onAction({ action })`            |
| `AlertDialogTrigger`     | `children`, `variant`, `disabled`, `style`                                                 |
| `AlertDialogContent`     | `presentation`, `closeOnEscape`, `closeOnBackdropPress` — the rest of `AlertDialogOptions` |
| `AlertDialogTitle`       | `children` (a string)                                                                      |
| `AlertDialogDescription` | `children` (a string)                                                                      |
| `AlertDialogAction`      | `id`, `role`, `children` (a string; the `id` when left out)                                |
| `AlertDialogCancel`      | `id` (default `"cancel"`), `children`                                                      |
| `AlertDialogHeader`      | `children` — shadcn's block, drawn by nothing                                              |
| `AlertDialogFooter`      | `children` — shadcn's block; the buttons keep the order they are written in                |
