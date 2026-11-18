---
title: Message scroller
description: "A conversation that keeps up with itself: new turns follow the newest message while you are at the end, and wait when you are not."
component: true
demo: message-scroller
---

## Installation

```sh
npx shadcn-nsh@latest add message-scroller
```

## Usage

```tsx
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Icon } from "@/lib/icons";
```

The examples draw icons with `Icon` from `lib/icons`; see [Icons](../icons) for adding it and picking a size and color.

```tsx
<MessageScroller style={{ height: 320 }}>
  <MessageScrollerViewport>
    <MessageScrollerContent>
      {turns().map((turn) => (
        <MessageScrollerItem>
          <Message align={turn.mine ? "end" : "start"}>
            <MessageAvatar name={turn.from} />
            <MessageContent>
              <Bubble variant={turn.mine ? "default" : "muted"}>
                <BubbleContent>{turn.text}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageScrollerItem>
      ))}
    </MessageScrollerContent>
  </MessageScrollerViewport>
  <MessageScrollerButton />
</MessageScroller>
```

## Examples

### Following

The scroller opens at the end, on the newest turn, and keeps itself there: when the content grows
— a turn is sent, a stream answers — it reveals the new end. Scroll up and it stops following;
the view stays where the reader put it while new turns arrive below. Scroll back to the end and it
follows again.

Give the frame a height (`style={{ height: 320 }}`): it fills what it is in, and its viewport takes
the room left.

### Opening elsewhere

`initialScroll="start"` opens at the oldest turn and does not follow, for a thread read from the
top. Anything else (the default, `end`) opens on the newest.

```tsx
<MessageScroller initialScroll="start" style={{ height: 220 }}>
  <MessageScrollerViewport>
    <MessageScrollerContent>{turns().map(turn)}</MessageScrollerContent>
  </MessageScrollerViewport>
  <MessageScrollerButton direction="end" />
</MessageScroller>
```

### Buttons

`MessageScrollerButton` floats 16 points above the newest turn (or below the oldest) in the middle
of the viewport, and shows only while there is somewhere to go that way. It says "Scroll to end" or
"Scroll to start" to screen readers; give it `accessibilityLabel` to say something else.

```tsx
<MessageScrollerButton />

<MessageScrollerButton direction="start">
  <Icon icon={ArrowUp} {...buttonGlyph("secondary", { size: "sm" })} />
</MessageScrollerButton>
```

### Turns

`MessageScrollerContent` is the column the turns are in, 32 points apart and at least as tall as
the viewport; `MessageScrollerItem` wraps one turn. What a turn is, is `Message`'s business.

## Differences from shadcn/ui

shadcn/ui's message scroller is a wrapper over `@shadcn/react/message-scroller`, a React library of
state and hooks. This one is the frame and the behaviour on `nsh`'s `Scroll`, and differs in five
places:

- **No provider and no hooks.** State lives inside `MessageScroller`, so `MessageScrollerProvider`,
  `useMessageScroller`, `useMessageScrollerScrollable` and `useMessageScrollerVisibility` are not
  exported: a part that needs the state reads it from where it is, and the scroller's signals
  (at the end, at the start, overflowing) are not the app's to read.
- **No scroll anchoring.** An item's `scrollAnchor` holds the reader's place while older turns load
  above it; NSH has no anchoring. Read the position with `ViewRef.measure()` before the load and
  scroll back with `Scroll`'s ref after it.
- **No `content-visibility`.** shadcn/ui lets the browser skip the layout of turns off screen
  (`content-visibility: auto`, `contain-intrinsic-size`); NSH lays out what it draws.
- **The button animates its opacity only.** shadcn/ui slides and scales it away as well; NSH's
  springs animate the opacity (`follow`).
- **No scrollbar gutter or faded edge.** shadcn/ui reserves the scrollbar's room and fades the
  content at the top edge (`scroll-fade-b`); the platform's scrollbar is the one you get.

## API

Every prop of [`nsh` View](https://nsh.dev/elements/view) passes through on `MessageScroller`,
`MessageScrollerContent` and `MessageScrollerItem`; `MessageScrollerViewport` takes a
[`Scroll`](https://nsh.dev/elements/scroll)'s (`scrollbar`, `contentInset`, `onScroll`, …) less the
direction it keeps (a conversation scrolls up and down), and `MessageScrollerButton` takes this
library's [`Button`](https://nsh.dev/elements/button) props.

| Part                      | Props           | Description                                                |
| ------------------------- | --------------- | ---------------------------------------------------------- |
| `MessageScroller`         | `initialScroll` | Renders `View` (`messageScrollerLook().root`)              |
| `MessageScrollerViewport` |                 | Renders `Scroll` (`messageScrollerLook().viewport`)        |
| `MessageScrollerContent`  |                 | Renders `View` (`messageScrollerLook().content`)           |
| `MessageScrollerItem`     |                 | Renders `View` (`messageScrollerLook().item`)              |
| `MessageScrollerButton`   | `direction`     | Renders `Button` (`messageScrollerLook().slot(direction)`) |

| Prop            | On                      | Type               | Default |
| --------------- | ----------------------- | ------------------ | ------- |
| `initialScroll` | `MessageScroller`       | `"start" \| "end"` | `end`   |
| `direction`     | `MessageScrollerButton` | `"start" \| "end"` | `end`   |

The frame fills its parent, clips what is in it, and holds its viewport and its buttons; the
content column is 32 points apart; a button floats 16 points from its edge. `messageScrollerLook()`
is exported for a frame an app draws itself.
